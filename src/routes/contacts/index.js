
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { setAppLayout } from '../../actions/app';
import grey from 'material-ui/colors/grey';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { useOneContact } from '../../actions/contacts';
import { judgeCarNumberNeed } from '../../actions/orders';
const styles = theme => ({
    row: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: "column",
        width: '100%',
        maxWidth: 560,
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
    let title = "我的地址";
    if(match.params.backaction === "orderuse"){
        title = "选择地址";
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
            editorType: "new_contact"
        }
        
      ));
      let carNumberNeed = false;
      if(!orderShow.order){
        return this.props.history.push("/");
      }
      orderShow.order.products.forEach(product => {
          console.log(product.name_zh==="万人车汇黑卡");
          
          if(product.name_zh==="万人车汇黑卡"){
             
              carNumberNeed = true;
          }
      });
      dispatch(judgeCarNumberNeed(carNumberNeed));
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
    const { classes, userContacts } = this.props;
    console.log(this.props);

    
    return (
      <div className={classes.row}>
        {
          userContacts.contacts.length === 0? 
          <div>
            <h3>您还没有联系方式</h3>
            <Button component="a" href="/#/my/new_contact"
            variant="raised" color="primary" 
             fullWidth={true}>立刻添加一个
             </Button>
          </div>:
          <List component="nav"  style={{width: "90%"}}>
          {userContacts.contacts.map(value => (
              <div>
            <div style={{display: "flex", width: "100%", maxWidth: "500"}} key={value} >
              <div style={{wordWrap: "break-all",  wordBreak: "break-all", width: "20%"}} >{value.name}</div>
              <div style={{wordWrap: "break-all",  wordBreak: "break-all", width: "20%"}} >{value.mobile}</div>
              <div style={{wordWrap: "break-all",  wordBreak: "break-all", width: "20%"}} >{value.address}</div>
              <div style={{wordWrap: "break-all", wordBreak: "break-all", width: "20%"}} >{value.carNumber}</div>
              <Checkbox style={{width: "20%"}}
                  onChange={this.handleToggle(value)}
                  checked={this.state.checked.indexOf(value) !== -1}
                />
                
              
              
            </div>
                <div style={{width: "100%"}}>
                  <Button onClick={(e) => this.handleItemClick(e, value)}  color="secondary" variant="raised" size="small">
                    使用此地址
                  </Button>
                </div>
            <Divider />
            
            </div>
          ))}
        </List>

        }
        
     
            
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
    layout: state.AppInfo.layout,
    userContacts: state.UserContacts,
  }
}

export default connect(mapToState)(withStyles(styles)(Contacts));