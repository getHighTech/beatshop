
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { setAppLayout, appShowMsg } from '../../actions/app';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
import { useOneContact, getUserContacts, deleteUserContact } from '../../actions/contacts';
import { judgeCarNumberNeed } from '../../actions/orders';
import { getStore } from '../../tools/localStorage';
import ContactsBottom from '../../components/contacts/ContactsBottom';
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

  constructor(props){
    super(props);
    this.state ={
      carNumberNeed: false,
      showBottomOpera: false,
      checkedId: null,
      checkedIds: {

      }
    }
  }

  deleteMethod(){
      this.setState({
        checkedIds: {},
        checkedId:null,
        showBottomOpera: false
      })

      const { dispatch } = this.props;
      dispatch(deleteUserContact(this.state.checkedId));
      dispatch(getUserContacts(getStore('userId')));
      
    
  }

  setDefaultMethod(){
    this.setState({
      checkedIds: {},
      checkedId:null,
      showBottomOpera: false
    })
    
  }

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
          
          if(product.name_zh==="鲜至臻品黑卡"){
             
              carNumberNeed = true;
          }
      });
      this.setState({
        carNumberNeed
      })
      dispatch(judgeCarNumberNeed(carNumberNeed));
      dispatch(getUserContacts(getStore("userId")));
    }
    
  }

  handleToggle = value => () => {
    
    let checkedIds = {};
    if(this.state.checkedIds[value._id]){
       checkedIds[value._id] = !this.state.checkedIds[value._id];
    }else{
      checkedIds[value._id] = true;
    }
    if(checkedIds[value._id]){
      this.setState({
        checkedIds,
        checkedId: value._id,
        showBottomOpera: true
      })
    }else{
      this.setState({
        checkedIds,
        checkedId: value._id,        
        showBottomOpera: false
      })
    }
    
    
  };
  handleItemClick(e, value){
    const { dispatch, orderShow } = this.props;
    // return 
    
    if(!value.carNumber){
      if(orderShow.carNumberNeed){
        dispatch(appShowMsg("car_number_need", 1800));
        return false;
      }
    }
    
    if(orderShow.order){
      dispatch(useOneContact(value, orderShow.id));
    }

    this.props.history.push("/orders/"+orderShow.id);
    
  }
  render(){
    const { classes, userContacts } = this.props;

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
          {userContacts.contacts.map((value, index) => (
              <div>
            <div style={{display: "flex", width: "100%", maxWidth: "500"}} key={index} >
              <div style={{wordWrap: "break-all",  wordBreak: "break-all", width: "20%"}} >{value.name}</div>
              <div style={{wordWrap: "break-all",  wordBreak: "break-all", width: "20%"}} >{value.mobile}</div>
              <div style={{wordWrap: "break-all",  wordBreak: "break-all", width: "20%"}} >{value.address}</div>
              <div style={{wordWrap: "break-all", wordBreak: "break-all", width: "20%"}} >{value.carNumber}</div>
              <Checkbox style={{width: "20%"}}
                  onChange={this.handleToggle(value)} 
                  checked={this.state.checkedIds[value._id]? true : false}
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
        {
          this.state.showBottomOpera && <ContactsBottom setDefaultMethod={()=>this.setDefaultMethod()} deleteMethod={() => this.deleteMethod()} />
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