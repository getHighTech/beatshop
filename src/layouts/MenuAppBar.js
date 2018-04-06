import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Hidden from 'material-ui/Hidden';
import withWidth from 'material-ui/utils/withWidth';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { connect } from 'react-redux';
import CitySelector from '../components/public/CitySelector';
import CartTop from './CartTop';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import Button from 'material-ui/Button';
import ModeEdit from "material-ui-icons/ModeEdit";


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
      fontSize: "22px",
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
    color: "white",
    fontWeight: 'bolder',
    fontSize: '20px',
    ListItemText: {
        color: 'white',
    },
    [theme.breakpoints.down('sm')]: {
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
            currentCity: "北京市",
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


  componentWillReceiveProps(nextProps){
    const { address } = nextProps;
    this.setState({
      currentCity: "定位中"
    })
    if(address.info === "SUCCESS"){
      this.setState({
        currentCity: address.addressComponent.city
      })
    }
    if(address.info==="FAILED"){
      this.setState({
        currentCity: "定位失败"
      })
      setTimeout(() => {
        this.setState({
          currentCity: "北京市"
        })
      }, 1230);
    }
  }
  handleEditorClick(type){
    console.log("编辑模式", type);
    
  }

  render() {
    
    const { classes, layout } = this.props;
    const { currentCity,  } = this.state;
    
    
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
                <Hidden smDown>
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
                {
                  layout.hasGeoLoc && <CitySelector currentCity={currentCity} color="white"/>
                }
                {
                  layout.isBack && 
                  <Button onClick={()=>this.props.history.push(layout.backTo)} className={classes.button}>
                    <NavigateBefore style={{ fontSize: 36 }}/>
                    返回
                  </Button>
                }
                
               
            <Typography variant="title" color="inherit" className={classes.flex}>
                 
              <div>
                  <span>{layout.title} </span>
              </div>
            </Typography>
            {
              layout.hasCart && <CartTop  history={this.props.history}/>
            }
            { layout.hasEditor &&
              <Button onClick={()=>this.handleEditorClick(layout.editorType)} className={classes.button}>
                <ModeEdit />
              </Button>
            }
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

function mapToState(state){
  return {
    address: state.AppInfo.amap,
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(compose(withStyles(styles), withWidth())(MenuAppBar))
