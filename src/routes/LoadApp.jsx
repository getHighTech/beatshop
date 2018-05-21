import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


const styles = {
  root: {
    flexGrow: 1,
    position: "relative",
    top: "58px",
    textAlign: "center"
    
  },
};



function LoadApp(props) {
    const { classes } = props;
    return (
      <div className={classes.root}>
         <h4>{props.title}</h4>
          <LinearProgress />
          <br />
        <LinearProgress color="secondary" />
      </div>
    );
  }

LoadApp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadApp);
