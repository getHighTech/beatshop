import React from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import AppBanner from '../../components/home/banner.js';

import { withStyles } from 'material-ui/styles';
import {connect} from 'react-redux';


import ProductGridList from '../../components/public/ProductGridList';

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        backgroundColor: "black",
        paddingBottom: "400px"
      
    },
   
  });




class Home extends React.Component {
    state = {
        open: false,
        imgSrc: null
      };
    
    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    handleClick = () => {
        this.setState({
            open: true,
        });
    };
    componentDidMount(){
       
        
        
    }
    render(){
        
        const { classes, dispatch } = this.props;
        const { open } = this.state;
        return (
            <div className={classes.root}>
              <AppBanner />
                <ProductGridList />
           
               
               {window.scrollTo(0,0)}
               
 
             
          </div>
        )
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  function mapUserState(state){
      return {
          user: state.AppUser
      }
  }
  
export default connect(mapUserState)(withStyles(styles)(Home));