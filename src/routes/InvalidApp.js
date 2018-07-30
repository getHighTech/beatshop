import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
    position: "relative",
    top: "58px",
    textAlign: "center"
    
  },
};

function InvalidApp(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <h4>您的APP尚为注册，请联系我们</h4>
      <br />
      <h5>simonxu@10000cars.com</h5>
    </div>
  );
}

InvalidApp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InvalidApp);
