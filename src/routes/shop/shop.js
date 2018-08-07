import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';

import Image from '../../components/imgs/shop.jpg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { setAppLayout } from '../../actions/app';
import { getShopProductsLimit } from '../../actions/app_shop'



function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  shopHeader:{
    background:'url('+Image+')',
    height:200,
    textAlign:'center',
    paddingTop:50,

  },
  avatarBox:{
    display: 'flex',
    justifyContent: 'center',
  },
  avatar:{
    width: 60,
    height: 60,
    backgroundColor:'#ff5722'
  },
  title:{
    color:'#fff',
    marginTop:10,
    fontSize:14
  },
  cardBottom:{
    display:'flex',
    marginTop:10,
    padding:0
  },
  cardContent:{
    padding:16,
    paddingBottom:0,
   },
   productName:{
     fontSize:14
   },
   productPrice:{
    marginTop:14,
    color:'#ff5722',
    fontWeight:500,
   },
   card:{
     marginTop:10,
    },
    share:{
      marginLeft:'36%'
    },
    a:{
      textDecoration:'none',
      color:'none'
    },
    loadMore:{
      textAlign:'center',
      marginTop:20,
      marginBottom:20
    },


});
class Shop extends React.Component{
  state = {
    value: 0,
    productsTotle:7,
    page: 2,
    products:[
      {id:1,name:'看看你一行名字到底能有多长',price:100,img:'/imgs/b1.png',title:'店铺图片'},
      {id:2,name:'短名字显示',price:123,img:'/imgs/b2.png',title:'店铺图片'},
      {id:3,name:'超长名字显示超长名字显示超长名字显示超长名字显示超长名字显示超长名字显示超长名字显示',price:1200,img:'/imgs/b3.png',title:'店铺图片'},

    ]
  };
  Jump = (productId)  =>{
      this.props.history.push(`/products/${productId}`)
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  Share = (productId) => {
    this.props.history.push(`/share/${productId}`)
  }

  loadMoreProductData(){
    const {  match,shop } = this.props;
    let shopId = match.params.id
    // this.props.dispatch(getShopProductsLimit(shopId,shop.page,4))
    // let products = [
    //   {id:1,name:'看看你一行名字到底能有多长',price:100,img:'/imgs/b1.png',title:'店铺图片'},
    //   {id:2,name:'短名字显示',price:123,img:'/imgs/b2.png',title:'店铺图片'},
    //   {id:3,name:'超长名字显示超长名字显示超长名字显示超长名字显示超长名字显示超长名字显示超长名字显示',price:1200,img:'/imgs/b3.png',title:'店铺图片'},
    //   {id:4,name:'测试商品1',price:11,img:'/imgs/b1.png',title:'店铺图片'},
    //   {id:5,name:'测试商品2',price:1.0021,img:'/imgs/b2.png',title:'店铺图片'},
    //   {id:6,name:'测试商品3',price:1231,img:'/imgs/b3.png',title:'店铺图片'},
    //   {id:7,name:'测试商品4',price:1233,img:'/imgs/b1.png',title:'店铺图片'},

    // ]
    // const  page = this.state.page+=1
    // console.log(page)
    // let shopId = this.props.match.params.id
    // this.props.dispatch(getShopProductsLimit(shopId,page,4))
    // this.setState({
    //   page
    // })
  }
  componentDidMount(){
    const { dispatch, layout, match,shop } = this.props;
    let shopId = match.params.id

    if(layout.title!=='店铺详情'){
      if(shopId){
        dispatch(getShopProductsLimit(shopId,shop.page,4))
      }
        dispatch(setAppLayout(
            {
                isBack: true,
                backTo: "/",
                title: "店铺详情",
                hasCart: false,
                hasBottomNav: false,
                hasGeoLoc: false,
                hasEditor: false,
                hasSearch: false,
            }
        ));
    }
  }


  sub = (name) => {
    return name.substr(0,1)
  }
  render(){
    const { classes } = this.props;
    const { shop, products } = this.props.shop;

    const { value } = this.state;



    return(
      <div>
        <div className={classes.shopHeader}>
          <div className={classes.avatarBox}>
          <Avatar className={classes.avatar}>{shop.name!==undefined? this.sub(shop.name):null}</Avatar>
          </div>
          <div  className={classes.title}>{shop.name}</div>
          <div  className={classes.title}></div>
        </div>
          <Tabs value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth>
            <Tab label="商品" />
            <Tab label="简介" />
          </Tabs>
        {value === 0 &&
        <TabContainer>
        {products.map(product => {
          return (
            <Card className={classes.card} key={product._id}>
              <div className={classes.cardContent}>
                <Grid container spacing={24}>
                  <Grid item xs={3} sm={3}>
                    <img src={product.cover} alt={product.title} style={{height:60,width:60}}/>
                  </Grid>
                  <Grid item xs={9} sm={9}>
                    <a id={product.id} onClick={()=>this.Jump(product._id)} className={classes.a}>
                      <div className={classes.productName}>{product.name_zh}</div>
                    </a>
                    <div className={classes.cardBottom}>
                      <div className={classes.productPrice}>价格:¥{product.price/100}</div>
                      <div className={classes.share}>
                        <IconButton color="primary" onClick={()=>this.Share(product._id)} className={classes.button} aria-label="Add an alarm">
                          <Icon>share</Icon>
                        </IconButton>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Card>
          )
          }
        )}
      <div className={classes.loadMore}>
        {this.state.products.length === this.state.productsTotle?

          <Button color="primary" className={classes.button} >
          没有数据啦
          </Button>:
          <Button color="primary" className={classes.button} onClick={this.loadMoreProductData.bind(this)}>
          加载更多
          </Button>
        }
      </div>
        </TabContainer>}
        {value === 1 && <TabContainer>{shop.description}</TabContainer>}
      </div>
    )
  }
}
function mapToState(state){
  return {
    orderShow: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout,
    shop: state.AppShop,
  }
}

Shop.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapToState)(withStyles(styles)(Shop))
