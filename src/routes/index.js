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
import { loadHomeSiteData } from '../actions/site';

const history = createHistory();

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

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
        dispatch(loadHomeSiteData());
    }

    render(){
        const { classes } = this.props;
        return (
            <Router  className={classes.root} >
                <MainLayout history={history}>
                    <Switch>
                        <Route exact path="/" component={Home} />
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
