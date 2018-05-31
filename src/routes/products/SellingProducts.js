import React from 'react'
import { setAppLayout } from '../../actions/app';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ProductCard from '../../components/products/ProductCard'

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

class SellingProducts extends React.Component{
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
        id:'KxP7o3wWKjyfd3Cc7',
        img:'/imgs/b1.png',
        title:'万人车汇黑卡',
        price:356.11,
      },
      {
        id:2,
        img:'/imgs/b2.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        id:3,
        img:'/imgs/b3.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        id:4,
        img:'/imgs/b4.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        id:5,
        img:'/imgs/b5.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        id:6,
        img:'/imgs/b6.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        id:7,
        img:'/imgs/background3.jpg',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        id:8,
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
        id:'KxP7o3wWKjyfd3Cc7',
        img:'/imgs/b1.png',
        title:'万人车汇黑卡',
        price:356.11,
      },
      {
        id:2,
        img:'/imgs/b2.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        id:3,
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
  }
  render(){
    const { classes } = this.props;


    return(
      <div className={classes.root}>
        {this.state.Products.map(product => {
          return (
            <ProductCard key={product.id} id={product.id} history={this.props.history}/>
          )
        }
        )}
        <div className={classes.loadMore}>
          {this.state.Products.length === this.state.productsTotle?

            <Button color="primary" className={classes.button} >
            没有数据啦
            </Button>:
            <Button color="primary" className={classes.button} onClick={this.loadMoreProductData.bind(this)}>
            加载更多
            </Button>
          }
        </div>
      </div>
    )
  }
}

SellingProducts.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapToState(state){
  return {
    orderShow: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(withStyles(styles)(SellingProducts));