import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountBalance from '@material-ui/icons/AccountBalance';
import Home from '@material-ui/icons/Home';
import Person from '@material-ui/icons/Person';

// import Person from '@material-ui/icons/Person';
import brown from '@material-ui/core/colors/brown';
import { connect } from 'react-redux'
const styles = {
  root: {
    width: "100%",
    position: "fixed",
    backgroundColor: "rgba(0, 0, 0, 0.78)",
    bottom: 0

  }
};

class BottemNav extends React.Component {
  state = {
    value: 0,
    bottom: 0
   
  };

  componentDidMount(){
    this.setState({
      bottom: 0
    })
      //兼容非正常浏览器，比如微信
    
    if(window.innerHeight -  document.body.clientHeight < 0){
      this.setState({
        bottom: 0
      })
    }
    if(window.innerHeight -  document.body.clientHeight > 300){
      this.setState({
        bottom: 0
      })
    }
    if(window.innerHeight>1000){
      this.setState({
        bottom: (window.innerHeight -  document.body.clientHeight)*1.23
      })
    }
    if(window.innerHeight<400){
      this.setState({
        bottom: 0
      })
    }

        
   
  }

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
          display: layout.hasBottomNav ? "inherit": "none",
          bottom: this.state.bottom,
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
