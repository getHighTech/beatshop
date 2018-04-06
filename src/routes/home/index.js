import React from 'react';
import PropTypes from 'prop-types';

import AppBanner from '../../components/home/banner.js';

import { withStyles } from 'material-ui/styles';
import {connect} from 'react-redux';

import ProductGridList from '../../components/public/ProductGridList';
import { loadHomeIndexProducts } from '../../actions/process/home_index.js';
import LoadingItem from '../../components/public/LoadingItem.js';

import { setAppLayout } from '../../actions/app';

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        backgroundColor: "black",
        paddingBottom: "400px",
        position: "relative",
        top: "-50px",
        width: "100%"
      
    },
   
  });




class Home extends React.Component {
    state = {
        open: false,
        imgSrc: null
      };
    
    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    handleClick = () => {
        this.setState({
            open: true,
        });
    };
    componentDidMount(){
        const { dispatch } = this.props
        dispatch(loadHomeIndexProducts());
        dispatch(setAppLayout(
            {
                isBack: false, 
                backTo: "/", 
                title: "万人车汇", 
                hasCart: true, 
                hasBottomNav: true, 
                hasGeoLoc: true,
                hasEditor: false, 
                hasSearch: false,
            }
        ));
    }
    componentWillReceiveProps(nextProps){
        const {dispatch, currentCity} = nextProps;
        if(currentCity !== this.props.currentCity){
            dispatch(loadHomeIndexProducts());
        }
    }
    render(){
        
        const { classes, productsList } = this.props;
        return (
            <div className={classes.root}>
              <AppBanner />
              { productsList.loading? <LoadingItem/> : 
              <div className={classes.root}>
                <ProductGridList history={this.props.history} products={productsList.products} label="热门"/>
                <h1 style={{color: "white"}}>优选商家</h1>
              </div>
              }
               
              </div>
        )
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  function mapUserState(state){
      return {
          user: state.AppUser,
          productsList: state.ProductsList,
          currentCity: state.AppInfo.currentCity,
      }
  }
  
export default connect(mapUserState)(withStyles(styles)(Home));