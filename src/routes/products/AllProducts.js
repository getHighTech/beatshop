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
import { getShopProductsLimit } from '../../actions/products';
import LoadingItem from '../../components/public/LoadingItem';

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
    open: false
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  loadMoreProductData(){
    let Products = [
      {
        img:'/imgs/b1.png',
        title:'万人车汇黑卡',
        price:356.11,
      },
      {
        img:'/imgs/b2.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        img:'/imgs/b3.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        img:'/imgs/b4.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        img:'/imgs/b5.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        img:'/imgs/b6.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        img:'/imgs/background3.jpg',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        img:'/imgs/webwxgetmsgimg.jpeg',
        title:'万人车汇黑卡',
        price:356,
      },
    ]
    this.setState({Products:Products})
  }
  loadFirstPageData(){
    let Products = [
      {
        img:'/imgs/b1.png',
        title:'万人车汇黑卡',
        price:356.11,
      },
      {
        img:'/imgs/b2.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        img:'/imgs/b3.png',
        title:'万人车汇黑卡',
        price:356,
      },
    ]
    this.setState({
      Products:Products
    })
  }

  componentDidMount(){
    const { dispatch, layout } = this.props;
    console.log(this.props);
    
    if(layout.title!=='万人车汇商品库'){
        dispatch(setAppLayout(
            {
                isBack: true, 
                backTo: "/my", 
                title: "万人车汇商品库", 
                hasCart: false, 
                hasBottomNav: false, 
                hasGeoLoc: false,
                hasEditor: false, 
                hasSearch: false,
            }
        ));
    }
    this.loadFirstPageData()
    dispatch(getShopProductsLimit("000", 1, 4));
  }
  render(){
    const { classes, productsLoading, products } = this.props;
    console.log(products);
    

    return(
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          {products.map((tile, index) => {
            return (
            
            <GridListTile key={index}>
              <img src={tile.cover? tile.cover : '/imgs/b5.png'} alt={tile.endPrice} />
              <GridListTileBar
                title={tile.title}
                subtitle={<div style={{wordWrap: "break-all"}}><span>价: ¥{tile.endPrice/100}</span>&nbsp;
                <span> 
                  佣: ¥{tile.agencyLevelPrices[0]/100}</span></div>}
                actionIcon={
                  <Button variant="fab" 
                  mini color="primary" 
                  onClick={this.handleClickOpen} 
                  aria-label="add" className={classes.button}>
                  <AddIcon />
                </Button>

                }
              />
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"确定代理这件商品吗?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    代理文案bilibala代理文案bilibala代理文案bilibala代理文案bilibala代理文案bilibala代理文案bilibala
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    取消
                  </Button>
                  <Button onClick={this.handleClose} color="primary" autoFocus>
                    确认
                  </Button>
                </DialogActions>
              </Dialog>
            </GridListTile>
            )
          }
          )}
        </GridList>
        <div className={classes.loadMore}>
          {productsLoading && <LoadingItem />}
          {this.state.Products.length === this.state.productsTotle?

            <Button color="primary" className={classes.button} >
            没有数据啦
            </Button>:
            <Button onClick={{}} disabled={productsLoading? true: false} color="primary" className={classes.button} onClick={this.loadMoreProductData.bind(this)}>
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
    orderShow: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout,
    products: state.ProductsList.products,
    productsLoading: state.ProductsList.loading,
  }
}

export default connect(mapToState)(withStyles(styles)(AllProducts));