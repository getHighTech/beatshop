
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
    const { dispatch, match, orderShow } = this.props;
    let backPath = "/"
    if(match.params.backaction === "orderuse"){
        if(orderShow.id){
            backPath="/orders/"+orderShow.id;
        }
    }
    
    dispatch(setAppLayout(
      {
          isBack: true, 
          backTo: backPath, 
          title: "我的联系方式", 
          hasCart: false, 
          hasBottomNav: false, 
          hasGeoLoc: false,
          hasSearch: false,
          hasNewCreate: true,
      }
  ));
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
  render(){
    const { classes, orderShow, user } = this.props;
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
            <ListItem key={value} dense button>
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
  }
}

export default connect(mapToState)(withStyles(styles)(Contacts));