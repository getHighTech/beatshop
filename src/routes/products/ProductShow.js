import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import axios from 'axios';
import serverConfig  from '../../config/server';
import ProductCarousel from '../../components/products/carousel';
import ProductTabs from '../../components/products/tabs';
import Grid from '@material-ui/core/Grid';
import { loadOneProduct, loadOneProductByRolename,loadOneProductSuccess } from '../../actions/products';
import LoadingItem from '../../components/public/LoadingItem'
import { setAppLayout, appShowMsg } from '../../actions/app';
import ProductBottomBar from '../../components/products/ProductBottomBar';
import styled from 'styled-components';



const styles = theme => ({
    root: {
      margin: theme.spacing.unit * 2,
    },
    productInfo:{
        padding:10
    },
    productBrief:{
        fontSize:14
    },
    productPrice:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:10
    },
    send:{
      color:'rgb(156, 148, 148)',
        fontSize:12
    },
    price:{
        paddingLeft:'15px',
        color:'#ff5722',
        fontSize:'24px'
    },
    productName: {
        fontSize: '20px'
    },
    sale:{
      color:'rgb(156, 148, 148)',
      fontSize:'12px',
      marginLeft:'-30px'
    },
    firstPrice:{
      marginLeft:'5px',
      color:'rgb(156, 148, 148)',
      fontSize:'14px',
      textDecoration:'line-through'
    }

  });
 class ProductShow extends Component {
    constructor(props){
        super(props);
        this.state ={
            snackOpen: false,
            snackContent: "",
            specs: [{"金色": "true"}, {"银色": "false"}, {"灰色": "false"}],
            spec:[],
            price:0,
            endPrice:0,
            SelectProduct:''
        }
    }
    handleSnackClose = () => {
        this.setState({ snackOpen: false });
      };

    componentDidMount(){

        const { dispatch, match,user } = this.props;
        const productId=match.params.id
        console.log(productId);
        console.log(`${serverConfig.server_url}`);
        // axios.get(`${serverConfig.server_url}/api/findAllSpecProductByProductId`,{
        //   params:{
        //     productId
        //   }
        // }).then((res)=>{
        //   console.log(res.data.allproducts);
        //   this.setState({
        //     spec:res.data.allproducts,
        //     price:res.data.allproducts[0].price,
        //     endPrice:res.data.allproducts[0].endPrice,
        //     SelectProduct:res.data.allproducts[0].product
        //   })
        // }).catch((err)=>{
        //   console.log(err);
        // })
        console.log(match.params);

        if(match.params.id && !match.params.rolename){
          console.log('1');
            dispatch(loadOneProduct(match.params.id));

        }
        if(match.params.rolename && !match.params.id){
          // console.log('2');
          //   dispatch(loadOneProductByRolename(match.params.rolename,user.appNameShopId));

          let shopId = user.appNameShopId
          let rolename = match.params.rolename
          console.log(shopId);
          console.log(rolename);
            axios.get(`${serverConfig.server_url}/api/buyCard`,{
              params:{
                rolename,shopId
              }
            }).then((res)=>{
              console.log(res.data.product);
              dispatch(loadOneProductSuccess(res.data.product))
               this.setState({
                price:res.data.product.price,
                endPrice:res.data.product.endPrice,
                SelectProduct:res.data.product
              })

            })

        }
        else {
          axios.get(`${serverConfig.server_url}/api/findAllSpecProductByProductId`,{
            params:{
              productId
            }
          }).then((res)=>{
            console.log(res.data.allproducts);
            this.setState({
              spec:res.data.allproducts,
              price:res.data.allproducts[0].price,
              endPrice:res.data.allproducts[0].endPrice,
              SelectProduct:res.data.allproducts[0].product
            })
          }).catch((err)=>{
            console.log(err);
          })
        }
        if(match.params.productname){
          console.log('3');
            if(match.params.productname === "openshop"){
                dispatch(appShowMsg("open_shop_fail", 3000));
            }

        }


        dispatch(setAppLayout(
            {
                isBack: true,
                backTo: "/",
                title: "产品介绍",
                hasCart: true,
                hasBottomNav: false,
                hasGeoLoc: false,
                hasEditor: false,
                hasSearch: false,
            }
        ));

    }

    tabActive = (index) => {
        const { spec } =  this.state ;
        console.log(index);
        var price =this.state.price;
        var endPrice=this.state.endPrice;
        var selectproduct=this.state.product;
        for(let i=0;i<spec.length;i++){
              if(i===index){
                spec[i].status='true';
                price = spec[i].price;
                endPrice= spec[i].endPrice
                selectproduct=spec[i].product
              }else{
                spec[i].status='false'
              }

        }
        console.log(spec);
       this.setState({
         spec,
         price:price,
         endPrice:endPrice,
         SelectProduct:selectproduct

       }


       )


    }
    renderItem = (spec,index) => {
        if (spec.spec) {
          console.log(spec.status);
          return(
              <SpecBox onClick={()=>this.tabActive(index)} key={index} active={spec.status.toString()}>
                  <SpanText active={spec.status} key={index}>{spec.spec}</SpanText>
              </SpecBox >
          )
        }
        else {
          return(
            <SpanText active={spec.status}></SpanText>
          )
        }

    }

    render() {
        const {classes, appInfo, productShow, match, history} = this.props;
        const {spec,price,endPrice,SelectProduct} = this.state;
        console.log(SelectProduct);
        console.log(this.props.productShow);
        // let  rst = {};
        // for(let i = 0; i < specs.length; i++){
        //     rst[specs[i]] = false
        // }
        // console.log(rst)
        if(productShow.product === {}){
            return (
                <Grid  container
                direction="column"
                justify="space-between"
                alignContent="center"
                alignItems="center"
                style={{backgroundColor: "white"}}>
                    <h2>此商品已经下架，敬请期待</h2>
                </Grid>
            )
        }
        if(appInfo.error){
            if(appInfo.reason===404 || appInfo.reason===500){
                return (
                    <Grid  container
                    direction="column"
                    justify="space-between"
                    alignContent="center"
                    alignItems="center"
                    style={{backgroundColor: "white"}}>
                        <h2>服务器错误{appInfo.reason}，马上联系管理员</h2>
                        <h4>Simon 18820965455</h4>
                    </Grid>
                )
            }

        }
        if(productShow.loading){
            return (
                <Grid  container
                direction="column"
                justify="space-between"
                alignContent="center"
                alignItems="center"
                style={{backgroundColor: "white"}}>
                    <LoadingItem />
                </Grid>

            )
        }

        return (
            <Grid  container
                direction="column"
                justify="space-between"
                // alignContent="center"
                // alignItems="center"
                style={{backgroundColor: "white"}}>
               <ProductCarousel imgs={productShow.product.images}/>
               <div className={classes.productInfo}>
                    <div className={classes.productName}>{SelectProduct.name_zh}</div>
                    <div className={classes.productBrief} >{productShow.product.brief}</div>
                    <div className={classes.productPrice}>
                        <div className={classes.price}>{"¥"+this.state.endPrice/100}<span  className={classes.firstPrice} >{"¥ "+this.state.price/100}</span></div>
                        <span className={classes.sale}>销量:<span style={{color:'rgb(156, 148, 148)'}}>{productShow.product.sales_volume}笔</span></span>
                        <div className={classes.send}>
                            配送方式:包邮
                        </div>
                    </div>
                    <LeftWrap>
                        <SpecText>规格</SpecText>
                    </LeftWrap>
                    <SpecWrap>

                        <RightWrap>
                            {
                                spec.map((spec,index)=>{
                                        return (
                                         <div>
                                          { this.renderItem(spec,index)}
                                          </div>
                                        )

                                })
                            }
                        </RightWrap>
                    </SpecWrap>
                </div>
                <div style={{width: "100%",paddingBottom:50}}>
                    <ProductTabs des={productShow.product.detailsImage} parameterlists={productShow.product.parameterlist}/>
                </div>
                <ProductBottomBar isAppointment={productShow.product.isAppointment} product={this.state.SelectProduct} history={history} url={match.url}/>
        </Grid>

        );
    }
}

const SpecWrap = styled.div`
    margin: 2px 0;
    display: flex;
`
const SpanText =styled.span`
    color:${props => props.active==="true" ? "white" : "rgba(0, 0, 0, 0.73)" };;
    font-size:16px
`
const LeftWrap  = styled.div`
    color: #999;
    margin:0px 5px
`

const RightWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const SpecBox = styled.div`
    padding: 2px 6px;
    margin: 5px 5px;
    color:${props => props.active==="true" ? "white" : "black" };;
    background:${props => props.active==="true" ? "#fdcd69" : "rgba(179, 176, 163, 0.43)" };;
    border-radius:7px;
    color: #666;
    font-size: 12px;

`

const SpecText = styled.div`
    font-size:14px;
    margin: 8px 0 0 0;
`

ProductShow.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  function mapToState(state){
      return {
          productShow: state.ProductShow,
          appInfo: state.AppInfo,
          user: state.AppUser
      }
  }


export default connect(mapToState)(withStyles(styles)(ProductShow));
