import React from 'react'
import Bankcard from '../../components/bankcard/'
import { setAppLayout } from '../../actions/app';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Image from '../../components/imgs/money.svg';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { loadUserBankcards } from '../../actions/bankcards';


const styles = theme => ({
  card: {
    minWidth: 275,
    backgroundColor:grey[900],
    background:'url('+Image+')',
    width:'92%',
    marginLeft:'4%',
    marginTop:'4%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition:'100% 0%',
    borderRadius:8,
    textAlign:'center',
    height:160
  },
  content:{
    marginTop:36
  }
})

class BankcardsList extends React.Component{

  componentDidMount(){
    const { dispatch, layout, bankcards } = this.props;
    
    if(layout.title!=='我的银行卡'){
        dispatch(setAppLayout(
            {
                isBack: true, 
                backTo: "/my", 
                title: "我的银行卡", 
                hasCart: false, 
                hasBottomNav: false, 
                hasGeoLoc: false,
                hasEditor: false, 
                hasSearch: false,
                hasCreateBankcard: true,
                editorType: "createNewBankcard"
            }
        ));
    }
    console.log(bankcards);
    
    if(bankcards === "unloaded"){
      console.log(bankcards);
      
      dispatch(loadUserBankcards());
      
    }


  }
  render (){
    const { classes, bankcards } = this.props;
    if(bankcards === "unloaded" || bankcards === []){
      return <h3>您还没有绑定银行卡</h3>
    }

    return(
        <div>
          
          {
            bankcards.map((card, index)=> {
              
               
              return <Bankcard key={index} isBankcard={true} 
              cardData={{title:card.realName, subtitle: card.bankAddress, carNumber: card.accountNumber,}}/>
            })
          }
          
        <div>
        
      </div>
      </div>
    )
  }
}


function mapToState(state){
  return {
    orderShow: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout,
    bankcards: state.UserBankcards.cards,
  }
}

export default connect(mapToState)(withStyles(styles)(BankcardsList));