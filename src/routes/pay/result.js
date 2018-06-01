import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  card:{
    width:'92%',
    marginLeft:'4%',
    marginTop:'4%',
    borderRadius:8,
    textAlign:'center',
    paddingTop:10,
    paddingBottom:10
  },
  title:{
    marginTop:10,
    marginBottom:10
  },
  button:{
    marginTop:10,
    marginBottom:10

  }
})
class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    const { classes,layout,status } = this.props
    return ( 
      <Card className={classes.card}>
        {status==='success'&&
          <div>
            <div className={classes.title}>恭喜你，支付成功！</div>
            <div><img alt='success' style={{height:'100'}} src={require('../../components/imgs/success.svg')}/>
            </div>  
          </div>
        }
        {status==='fail'&&
          <div>
            <div className={classes.title}>抱歉，支付失败！</div>
            <div><img alt='fail' style={{height:'100'}} src={require('../../components/imgs/fail.svg')}/>
            </div>  
          </div>
        }
                {status==='cancel'&&
          <div>
            <div className={classes.title}>对不起，您已经取消支付！</div>
            <div><img alt='cancel' style={{height:'100'}} src={require('../../components/imgs/cancel.svg')}/>
            </div>  
          </div>
        }
        <div className={classes.button}>
          <Button variant="raised" color="primary" mini href="#/my/orders" >
            查看所有订单
          </Button>
        </div>

      </Card>
      
     )
  }
}
function mapToState(state){
  return {
  }
}

export default connect(mapToState)(withStyles(styles)(Result));