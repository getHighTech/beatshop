import React from 'react'
import Bankcard from '../../components/bankcard/'
import { loadOneOrder } from '../../actions/orders';
import { setAppLayout } from '../../actions/app';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Image from '../../components/imgs/money.svg';
import Card,{CardActions,CardContent,CardHeader} from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';


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
    const { dispatch, match, layout } = this.props;
    console.log(this.props);
    
    if(layout.title!=='我的银行卡'){
        dispatch(loadOneOrder(match.params.id));
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
            }
        ));
    }

  }
  render (){
    const { classes } = this.props;

    return(
      <div>
        <Bankcard isBankcard={true} cardData={{title:"储蓄卡",subtitle:'支行地址:厦门松柏支行',carNumber:'565223268689562356',}}/>
        <Bankcard isBankcard={false} cardData={{title:"杨志强",subtitle:'已在万人车汇获得佣金',carNumber:'￥9562356',}}/>
        <div>
        <Card className={classes.card}>
    

      
          <CardContent className={classes.content}>
          <Typography>
            <Button variant="fab" color="primary" aria-label="add" className={classes.button} href="#/my/new_bankcard">
              <Icon>add_circle</Icon>
            </Button>
          </Typography>
  
          </CardContent>


        </Card>
      </div>
      </div>
    )
  }
}


function mapToState(state){
  return {
    orderShow: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(withStyles(styles)(BankcardsList));