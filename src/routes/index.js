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
import Contacts from './contacts';
import NewContact from './contacts/new';

import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import reactives from '../reactives';


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

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            snackOpen: false,
            snackContent: "",
            snackAction: {
                text: "",
                href: "#"
            } 
        }
        
    }

    componentDidMount(){
        const { dispatch, store} = this.props;
        
        dispatch(syncRemoteUser());
        if(!store.AppInfo.init){
            
            dispatch(loadGeoAddress());
            dispatch(loadApp());
        }

    }

    showSnackBar
    (
        showTime=3000,
        snackContent="",
        snackAction={
            text: "",
            href: "#"
        }
    ){
        this.setState({
            snackOpen: true,
            snackContent,
            snackAction
        })
        setTimeout(() => {
            this.setState({
                snackOpen: false
            })
        }, 3000);
    }

    componentWillReceiveProps(nextProps){
        
        reactives(this);
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
                        <Route exact path="/my/new_contact" component={NewContact} />
                        <Route exact path="/login/password" component={AppLoginPassword} />
                        <Route exact path="/404" component={NoMatchPage} />
                        <Route component={NoMatchPage}/>
                    </Switch>
                    <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        className={classes.snackbar}

                        open={this.state.snackOpen}
                        message={this.state.snackContent}
                        action={
                        <Button color="secondary" size="small" component="a" href={this.state.snackAction.href}>
                            {this.state.snackAction.text}
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
        store: state
    }
}
export default connect(mapUserState)(withRoot(withStyles(styles)(App)));
