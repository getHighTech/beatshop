import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';

import Image from '../../components/imgs/shop.jpg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  shopHeader:{
    background:'url('+Image+')',
    height:200,
    textAlign:'center',
    paddingTop:50,

  },
  avatarBox:{
    display: 'flex',
    justifyContent: 'center',
  },
  avatar:{
    width: 60,
    height: 60,
    backgroundColor:'#ff5722'
  },
  title:{
    color:'#fff',
    marginTop:10,
    fontSize:14
  }
  
});
class Shop extends React.Component{
  state = {
    value: 0,
    products:[
      {id:1,name:'xxx',price:100,}
    ]
  };

  handleChange = (event, value) => {
    this.setState({ value });

  };
  
  render(){
    const { classes } = this.props;
    const { value } = this.state;
  


    return(
      <div>
        <div className={classes.shopHeader}>
          <div className={classes.avatarBox}>
          <Avatar className={classes.avatar}>H</Avatar>
          </div>
          <div  className={classes.title}>打码少年</div>
          <div  className={classes.title}>我在猪八戒，服务全世界</div>
        </div>
          <Tabs value={value} 
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth>
            <Tab label="商品" />
            <Tab label="简介" />
          </Tabs>
        {value === 0 && 
        <TabContainer>
          
        </TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
      </div>
    )
  }
}
function mapToState(state){
  return {

  }
}

Shop.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapToState)(withStyles(styles)(Shop))
