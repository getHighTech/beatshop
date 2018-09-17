import React from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
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
import styled from 'styled-components';
import axios from 'axios';
import serverConfig  from '../../config/server';
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


class Shop extends React.Component{
  constructor(props){
      super(props);

}
  state = {
    loading:true,
    value: 0,
    page: 1,
    shop:'',
    count:0,
    products:[

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
    const {page,products} = this.state;
    const {  match } = this.props;
    let shopId = match.params.id
    let pages= page+1;
    let pagesize = 5
    // this.props.dispatch(getShopProductsLimit(shopId,newpages,5))
    axios.get(`${serverConfig.server_url}/api/shop/products`,{
      params:{
        shopId,pages,pagesize
      }
    }).then((res)=>{
      console.log(res.data.products);
      this.setState({
        loading:false,
        page:pages,
        products:products.concat(res.data.products),
        count:res.data.productsCount
      })
    }).catch((err)=>{
      this.setState({
          loading: true,
          page: 1,
          products: [],
          count:0
      })
    })

  }
  componentDidMount(){
    const { dispatch, layout, match,shop,products } = this.props;
    let shopId = match.params.id
    let pagesize = 5
    var pages = this.state.page;
    if(layout.title!=='店铺详情'){

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
    if(shopId){
      // dispatch(getShopProductsLimit(shopId,pages,5))
      axios.get(`${serverConfig.server_url}/api/shop/products`,{
        params:{
          shopId,pages,pagesize
        }
      }).then((res)=>{
        console.log(res.data.products);
        this.setState({
          loading:false,
          page:1,
          products:res.data.products,
          shop:res.data.shop,
          count:res.data.productsCount
        })
      }).catch((err)=>{
        this.setState({
            loading: true,
            page: 1,
            products: [],
            count:0
        })
      })

    }
  }


  sub = (name) => {
    return name.substr(0,1)
  }
  render(){

    const { value,shop,products,productsCount } = this.state;
    console.log(shop);
    console.log(products);


    return(
      <div>
        <ShopHeader >
          <AvatarBox >
          <ReAvatar >{shop.name!==undefined? this.sub(shop.name):null}</ReAvatar>
          </AvatarBox>
          <Title  >{shop.name}</Title>
          <Title  ></Title>
        </ShopHeader>
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
            <ReCard  key={product._id}>
              <CardContent >
                <Grid container spacing={24}>
                  <Grid item xs={3} sm={3}>
                    <ReImg src={product.cover} alt={product.title} />
                  </Grid>
                  <Grid item xs={9} sm={9}>
                    <Alink id={product.id} onClick={()=>this.Jump(product._id)} >
                      <ProductName >{product.name_zh}</ProductName>
                    </Alink>
                    <CardBottom >
                      <ProductPrice >价格:¥{product.endPrice/100}</ProductPrice>
                      <ProductShear >
                        <IconButton color="primary" onClick={()=>this.Share(product._id)} aria-label="Add an alarm">
                          <Icon>share</Icon>
                        </IconButton>
                      </ProductShear>
                    </CardBottom>
                  </Grid>
                </Grid>
              </CardContent>
            </ReCard>
          )
          }
        )}
      <LoadMore >

      {this.state.products.length === this.state.count?

        <Button color="#a9a0a0"  >
        没有数据啦
        </Button>:
        <Button color="primary"  onClick={this.loadMoreProductData.bind(this)}>
        加载更多
        </Button>
      }

      </LoadMore>
        </TabContainer>}
        {value === 1 && <TabContainer>{shop.description}</TabContainer>}



      </div>
    )
  }
}

const ReImg = styled.img`
    width: 60px;
    heigth: 60px;
`

const Title =styled.div`
  color:#fff;
  margin-top:10px;
  font-size:14px;
`
const ShopHeader =styled.div`
    background-image:url('${Image}');
    height:200px;
    text-align:center;
    padding-top:50px;
`
const AvatarBox = styled.div`
    display: flex;
    justify-content: center;
`
const ReAvatar =styled(Avatar)`
     &&{
        width: 60px;
        height: 60px;
        background-color:#ff5722;
      }
`
const ReCard =styled(Card)`
      margin-top:10px;
`
const CardContent=styled.div`
      padding:16px;
      padding-bottom:0px;
`
const Alink = styled.a`
      text-decoration:none;
      color:none;
`
const ProductName =styled.div`
      font-size:14px;
`
const CardBottom = styled.div`
      display:flex;
      margin-top:10px;
      padding:0px;
      justify-content: space-around;
      margin-right: 20px;
`
const ProductPrice = styled.div`
      margin-top:14px;
      color:#ff5722;
      font-weight:500px;

`
const ProductShear = styled.div`
      margin-left:36%;
`

const LoadMore = styled.div`
      text-align:center;
      margin-top:20px;
      margin-bottom:20px;
`





function mapToState(state){
  return {
    orderShow: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout,
    shop: state.AppShop,
  }
}

// Shop.propTypes = {
//   classes: PropTypes.object.isRequired,
// };


export default connect(mapToState)(Shop)
