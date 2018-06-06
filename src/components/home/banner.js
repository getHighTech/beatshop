import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import Image from '../imgs/background3.jpg';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    background: 'url('+Image+')',
    backgroundSize: '100%',
    width: '100%',
    height: '1200px',
    top: '10px',
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      backgroundSize: 'cover', 
      height: '351px',
      top: "-4px"
    },
    
  },
  logoImage: {
    width: "35%",
    
  },
  slogan: {
    color: "white",
    backgroundColor: "rgba(77, 77, 78, 0.38)",
    // backgroundColor: "red",
    top: '180px',
    width: '60%',
    position: 'relative',
    flexDirection: "column",
    marginTop: "5px",        
    marginBottom: "5px", 
    paddingTop:23,
    paddingBottom: "30px",
   alignItems: "center",
   display: "flex",
  
    [theme.breakpoints.down('md')]: {
      display: "flex",
      top: '90px',
      flexDirection: "column",
      alignItems: "center",
     justifyContent: "center",       
     
    },
  },

  mainButton: {
    width:"80%",
    height: "80px",
    [theme.breakpoints.down('md')]: {
      height: "50px",
       
     
    },
  }
 
});

class AppBanner extends React.Component {


  render() {
    const { classes } = this.props;
   
    return (
      <div className={classes.root}  >
            <div className={classes.slogan} color="red">
                <Hidden mdDown>
                <Typography
                      variant="display1"
                      color="inherit"
                    
                    >
                     万人车汇
                    
                    </Typography>
                    <br/>
                </Hidden>
                <Typography
                      variant="title"
                      color="inherit"
                    
                    >
                     享受精彩汽车生活
                    
                    </Typography>
                    <br/>
                <Button variant="raised" size="small" color="secondary"  component={Link} to="/login" >
                  
                    <Hidden mdUp>
                    <Typography
                      variant="subheading"
                      color="inherit"
                    
                    >
                     立即加入
                    
                    </Typography>
                    </Hidden>
                    <Hidden mdDown>


                    <Typography
                      variant="title"
                      color="inherit"
                    
                    >
                     立即加入
                    
                    </Typography>
                    </Hidden>
        
              </Button>
                
            </div>
      </div>
    );
  }
}

AppBanner.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapUserState(state){
    return {
        user: state.AppUser
    }
}

export default connect(mapUserState)(withStyles(styles)(AppBanner));