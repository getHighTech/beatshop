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
import { loadApp, loadGeoAddress } from '../actions/process/load_app';
import InvalidApp from './InvalidApp';
import NoMatchPage from './not_match_page'
import ProductShow from './products/id.js'
import AppCart from './cart'
const history = createHistory();

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

const HomeWithPath = () => (
    <Home history={history}/>
)

class App extends React.Component {
   
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
        const { dispatch, store} = this.props;
        if(!store.AppInfo.init){
            dispatch(loadGeoAddress());
            dispatch(loadApp());
        }
    }

    render(){
        const { classes } = this.props;
        const { store} = this.props;
        
        if (!store.AppInfo.init) {
            return (
                <LoadApp />
            )
        }
        if(store.AppInfo.fail){
            return (
                <InvalidApp />
            )
        }
        return (
            <Router  className={classes.root} >
                <MainLayout history={history}>
                    <Switch>
                        <Route exact path="/" component={HomeWithPath} />
                        <Route path="/products/:id" component={ProductShow} />
                        <Route path="/cart" component={AppCart} />
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
