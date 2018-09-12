import React from 'react'
import Bankcard from '../../components/bankcard/'
import { setAppLayout } from '../../actions/app';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Image from '../../components/imgs/money.svg';
import grey from '@material-ui/core/colors/grey'
import { loadUserBankcards } from '../../actions/bankcards';


const styles = theme => ({
  card: {
    minWidth: 275,
    backgroundColor:grey[900],
    background:'url('+Image+')',
    width:'92%',
    marginLeft:'4%',
    marginTop:4,
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

    if(bankcards === "unloaded"){
      dispatch(loadUserBankcards());
    }


  }
  render (){
    const {  bankcards } = this.props;
    if(bankcards === "unloaded"){
      return <h3>加载中</h3>

    }
    if(bankcards.length === 0){
      return <h3>您还没有绑定银行卡</h3>
    }

    return(
        <div>

          {
            bankcards.map((card, index)=> {
              console.log(card);

              return <Bankcard key={index} isBankcard={true} bankcardId={card._id}
              dispatch={this.props.dispatch}
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
