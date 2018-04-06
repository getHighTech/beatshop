import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {connect} from 'react-redux';

import ProductCarousel from '../../components/products/carousel';
import ProductTabs from '../../components/products/tabs';
import Grid from 'material-ui/Grid';
import { loadOneProduct } from '../../actions/products';
import LoadingItem from '../../components/public/LoadingItem'
import Paper from 'material-ui/Paper';
import { setAppLayout } from '../../actions/app';

const styles = theme => ({
    root: {
      margin: theme.spacing.unit * 2,
    },
    productItem: {
        position: "relative",
        width: "23%",
        textAlign: "center",
        [theme.breakpoints.down('md')]: {
            position: "relative",
            width: "45%",
            
          },
        
    },
    productItems:{
        width: "80%",
        position: "relative",
        top: "20px",
        marginBottom: "3%"
    }
  });
 class ProductShow extends Component {

    componentDidMount(){
        console.log(this.props.match);
        const { dispatch, match } = this.props;
        dispatch(loadOneProduct(match.params.id));
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
        const {classes, appInfo, productShow} = this.props;
        
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
            if(appInfo.reason=== "PRODUCT NOT FOUND"){
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
                alignContent="center" 
                alignItems="center"
                style={{backgroundColor: "white"}}>
               <ProductCarousel imgs={productShow.product.images}/>
    
                    <Grid container
                        spacing={8}
                        alignItems="center" 
                        alignContent="center"
                        direction="row"
                        justify="space-between"
                        className={classes.productItems}
                    >   
                    <Paper style={{width: "100%", textAlign: "center", padding: 4, margin: 5}}>
                         <div style={{width: "100%", textAlign: "center"}}>{productShow.product.name_zh}</div>
                        <div style={{width: "100%", textAlign: "center", fontWeight: "bolder"}}>{"¥"+productShow.product.endPrice/100}</div>
                        <div style={{width: "100%", textAlign: "center"}} >{productShow.product.brief}</div>
                    </Paper>
                        
                        <div className={classes.productItem} >分享: {"¥"+productShow.product.agencyLevelPrices[0]/100}</div>
                        <div className={classes.productItem} >配送方式: 到店自提（滴滴车主俱乐部）</div>
                        <div className={classes.productItem} >库存: 47</div>
                    </Grid>
                    <div style={{width: "100%"}}>
                       <ProductTabs des={productShow.product.description}/>
                    </div>
                    <br/>
                    <br/>
                    <br/>
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
          appInfo: state.AppInfo
      }
  }


export default connect(mapToState)(withStyles(styles)(ProductShow)); 