import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 2*2}}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
});

class ProductTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme ,parameterlists,des} = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="宝贝详情" />
            <Tab label="售后说明" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer   dir={theme.direction}>
          {/* <div style={
            {textAlign: "center",
            marginBottom: "15%",
             display: "flex",
             flexDirection: "column"}}>
          { htmlToReactParser.parse(this.props.des)}
          </div> */}

          {typeof(des)!='undefined'? <img src={this.props.des} style={{width: "100%"}} alt=''/> :'暂无图片' }
          </TabContainer  >
          <TabContainer   dir={theme.direction}>
          <div style={{width:'100%'}}>


            {typeof(parameterlists)!='undefined'?  parameterlists.map((parameterlist,key) => {
              return (
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',padding:'10px',borderBottom:'1px solid #ccc'}} key={key}>
                <div style={{width:'30%',textAlign:'center'}}>
                  <span style={{textAlign:'center'}}>
                    {parameterlist.parameter_name}
                  </span>
                </div>
                <div style={{width:'10%'}}></div>
                <div style={{width:'60%',textAlign:'left'}}>
                  <span style={{textAlign:'center'}}>
                    {parameterlist.parameter_value}
                  </span>
                  </div>
                </div>
              )
            } ): '暂无售后'}


          </div>
          </TabContainer  >
        </SwipeableViews>
      </div>
    );
  }
}



ProductTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProductTabs);
