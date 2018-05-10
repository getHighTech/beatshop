import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';

import AddShoppingCart from 'material-ui-icons/AddShoppingCart'
import Button from 'material-ui/Button'
import { connect } from 'react-redux';
import { addProductsToAppCart } from '../../actions/app_cart';
import { checkAccess } from '../../actions/check_access';
import Snackbar from 'material-ui/Snackbar';
import { memoryPathBeforeLogined } from '../../actions/users';
import { createOneOrderByProduct } from '../../actions/orders';
import { openAppMsg } from '../../actions/app_msg';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  card: {
    maxWidth: 400,
    width: "100%",
    margin: "10px",
    color:grey[800]
  },
  productImg:{
    maxWidth:'100%',
    marginTop:-9
  },
  productName:{
    textAlign:'left',
    fontSize:15,
    margin:10,
    fontWeight:900
  },
  productBrief:{
    textAlign:'left',
    marginLeft:10,
    fontSize:10,
    marginTop:-10,
    fontWeight:300
  },
  productPrice:{
    textAlign:'left',
    margin:10
  },
  productPriceIcon:{
    textAlign:'right',
    paddingLeft:10
  }
,
productPriceNumber:{
  fontWeight:900,
  marginLeft:2,
  marginTop:4,
  fontSize:16,
  color:'#FF5722'
},
hotIcon:{
  textAlign:'right'
},
productPriceNumberContain:{
  textAlign:'left'
},
ButtonContain:{
  textAlign:'right',
  paddingRight:10,
  marginBottom:10
},
button:{
  marginRight:5,
  color:'#F5F5F5',
  backgroundColor:grey[800]
}
  // media: {
  //   height: 194,
  // },
  // actions: {
  //   display: 'flex',
  // },
  // expand: {
  //   transform: 'rotate(0deg)',
  //   transition: theme.transitions.create('transform', {
  //     duration: theme.transitions.duration.shortest,
  //   }),
  //   marginLeft: 'auto',
  // },
  // expandOpen: {
  //   transform: 'rotate(180deg)',
  // },
  // avatar: {
  //   backgroundColor: red[500],
  // },
});
let timer = null;
class ProductCard extends React.Component {
  constructor(props){
    super(props);
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }
  state = { snackOpen: false,
    snackContent: "", key: null };

  handleExpandClick = (productId) => {
   console.log("22")
   this.props.history.push("/products/"+productId);
   
  };

  handleAddToCart(product){
    const {dispatch} = this.props;
    dispatch(checkAccess("buy", product, "add_product_to_cart"))
    
  }
  componentWillUnMount(){
    clearTimeout(timer);
  }
  componentWillReceiveProps(nextProps){
    
  }

  handleBuyOneProductBtnClick(product){
    const {dispatch} = this.props;
    dispatch(checkAccess("buy", product, "create_one_order_by_product"));
    
  }

 onClick(){
   console.log('点击')
 }


  render() {
    const { classes, product } = this.props;
    const { snackOpen, snackContent} =this.state;
    return (
        <Card className={classes.card} 
          aria-expanded={this.state.expanded}
          aria-label="产品详情">
            <div className={classes.productHeader}>
              <Grid container spacing={12}>
                <Grid item xs={10}>
                  <div className={classes.productName}>{product.name_zh}</div>
                  <div className={classes.productBrief}>{product.brief}</div>
                </Grid>
                <Grid item xs={2}>
                  <div className={classes.hotIcon}><img style={{height:56}} alt="热门商品"  src={require('../imgs/hot.svg')} /> </div>
                </Grid>
              </Grid>
            </div>
            <div>
              <div className={classes.productContain}>
                <img  onClick={()=>this.handleExpandClick(product._id)} className={classes.productImg} alt="产品图片" src={product.cover}/>
              </div>
            </div>
            <div>
              <Grid container spacing={12}>
                <Grid item xs={4} style={{paddingTop:5}}>
                  <Grid container spacing={12}>
                        <Grid item xs={4} className={classes.productPriceIcon}>
                          <img style={{height:24}} alt="价钱ICON"  src={require('../imgs/money_icon.svg')} /> 
                        </Grid>
                        <Grid item xs={8} className={classes.productPriceNumberContain}>
                          <div  className={classes.productPriceNumber}>{product.endPrice/100}</div>
                        </Grid>
                      </Grid>
                </Grid>
                <Grid item xs={8}>
                  <div className={classes.ButtonContain}>
                    <Button variant="raised"  className={classes.button} onClick={()=> this.handleAddToCart(product, 1, product.shopId)}>
                     加入购物车
                    </Button>
                    <Button variant="raised" color="secondary" onClick={()=>this.handleBuyOneProductBtnClick(this.props.product)}>
                      立即购买
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
        </Card>
    );
  }
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapToState(state){
  return {
    cart: state.AppCart,
    user: state.AppUser,
    orderShow: state.OrderShow 
  }
}

export default connect(mapToState)(withStyles(styles)(ProductCard))
