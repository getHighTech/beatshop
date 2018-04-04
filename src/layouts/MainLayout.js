import PropTypes from 'prop-types';
import React from 'react'

import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import MenuAppBar from './MenuAppBar';

const styles = theme => ({

  child: {
      top: '100px',
      position: 'relative'
  },
  root: {
    display: "flex",
  }
});

class MainLayout extends React.Component{
   
  constructor(props){
    super(props);
  
  }
  render(){
    const { classes } = this.props;
      return(
        <div className={classes.root}> 
            <MenuAppBar />
            <div>
                {this.props.children}
            </div>
        </div>
  
      )
    
  
    
  }
}
MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withRoot(withStyles(styles)(MainLayout));