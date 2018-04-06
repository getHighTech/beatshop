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

class ProductCard extends React.Component {
  constructor(props){
    super(props);
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }
  state = { expanded: false };

  handleExpandClick = (productId) => {
   this.props.history.push("/products/"+productId);
   
  };

  handleAddToCart(product, count, shopId){
    const {dispatch} = this.props;
    dispatch(addProductsToAppCart(product, count, shopId));
  }

  render() {
    const { classes, product } = this.props;
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
              >立刻购买</Button>
           
              <Button to="/products/" 
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={()=>this.handleExpandClick(product._id)}
              aria-expanded={this.state.expanded}
              aria-label="产品详情"
              >详情</Button>
          </CardActions>
          
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
  }
}

export default connect(mapToState)(withStyles(styles)(ProductCard))
