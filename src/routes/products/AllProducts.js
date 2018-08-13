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
import { getShopProductsLimit, agencyOneProduct } from '../../actions/products';
import LoadingItem from '../../components/public/LoadingItem';
import { getStore } from '../../tools/localStorage';

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
    open: []
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
    console.log("one product", products[index]);
    dispatch(agencyOneProduct(products[index], getStore("userId")),user.appNameShopId,user.shopId)
    this.handleClose(index)
  }

  
  

  componentDidMount(){
    const { dispatch, layout, products } = this.props;
    
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
    
    if(products === "unloaded"){
      
      dispatch(getShopProductsLimit());
    }
    
    
  
  }
  render(){
    const { classes, productsLoading, products } = this.props;
    console.log("render once");
    if (products === "unloaded") {
      return (
        <div className={classes.root}>
          <h3>暂无商品可以供应</h3>
        </div>
      )
    }
    
    return(
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          { 
            products.length> 0?

            products.map((tile, index) => {
            
            return (
            
            <GridListTile key={index}>
              <img src={tile.cover? tile.cover : '/imgs/b5.png'} alt={tile.endPrice} />
              <GridListTileBar
                title={tile.title}
                subtitle={<div style={{wordWrap: "break-all"}}><span>价: ¥{tile.endPrice/100}</span>&nbsp;
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
          {productsLoading && <LoadingItem />}
          {this.state.Products.length === this.state.productsTotle?

            <Button color="primary" className={classes.button} >
            没有数据啦
            </Button>:
            <Button  disabled={productsLoading? true: false} color="primary" className={classes.button}>
            {productsLoading? "正在加载": "加载更多"}
            </Button>
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