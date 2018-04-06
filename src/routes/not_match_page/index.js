
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { setAppLayout } from '../../actions/app';


import { connect } from 'react-redux';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class NotMatchPage extends React.Component {
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(setAppLayout(
      {
          isBack: true, 
          backTo: "/", 
          title: "产品介绍", 
          hasCart: false, 
          hasBottomNav: false, 
          hasGeoLoc: false,
          hasEditor: false, 
          hasSearch: false,
      }
  ));
  }
  render(){
    return (
      <div>
          <h3>404页面没有找到</h3>
      </div>
    );
  }
  
}

NotMatchPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapToState(state){
  return {
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(withStyles(styles)(NotMatchPage));