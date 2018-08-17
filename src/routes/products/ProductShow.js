import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';

import ProductCarousel from '../../components/products/carousel';
import ProductTabs from '../../components/products/tabs';
import Grid from '@material-ui/core/Grid';
import { loadOneProduct, loadOneProductByRolename } from '../../actions/products';
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
        fontSize:10
    },
    price:{
        color:'#ff5722'
    },
    productName: {
        fontSize: '20px'
    },
    sale:{
      color:'rgb(156, 148, 148)',
      fontSize:'10px',
      marginLeft:'20px'
    },
    firstPrice:{
      marginLeft:'10px',
      color:'rgb(156, 148, 148)',
      fontSize:'12px',
      textDecoration:'line-through'
    }

  });
 class ProductShow extends Component {
    constructor(props){
        super(props);
        this.state ={
            snackOpen: false,
            snackContent: "",
            specs: [{"金色": "true"}, {"银色": "false"}, {"灰色": "false"}]
        }
    }
    handleSnackClose = () => {
        this.setState({ snackOpen: false });
      };

    componentDidMount(){

        const { dispatch, match,user } = this.props;

        if(match.params.id && !match.params.rolename){
            dispatch(loadOneProduct(match.params.id));

        }
        if(match.params.rolename && !match.params.id){
            dispatch(loadOneProductByRolename(match.params.rolename,user.appNameShopId));

        }
        if(match.params.productname){
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
        const { specs } =  this.state ;
        console.log(specs.length)
        for(let i=0;i<specs.length;i++){
          for(let key in specs[i]){
              if(i===index){
                specs[i][key] = "true"
              }else{
                specs[i][key] = "false"
              }
          }
         
        }
       this.setState(
         specs
       )
    //    console.log(specs)
        
    }
    renderItem = (spec,index) => {
        for(let key in spec){
            return(
                <SpecBox onClick={()=>this.tabActive(index)} active={spec[key]}>
                    {key}
                </SpecBox >
            ) 
        }
    }

    render() {
        const {classes, appInfo, productShow, match, history} = this.props;
        const { specs } = this.state
       
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
                    <div className={classes.productName}>{productShow.product.name_zh}</div>
                    <div className={classes.productBrief} >{productShow.product.brief}</div>
                    <div className={classes.productPrice}>
                        <div className={classes.price}>{"¥"+productShow.product.endPrice/100}<span  className={classes.firstPrice} >{"¥ "+productShow.product.price/100}</span></div>
                        <span className={classes.sale}>销量:<span style={{color:'rgb(156, 148, 148)'}}>{productShow.product.sales_volume}笔</span></span>
                        <div className={classes.send}>
                            配送方式:包邮
                        </div>
                    </div>
                    <SpecWrap>
                        <LeftWrap>
                            <SpecText>颜色:</SpecText>
                        </LeftWrap>
                        <RightWrap>
                            {   
                                
                                specs.map((spec,index)=>{     
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
                    <ProductTabs des={productShow.product.detailsImage}/>
                </div>
                <ProductBottomBar isAppointment={productShow.product.isAppointment} product={productShow.product} history={history} url={match.url}/>
        </Grid>

        );
    }
}

const SpecWrap = styled.div`
    margin: 2px 0;
    display: flex;
`

const LeftWrap  = styled.div`
    color: #999;
`

const RightWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const SpecBox = styled.div`
    padding: 2px 6px;
    margin: 5px 10px;
    border: 1px solid  ${props => props.active==="true" ? "red" : "#ccc" };;
    color: #666;
    font-size: 16px;
  
`

const SpecText = styled.div`
    margin: 8px 0;
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
