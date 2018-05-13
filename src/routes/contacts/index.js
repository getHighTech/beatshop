
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { setAppLayout } from '../../actions/app';
import grey from 'material-ui/colors/grey';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import LoadingItem from '../../components/public/LoadingItem';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { useOneContact } from '../../actions/contacts';
const styles = theme => ({
    row: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: "column",
        width: '100%',
        maxWidth: 560,
        backgroundColor: theme.palette.background.paper,
        alignItems: "center",
        backgroundSize: '100%',
        backgroundColor: grey[100],
        paddingTop: "20px",
        flex: 1,
        height: "100%"
      },
      bigAvatar: {
        width: 60,
        height: 60,
      },
      button: {
          width: "90%"
      }
});

class Contacts extends React.Component {
  componentDidMount(){
    const { dispatch, match, orderShow, layout } = this.props;
    let backPath = "/"
    let title = "我的联系方式";
    if(match.params.backaction === "orderuse"){
        title = "选择联系方式";
        backPath="/orders/"+orderShow.id;
    }
    
    if(layout.title !== title){
      dispatch(setAppLayout(
        {
            isBack: true, 
            backTo: backPath, 
            title, 
            hasCart: false, 
            hasBottomNav: false, 
            hasGeoLoc: false,
            hasSearch: false,
            hasNewCreate: true,
        }
      ));
    }
    
  }
  state = {
    checked: [1],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };
  handleItemClick(e, value){
    console.log(this.props);
    const { dispatch, orderShow } = this.props;
    if(orderShow.order){
      dispatch(useOneContact({
        mobile: "18820965455",
        address: "黄泉路44号",
        carNumber: "川A212312",
        name: "徐三岛"
  
      }));
    }

    this.props.history.push("/orders/"+orderShow.id);
    
  }
  render(){
    const { classes, orderShow, user } = this.props;
    console.log(this.props);
    
    const custDivider = () => {
        return (
            <div style={{
                backgroundColor: "darkgrey", 
                height: 1, 
                width: "90%",
                margin: 2,
            }}>&nbsp;</div>
        )
    }

    
    return (
      <div className={classes.row}>
      
        <List component="nav"  style={{width: "90%"}}>
          {[0, 1, 2, 3].map(value => (
              <div>
            <ListItem key={value} dense button onClick={(e) => this.handleItemClick(e, value)}>
              <ListItemText primary={`徐事情 ${value + 1}`} secondary="(正在使用)" />
              <ListItemText primary={`Line item ${value + 1}`} />
              <ListItemText primary={`Line item ${value + 1}`} />
              <ListItemSecondaryAction>
                <Checkbox
                  onChange={this.handleToggle(value)}
                  checked={this.state.checked.indexOf(value) !== -1}
                />
              </ListItemSecondaryAction>
              <ListItemSecondaryAction>
                <Checkbox
                  onChange={this.handleToggle(value)}
                  checked={this.state.checked.indexOf(value) !== -1}
                />
              </ListItemSecondaryAction>
              
            </ListItem>
            <Divider />
            
            </div>
          ))}
        </List>
     
            
      </div>
    );
  }
  
}

Contacts.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapToState(state){
  return {
    user: state.AppUser,
    orderShow: state.OrderShow,
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(withStyles(styles)(Contacts));