import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import AddShoppingCart from 'material-ui-icons/AddShoppingCart'
import Button from 'material-ui/Button'
import { connect } from 'react-redux';
import { addProductsToAppCart } from '../../actions/app_cart';
import { checkAccess } from '../../actions/check_access';
import Snackbar from 'material-ui/Snackbar';
import { memoryPathBeforeLogined } from '../../actions/users';
import { createOneOrderByProduct } from '../../actions/orders';
import { openAppMsg } from '../../actions/app_msg';

const styles = theme => ({
  card: {
    maxWidth: 400,
    width: "100%",
    margin: "10px"
  },
  media: {
    height: 194,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
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
    const { snackOpen, snackContent} =this.state;
    return (
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                热门
              </Avatar>
            }
           
            title={product.name_zh}
            subheader={"¥"+product.endPrice/100}
          />
          <CardMedia
            className={classes.media}
            image={product.cover}
            title={product.name_zh}
          />
          <CardContent>
            <Typography component="p">
              {product.brief}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="加入购物车" onClick={()=> this.handleAddToCart(product, 1, product.shopId)}>
              <AddShoppingCart />
            </IconButton>
            <Button to="/products/" 
              aria-label="产品详情"
              onClick={()=>this.handleBuyOneProductBtnClick(this.props.product)}
              >立刻购买</Button>
           
              <Button 
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={()=>this.handleExpandClick(product._id)}
              aria-expanded={this.state.expanded}
              aria-label="产品详情"
              >详情</Button>
          </CardActions>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={snackOpen}
            onClose={this.handleSnackClose}
            SnackbarContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span style={{width: "40%"}} id="message-id">{snackContent}</span>} 
            
          />
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
