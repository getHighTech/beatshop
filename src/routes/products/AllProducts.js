import React from 'react'
import { setAppLayout } from '../../actions/app';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getShopProductsLimit, agencyOneProduct,getShopProductsLimitSuccess,getShopProductsLimitFail } from '../../actions/products';
import LoadingItem from '../../components/public/LoadingItem';
import { getStore } from '../../tools/localStorage';
import serverConfig   from '../../config/server.js';
import  axios  from 'axios';
import App from '../../config/app.json';


const styles = theme => ({
  root:{
    width:'100%'
  },
  button:{
    marginRight:5,
    height:10,
  },
  loadMore:{
    textAlign:'center',
    marginTop:20,
    marginBottom:20
  },
});

class AllProducts extends React.Component{
  state = {
    productsTotle:8,
    Products:[],
    open: [],
    count:0,
    page:1,
    loading:true
  }
  handleClickOpen = (index) => {
    let open = this.state.open;
    open[index] = true;
    this.setState({ open });
  };

  handleClose = (index) => {
    let open = this.state.open;
    open[index] = false;
    this.setState({ open });
  };

  beginToAgency = (index) => {
    const { dispatch, products,user } = this.props;
    dispatch(agencyOneProduct(products[index], getStore("userId"),user.appNameShopId,user.shopId))
    this.handleClose(index)
  }
  loadMore=()=>{
    const { dispatch, layout, products } = this.props;
      if(this.state.loading){
          return 0;
      }
      this.setState({
          loading: true,
      })
      let Products = this.state.Products;
      let appName = App.name;
      axios.get(
          `${serverConfig.server_url}/api/new_add_products`,{
            params: {
              page: this.state.page+1,
              appName
            }
          }
      ).then(res=>{
          this.setState({
              loading: false,
              page: this.state.page+1,
              Products: Products.concat(res.data.products),
              count:res.data.products.length
          })
          dispatch(getShopProductsLimitSuccess(Products.concat(res.data.products)));

      }).catch(err=>{
          this.setState({
              loading: true,
              page: 1,
              Products: [],
              count:0
          })
          console.log(err);

      })
  }

  componentDidMount(){
    console.log('走了这');
    const { dispatch, layout, products } = this.props;
    const appName = App.name;
    const page = this.state.page;
    if(layout.title!=='鲜至臻品商品库'){
        dispatch(setAppLayout(
            {
                isBack: true,
                backTo: "/my",
                title: "鲜至臻品商品库",
                hasCart: false,
                hasBottomNav: false,
                hasGeoLoc: false,
                hasEditor: false,
                hasSearch: false,
            }
        ));


    }
    // dispatch(getShopProductsLimit())
    //
    // this.setState({
    //   Products:products,
    //   loading:false,
    //   count:products.length
    // })

    axios.get(`${serverConfig.server_url}/api/new_add_products`,{
      params:{
        appName,page
      }
    }).then((res)=>{
      this.setState({
        Products:res.data.products,
        loading:false,
        count:res.data.products.length
      })
      dispatch(getShopProductsLimitSuccess(res.data.products));

    }).catch((err)=>{
      this.setState({
        loading:true,
        page:1,
        Products:[],
        count:0
      })
      dispatch(getShopProductsLimitFail())

    })





  }
  render(){
    const { classes, productsLoading, products } = this.props;
    const {Products,count,loading}=this.state;
    console.log(Products);
    console.log(products);
    if (products === "unloaded") {
      return (
        <div className={classes.root}>
          <h3>暂无商品可以供应</h3>
        </div>
      )
    }

    return(
      <div className={classes.root}>
      { productsLoading ? <LoadingItem /> : null }
        <GridList cellHeight={180} className={classes.gridList}>
          {
            products.length> 0?

            products.map((tile, index) => {

            return (

            <GridListTile key={index}>
              <img src={tile.cover? tile.cover : '/imgs/b5.png'} alt={tile.endPrice} />
              <GridListTileBar
                title={tile.title}
                subtitle={<div style={{wordWrap: "break-all"}}><span>{tile.newSpecGroups[0].spec_value}</span><br/><br/><span>{tile.name_zh}</span><br/><br/><span>价: ¥{tile.endPrice/100}</span>&nbsp;
                <span>
                  佣: ¥

                  {tile.agencyLevelPrices.length> 0 ?tile.agencyLevelPrices[0]/100 : 0}
                  </span></div>}
                actionIcon={
                  <Button variant="fab"
                  mini color="primary"
                  onClick={() => this.handleClickOpen(index)}
                  aria-label="add" className={classes.button}>
                  <AddIcon />
                </Button>

                }
              />
              <Dialog
                open={this.state.open[index]}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"确定代理这件商品吗?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    选择代理销售{tile.name_zh},每卖出一件，
                    可以获得
                    { tile.agencyLevelPrices.length> 0 ? tile.agencyLevelPrices[0]/100 : 0}

                    元人民币
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=>this.handleClose(index)} color="primary">
                    取消
                  </Button>
                  <Button onClick={()=> this.beginToAgency(index)} color="primary" autoFocus>
                    确认
                  </Button>
                </DialogActions>
              </Dialog>
            </GridListTile>
            )
          })
          :null
        }
        </GridList>
        <div className={classes.loadMore}>
        {
          count===10
          ?
            <Button onClick={this.loadMore} disabled={loading} color="primary" className={classes.button}>
            {loading? "正在加载": "加载更多"}
            </Button>
            :

            <Button style={{color:"#968d8a"}} >没有数据啦</Button>
          }
        </div>
      </div>
    )
  }
}

AllProducts.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapToState(state){
  return {
    layout: state.AppInfo.layout,
    products: state.ProductsList.shopProducts,
    productsLoading: state.ProductsList.loading,
    user: state.AppUser
  }
}

export default connect(mapToState)(withStyles(styles)(AllProducts));
