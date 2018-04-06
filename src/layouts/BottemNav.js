import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import Home from 'material-ui-icons/Home';
import AccountBalance from 'material-ui-icons/AccountBalance';
import Person from 'material-ui-icons/Person';
import brown from 'material-ui/colors/brown';
import { connect } from 'react-redux'

const styles = {
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#000000ba"

  }
};

class BottemNav extends React.Component {
  state = {
    value: 0,
   
  };

  handleChange = (event, value) => {
    
    

    switch (value) {
      case 0:
        this.props.history.push("/")
        break;

      case 1:
        this.props.history.push("/money")
        break;
      case 2:
        this.props.history.push("/my")
        break;
    
      default:
        break;
    }
    this.setState({ value});
  };

  componentWillReceiveProps(nextProps){
   
    switch (nextProps.history.location.pathname) {
      case '/':
        this.setState({ value: 0});
        break;
      case '/money':
        this.setState({ value: 1});
        break;
      case '/my':
        this.setState({ value: 2});
        break;
      default:
        break;
    }
    
  }

  render() {
    const { classes, layout } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}

        style={{
          display: layout.hasBottomNav ? "inherit": "none"
        }}
      >
        <BottomNavigationAction  style={{color: this.state.value === 0 ? "white" :  brown[300]  }} label="首页"  icon={<Home />} />
        <BottomNavigationAction   style={{color: this.state.value === 1 ? "white" :  brown[300] }} label="财务" icon={<AccountBalance />} />
        <BottomNavigationAction   style={{color: this.state.value === 2 ? "white" :  brown[300] }} label="我的" icon={<Person />} />
      </BottomNavigation>
    );
  }
}

BottemNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapToState(state){
  return {
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(withStyles(styles)(BottemNav));
