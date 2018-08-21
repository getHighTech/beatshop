import React from 'react';
import PropTypes from 'prop-types';
import {
    HashRouter as Router,
    Route,
    Switch,Redirect
  } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import createHistory from 'history/createHashHistory';
import MainLayout from '../layouts/MainLayout.js';
import Home from './home/index.js'
import {connect} from 'react-redux';
import  LoadApp from './LoadApp.jsx';
import { loadApp, loadGeoAddress, syncRemoteUser } from '../actions/process/load_app';
import InvalidApp from './InvalidApp';
import NoMatchPage from './not_match_page'
import ProductShow from './products/ProductShow.js'
import AppCart from './cart'
import AppLogin from './login/'
import AppLoginPassword from './login/password'
import MyIndex from './my'
import Order from './orders'
import Contacts from './contacts';
import NewContact from './contacts/new';
import NewBankcard from './my/NewBankcard'
import AllProducts from './products/AllProducts'
import SellingProducts from './products/SellingProducts'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import BankcardsList from './my/BankcardsList';
import Money from './money/money'
import MyOrders from './orders/myOrders.js'
import orderDetails from './orders/orderDetails'
import PayResult from './pay/index.js'
import Shop from './shop/shop';
import withdraw from './withdraw/withdraw';
import Share from './share/share';
import BlackcardHolder from './my/BlackcardHolder';
import EditData from './my/EditData'
import WechatChecker from './WechatChecker.js';
import Team from '../routes/team/index';
import Toast from '../routes/toast/index';
import {  wechatAuth } from '../helper/wechatAuth.js';


const history = createHistory();

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  snackbar: {
    margin: theme.spacing.unit,
  },
});

const HomeWithPath = ({ match }) => (
    <Home history={history} match={match}/>
)

const OrderWithPath = ({ match }) => (
    <Order history={history} match={match}/>
)

const ProductShowWithPath = ({ match }) => (
    <ProductShow history={history} match={match}/>
)
const SellingProductsPath = ({ match }) => (
    <SellingProducts history={history} match={match}/>
)

class App extends React.Component {

    componentDidMount(){
        const { dispatch, appInfo} = this.props;


        dispatch(syncRemoteUser());
        if(!appInfo.init){

            dispatch(loadGeoAddress());
            dispatch(loadApp());
        }

    }







    render(){
        const {classes, appInfo, order, msg, user} = this.props;
        const MyRoute = ({ component: Component, ...rest }) => (
            <Route
              {...rest}
              render={props => {
                if(user.roles.includes("login_user")){
                      wechatAuth()
                    return (
                        <Component {...props} />
                      )
                }else{
                    let msg = props.match.path;
                    if(msg === '/my'){
                        //在个人主页并不提醒需要先登录
                        msg=""
                    }
                    return <Redirect
                    to={{
                      pathname: "/login"+msg,
                      state: { from: props.location }
                    }}
                  />
                }
                }
              }
            />
          );
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route
              {...rest}
              render={props => {
                if(user.roles.includes("login_user")){
                    return (
                        <Component {...props} />
                      )
                }else{
                    let msg = props.match.path;
                    if(msg === '/my'){
                        //在个人主页并不提醒需要先登录
                        msg=""
                    }
                    return <Redirect
                    to={{
                      pathname: "/login"+msg,
                      state: { from: props.location }
                    }}
                  />
                }
                }
              }
            />
          );
          const CarMemberRoute = ({ component: Component, ...rest }) => (
            <Route
              {...rest}
              render={props => {
                if(user.agencyRole!==false){
                    return (
                        <Component {...props} />
                      )
                }else{
                    let msg = props.match.path;
                    if(msg === '/my'){
                        //在个人主页并不提醒需要先登录
                        msg=""
                    }
                    return <Redirect
                    to={{
                      pathname: '/products_by_rolename/blackcard/openshop',
                      state: { from: props.location }
                    }}
                  />
                }
                }
              }
            />
          );
        if (!appInfo.init ) {
            return (
                <LoadApp title="载入中" />
            )
        }
        if(order.loading){
            return (
                <LoadApp title="订单生成中" />
            )
        }
        if(user.logOut === "loading"){
            return (
                <LoadApp title="正在退出" />
            )
        }
        if(appInfo.fail){
            return (
                <InvalidApp />
            )
        }
        return (
            <Router  className={classes.root} >
                <MainLayout history={history} store={this.props.store}>
                    <Switch>
                        <PrivateRoute exact path="/wechat_checker/"  component={WechatChecker} />
                        <PrivateRoute exact path="/wechat_checker/:openid"  component={WechatChecker} />
                        <MyRoute exact path="/my"  component={MyIndex} />
                        <PrivateRoute exact path="/my/orders" component={MyOrders} />
                        <CarMemberRoute exact path="/products" component={AllProducts} />
                        <PrivateRoute exact path="/my/products" component={SellingProductsPath} />
                        <PrivateRoute exact path="/pay/:status" component={PayResult} />
                        <PrivateRoute exact path="/money" component={Money} />
                        <PrivateRoute exact path="/my/contacts/:backaction" component={Contacts} />
                        <PrivateRoute exact path="/my/new_contact" component={NewContact} />
                        <PrivateRoute exact path="/my/orders/:id/:status" component={orderDetails} />
                        <PrivateRoute exact path="/my/blackcard_holder" component={BlackcardHolder} />
                        <PrivateRoute exact path="/my/edit_data" component={EditData} />
                        <PrivateRoute exact path="/orders/:id" component={OrderWithPath} />
                        <Route exact   path="/my/team" component={Team}/>
                        <Route exact path="/share/:id" component={Share} />
                        <PrivateRoute exact path="/shops/:id" component={Shop} />
                        <PrivateRoute exact path="/withdraw" component={withdraw} />
                        <PrivateRoute exact path="/cart" component={AppCart} />
                        <PrivateRoute exact path="/my/bankcards_list" component={BankcardsList} />
                        <PrivateRoute exact path="/my/new_bankcard" component={NewBankcard} />
                        <Route exact path="/" component={HomeWithPath} />
                        <Route  path="/products_by_rolename/:rolename/:productname" component={ProductShowWithPath} />
                        <Route  path="/products/:id" component={ProductShowWithPath} />
                        <Route path="/password-login" component={AppLoginPassword} />
                        <Route path="/login/:msg" component={AppLogin} />
                        <Route exact path="/login" component={AppLogin} />
                        <Route exact path="/toast" component={Toast} />
                        <Route exact path="/404" component={NoMatchPage} />
                        <Route component={NoMatchPage}/>
                    </Switch>
                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        className={classes.snackbar}

                        open={msg.open}
                        message={msg.content}
                        action={
                        <Button color="secondary" size="small" component="a" href={msg.href}>
                            { msg.actionText }
                        </Button>
                        }
                    />
                </MainLayout>

            </Router>
        )
    }
}
App.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapUserState(state){
    return {
        msg: state.AppMsg,
        appInfo: state.AppInfo,
        order: state.OrderShow,
        user: state.AppUser
    }
}

export default connect(mapUserState)(withRoot(withStyles(styles)(App)));
