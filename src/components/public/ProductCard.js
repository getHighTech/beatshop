import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import grey from '@material-ui/core/colors/grey';

import Button from '@material-ui/core/Button'
import { connect } from 'react-redux';
import { checkAccess } from '../../actions/check_access';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'

const styles = theme => ({
  card: {
    maxWidth: 400,
    width: "100%",
    margin: "10px",
    color:grey[800]
  },
  productImg:{
    maxWidth:'100%',
    },
  productName:{
    textAlign:'left',
    fontSize:15,
    margin:10,
  },
  productBrief:{
    textAlign:'left',
    marginLeft:10,
    fontSize:10,
    marginTop:-10,
    fontWeight:300
  },
  productPriceNumber:{
    marginLeft:2,
    marginTop:4,
    fontSize:16,
    color:'#FF5722'
  },
  ButtonContain:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10
  },
  button:{
    marginRight:5,
    color:'#F5F5F5',
    backgroundColor:grey[800]
  },
  productHeader:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10
  },
  right:{
    display:'flex',
    paddingRight:10
  },
  recommend:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    marginLeft:10
  }
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



  render() {
    const { classes, product } = this.props;
    return (
        <Card className={classes.card} 
          aria-expanded={this.state.expanded}
          aria-label="产品详情">
            <div className={classes.productHeader}>
              <div className={classes.left}>
                <div className={classes.productName}>{product.name_zh}</div>
                <div className={classes.productBrief}>{product.brief}</div>
              </div>

              <div className={classes.right}>
                <img style={{height:24}} alt="价钱ICON"  src={require('../imgs/money_icon.svg')} /> 
                <div  className={classes.productPriceNumber}>{product.endPrice/100}</div>
              </div>
            </div>
            <div>
              <div className={classes.productContain}>
                <img  onClick={()=>this.handleExpandClick(product._id)} className={classes.productImg} alt="产品图片" src={product.cover}/>
              </div>
            </div>
            <div>
              <div className={classes.ButtonContain}>
                <div className={classes.recommend}>
                  <img style={{height:24}} alt="推荐"  src={require('../imgs/recommend.svg')} /> 
                  <IconButton aria-label="加入购物车">
                  <AddShoppingCart onClick={()=> this.handleAddToCart(product, 1, product.shopId)} color="primary" />
                  </IconButton>
                </div>
                <Button variant="raised" color="secondary" onClick={()=>this.handleBuyOneProductBtnClick(this.props.product)}>
                  立即购买
                </Button>
              </div>
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
