import React from 'react';
import PropTypes from 'prop-types';
import {
    HashRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import createHistory from 'history/createHashHistory';

import MainLayout from '../layouts/MainLayout.js';
import Home from './home/index.js'
import {connect} from 'react-redux';
import LoadApp from './LoadApp.js';
import { loadApp, loadGeoAddress, syncRemoteUser } from '../actions/process/load_app';
import InvalidApp from './InvalidApp';
import NoMatchPage from './not_match_page'
import ProductShow from './products/ProductShow.js'
import AppCart from './cart'
import AppLogin from './login/'
import AppLoginPassword from './login/password'
import MyIndex from './my'
import Order from './orders'
import Contacts from './contacts'
const history = createHistory();

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
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

class App extends React.Component {
    constructor(props){
        super(props)
        
    }

    componentDidMount(){
        const { dispatch, store} = this.props;
        console.log("初始化app");
        
        dispatch(syncRemoteUser());
        if(!store.AppInfo.init){
            
            dispatch(loadGeoAddress());
            dispatch(loadApp());
        }
    }



    render(){
        const { classes } = this.props;
        const { store} = this.props;
        
        if (!store.AppInfo.init ) {
            return (
                <LoadApp title="应用载入中" />
            )
        }
        if(store.OrderShow.loading){
            return (
                <LoadApp title="订单生成中" />
            )
        }
        if(store.AppInfo.fail){
            return (
                <InvalidApp />
            )
        }
        return (
            <Router  className={classes.root} >
                <MainLayout history={history} store={this.props.store}>
                    <Switch>
                        <Route exact path="/" component={HomeWithPath} />
                        <Route  path="/products_by_rolename/:rolename/:productname" component={ProductShowWithPath} />
                        <Route  path="/products/:id" component={ProductShowWithPath} />
                        <Route  path="/orders/:id" component={OrderWithPath} />
                        <Route exact path="/cart" component={AppCart} />
                        <Route exact path="/login" component={AppLogin} />
                        <Route exact path="/my" component={MyIndex} />
                        <Route exact path="/my/contacts/:backaction" component={Contacts} />
                        <Route exact path="/login/password" component={AppLoginPassword} />
                        <Route exact path="/404" component={NoMatchPage} />
                        <Route component={NoMatchPage}/>
                    </Switch>
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
        store: state
    }
}
export default connect(mapUserState)(withRoot(withStyles(styles)(App)));
