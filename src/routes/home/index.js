import React from 'react';
import AppBanner from '../../components/home/banner.js';
import {connect} from 'react-redux';
import ProductGridList from '../../components/public/ProductGridList';
import { loadHomeIndexProducts } from '../../actions/process/home_index.js';
import LoadingItem from '../../components/public/LoadingItem.js';
import { setAppLayout } from '../../actions/app';
// import { isWeChat, logWechat } from '../../actions/wechat.js';
import { getStore } from '../../tools/localStorage.js';
import styled from 'styled-components'





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
                title: "鲜至臻品", 
                hasCart: true, 
                hasBottomNav: true, 
                hasGeoLoc: true,
                hasEditor: false,
                hasSearch: false,
            }
        ));
    }
    componentWillReceiveProps(nextProps){
        const {dispatch, currentCity, layout, orderShow, history} = nextProps;
        if(orderShow.createStatus === "success"){

            return history.push("/orders/"+orderShow.id);
          }
        if(currentCity !== this.props.currentCity){
            dispatch(loadHomeIndexProducts());
        }
        if(!layout.hasBottomNav){
            dispatch(setAppLayout(
                {

                    isBack: false, 
                    backTo: "/", 
                    title: "鲜至臻品", 
                    hasCart: true, 
                    hasBottomNav: true, 
                    hasGeoLoc: true,
                    hasEditor: false,
                    hasSearch: false,
                }
            ));
        }
    }
    render(){


        const {  productsList} = this.props;

        return (
            <Wrap>
                {getStore("userId")? null : <AppBanner />}
                { 
                productsList.loading ? 
                    <LoadingItem/>
                        :
                    <Wrap  style={{height: "auto", top: getStore("userId")? "60px": "inherit"}}>
                        <ProductGridList {...this.props} products={productsList.products} label="热门"/>
                        <ShopContainer>
                            {/* <h1 style={{color: "white"}}>优选商家</h1> */}
                        </ShopContainer>

                    </Wrap>
                }
             </Wrap>
        )
    }
}
const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding-bottom: 50px;
    position: relative;
    top: -50px;
    width: 100%;
    justify-content: space-between;
    
`

const ShopContainer = styled.div`
    width: 100%;
    position: relative;
    top: 50%;
    text-align: center
`


function mapUserState(state){
      return {
          user: state.AppUser,
          productsList: state.ProductsList,
          currentCity: state.AppInfo.currentCity,
          layout: state.AppInfo.layout,
          orderShow: state.OrderShow
      }
  }

export default connect(mapUserState)(Home);
