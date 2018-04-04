import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Hidden from 'material-ui/Hidden';
import withWidth from 'material-ui/utils/withWidth';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';

import AppInfo from '../config/app.json';




const styles = theme => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    width: "100%",
    zIndex: '1000'
    
  },
  appbar: {
    backgroundColor: "rgba(4, 4, 4, 0.1)",
    borderBottom: "white 1px outset",
    // Match [0, md + 1[
    //       [0, lg[
    //       [0, 1280px[
    [theme.breakpoints.down('md')]: {
      backgroundColor: "rgba(4, 4, 4, 0.3)",
    },
  },
  drawerPaper: {
    position: 'relative',
    width: "50px",
  },
  flex: {
    flex: 1,
    color: "white",
    fontWeight: 'bolder',
    fontSize: '28px',
    display: "flex",
    height: "60px",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing.unit*0,
      color: "white",
      fontWeight: 'bolder',
      height: "54px",
      fontSize: "28px",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      justifyItems: "center",
      alignItems: "center",
      ListItemText: {
          color: 'white',
      },
    },
  },
  logoImage: {
    width: "80px",
    [theme.breakpoints.down('sm')]: {
      width: "20px",
      height: "15px",
    }
  },
  button: {
    margin: theme.spacing.unit*0.5,
    color: "white",
    fontWeight: 'bolder',
    fontSize: '20px',
    ListItemText: {
        color: 'white',
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing.unit*0,
      color: "white",
      fontWeight: 'bolder',
      fontSize: '18px',
     
      ListItemText: {
          color: 'white',
      },
    },
  },
  listItem:{
    margin: theme.spacing.unit*0.5,
    color: "white",
    fontWeight: 'bolder',
    fontSize: '20px',
    ListItemText: {
        color: 'white',
    },
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  paper: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: "white",
      opacity: 0.1,
  },
  menuList: {
    color: "white"
  },
  list: {
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.31)", height: '100%'
  }
});

class MenuAppBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            auth: true,
            drawer: false,
            open: false,
        }
    }
    handleClick = () => {
        this.setState({ open: !this.state.open });
      };
    
      handleClose = () => {
        if (!this.state.open) {
          return;
        }
    
        // setTimeout to ensure a close event comes after a target click event
        this.timeout = setTimeout(() => {
          this.setState({ open: false });
        });
      };
    toggleDrawer = (open)=>() => {
        this.setState({
            drawer: open,
        });
    };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };


  handleClose = () => {
    if (!this.state.open) {
        return;
      }
    this.timeout = setTimeout(() => {
    this.setState({ open: false });
    });
  };
  componentDidMount(){
     
      clearTimeout(this.timeout);
  }

  render() {
    document.title = AppInfo.name_zh;
    const { classes } = this.props;
    const { auth } = this.state;
    const { open } = this.state;
    const sideList = (
        <div>
                <List component="nav">
                <ListItem button tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer(false)}
                                onKeyDown={this.toggleDrawer(false)}
                                
                                >

                <ListItemText classes={{primary: classes.listItem}} primary="Home" />
                </ListItem>
                <ListItem button tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer(false)}
                                onKeyDown={this.toggleDrawer(false)}
                                
                                >

                <ListItemText classes={{primary: classes.listItem}} primary="Login" />
                </ListItem>
                <ListItem button tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer(false)}
                                onKeyDown={this.toggleDrawer(false)}
                                
                                >

                <ListItemText classes={{primary: classes.listItem}} primary="New User" />
                </ListItem>
                <ListItem button>
 
                <ListItemText  classes={{primary: classes.listItem}} primary="White Paper" />
                </ListItem>
                <ListItem button>
 
                <ListItemText  classes={{primary: classes.listItem}} primary="Tech" />
                </ListItem>

                <ListItem button>
                
                <ListItemText classes={{primary: classes.listItem}} primary="Team" />
                </ListItem>
                <ListItem button>
                
                <ListItemText classes={{primary: classes.listItem}} primary="Business" />
                </ListItem>
                
            </List>
            
        </div>
      );
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
                <Hidden mdDown>
                <IconButton onClick={this.toggleDrawer(true)} className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
               
                <Drawer classes={{
                    paper: classes.list,
                    button: classes.button,
                    }} open={this.state.drawer} onClose={this.toggleDrawer(false)}>
                    {sideList}
                </Drawer>
                </Hidden>
            <Typography variant="title" color="inherit" className={classes.flex}>
                 
              <div>
                  <span>{document.title} </span>
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default compose(withStyles(styles), withWidth())(MenuAppBar);