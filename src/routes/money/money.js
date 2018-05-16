import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadOneOrder } from '../../actions/orders';
import { setAppLayout } from '../../actions/app';
import { withStyles } from 'material-ui/styles';
import Bankcard from '../../components/bankcard/'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  card:{
    width:'92%',
    marginLeft:'4%',
    marginTop:'4%',
    borderRadius:8
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },

})
class Money extends React.Component{
  state = {
    value: 0,
  };

  componentDidMount(){
    const { dispatch, match, layout } = this.props;
    console.log(this.props);
    
    if(layout.title!=='财务'){
        dispatch(loadOneOrder(match.params.id));
        dispatch(setAppLayout(
            {
                isBack: true, 
                backTo: "/", 
                title: "财务", 
                hasCart: false, 
                hasBottomNav: true, 
                hasGeoLoc: false,
                hasEditor: false, 
                hasSearch: false,
            }
        ));
    }

  }
    handleChangeIndex = index => {
      this.setState({ value: index });
    };
    handleChange = (event, value) => {
      this.setState({ value });
    };

  render(){
    const { classes, theme } = this.props;


    return(
      <div>
        <Bankcard isBankcard={false} cardData={{title:"杨志强",subtitle:'已在万人车汇获得佣金',carNumber:'￥9562356',}}/>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
             收益
            </Typography>
            <Typography variant="headline" component="h2">
            dddddlkdlkada
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
             明细
            </Typography>
            <Typography variant="headline" component="h2">

            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

function mapToState(state){
  return {
    user: state.AppUser,
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(withStyles(styles)(Money));