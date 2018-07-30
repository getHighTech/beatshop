import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { checkAccess } from '../../actions/check_access';
const styles = theme => ({
    root: {
        flexGrow: 1,
        position: "fixed",
        // width: "100%",
        zIndex: '1000',
        bottom: 0,
        width:"100%",
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up('md')]: {
            position: "fixed",
            width: "100%",
            zIndex: '1000',
            bottom: 50,
          },
        
      },
      appbar: {
        backgroundColor: "rgba(4, 4, 4, 0.1)",
        width: "100%",
        [theme.breakpoints.down('md')]: {
          width: "100%",
          backgroundColor: "rgba(4, 4, 4, 0.76)",
        },
      },
        flex: {
            flex: 1,
        },
    
});
let timer = null;
class ContactsBottom extends React.Component{

    componentWillUnMount(){
      clearTimeout(timer);
    }
    handleSnackClose = () => {
      this.setState({ snackOpen: false });
    };
    handleAddToCart(product, count, shopId){
        const {dispatch } = this.props;
        dispatch(checkAccess("buy", product, "add_product_to_cart"))
      }
    
    render(){
      const { classes } = this.props;
      
      return (
        <div className={classes.root}>
        
        <AppBar position="static" className={classes.appbar} color="default">
          <Toolbar style={{backgroundColor: "rgba(4, 4, 4, 0.3)", color: "white"}}>
          <Button onClick={()=> this.props.deleteMethod()} color="primary" className={classes.flex}>删除</Button>
          {/* <Button onClick={()=> this.props.setDefaultMethod()} color="secondary" className={classes.flex} >设为默认</Button> */}
          </Toolbar>
        </AppBar>
        
        </div>
    );  
  }
  
}

ContactsBottom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactsBottom)

