import PropTypes from 'prop-types';
import React from 'react'

import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import MenuAppBar from './MenuAppBar';
import BottemMav from './BottemNav';
import Hidden from 'material-ui/Hidden';

import AppInfo from '../config/app.json';
const styles = theme => ({

  child: {
      top: '100px',
      position: 'relative'
  },
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "black",
    WebkitOverflowScrolling: "touch",
    height: "100%",
    
  }
});

class MainLayout extends React.Component{
    

  componentDidMount(){
    document.title =AppInfo.name_zh;
  }
 
  render(){
    const { classes } = this.props;
      return(
        <div className={classes.root}> 
            <MenuAppBar history={this.props.history} appInfo={AppInfo} />
            <div style={{
              position: "relative",
              top: "50px"
            }}>
                {this.props.children}
            </div>
            <BottemMav history={this.props.history} />

        </div>
  
      )
    
  
    
  }
}
MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withRoot(withStyles(styles)(MainLayout));