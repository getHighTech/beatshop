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
    }

  });
 class ProductShow extends Component {
    constructor(props){
        super(props);
        this.state ={
            snackOpen: false,
            snackContent: ""
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

    render() {
        const {classes, appInfo, productShow, match, history} = this.props;
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
                        <div className={classes.price}>{"¥"+productShow.product.endPrice/100}</div>
                        <span className={classes.sale}>销量:<span style={{color:'rgb(156, 148, 148)'}}>{productShow.product.sales_volume}笔</span></span>
                        <div className={classes.send}>
                            配送方式:包邮
                        </div>
                    </div>

                </div>
                <div style={{width: "100%",paddingBottom:50}}>
                    <ProductTabs des={productShow.product.detailsImage}/>
                </div>
                <ProductBottomBar isAppointment={productShow.product.isAppointment} product={productShow.product} history={history} url={match.url}/>
        </Grid>

        );
    }
}

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
