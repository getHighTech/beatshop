import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card,{CardActions,CardContent,CardHeader} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import grey from 'material-ui/colors/grey'
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Image from '../imgs/money.svg';
import blue from 'material-ui/colors/blue'
import Grid from '@material-ui/core/Grid';



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
    borderRadius:8

  },
  header:{
    color:'white'
  },

  subtitle:{
    textAlign:'center',
    color:'white',
    fontSize:15

  },
  content:{
    textAlign:'center',
    fontSize:26,
    color:'#ceb07a',
    letterSpacing:3
  },
  blueAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: blue[500],
  },
  cardTitle:{
    marginTop:20,
    color:'#fff'
  },
  chips:{
    color: grey[50],
    textAlign:'center',
    fontSize:10,
    marginBottom:20
  }
});


class Bankcard extends React.Component{


  render(){
    const { classes } = this.props;
    console.log(this.props.isBankcard)
    return(
      <div>
        <Card className={classes.card}>
        {
          this.props.isBankcard===true?
            <div className={classes.cardHead1}>
              <Grid container>
                <Grid item xs={2}>
                  <img style={{margin:14,height:34}} alt='银行卡图标' src={require('../imgs/card.svg')}/>
                </Grid>
                <Grid item xs={8} sm={6}>
                  <div className={classes.cardTitle}>{this.props.cardData.title}</div>
                </Grid>
              </Grid>        
            </div>:
            <div className={classes.cardHead1}>
            <Grid container>
              <Grid item xs={2}>
              <Avatar className={classes.blueAvatar}>N</Avatar>
              </Grid>
              <Grid item xs={8} sm={6}>
                <div className={classes.cardTitle}>{this.props.cardData.title}</div>
              </Grid> 
            </Grid>        
          </div> 
        }

      
          <CardContent>
            <Typography component="p" className={classes.subtitle}>
            {this.props.cardData.subtitle}
            </Typography>
            <Typography component="p" className={classes.content} >
            {this.props.cardData.carNumber}
            </Typography>
  
          </CardContent>
          {this.props.isBankcard===true?
            <CardActions style={{textAlign:'right',display:'list-item'}}>
              <Button size="small" variant="raised" color="secondary">解除绑定</Button>
            </CardActions>:            
            <Typography component="p" className={classes.chips}>
              用了万人车汇，赚钱就是这么简单
            </Typography>
          }

        </Card>
      </div>
    )
  }

}


Bankcard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bankcard);