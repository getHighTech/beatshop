import React from 'react'
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import { connect } from 'react-redux';
import CitySelector from '../components/public/CitySelector';
import CartTop from './CartTop';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import ModeEdit from "@material-ui/icons/ModeEdit";
import OpenInNew from "@material-ui/icons/OpenInNew";
import grey from '@material-ui/core/colors/grey';
import styled from 'styled-components';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    zIndex: '1000'

  },
  btn:{
    padding:0
  }
  ,
  appbar: {
    backgroundColor: grey[800],
    color:theme.secondary,
    borderBottom: "#FFD740 1px outset",
    [theme.breakpoints.down('md')]: {
      backgroundColor: grey[800],
    },
  },
  flex: {
    flex: 1,
    color: theme.secondary,
    fontWeight: 'bolder',
    fontSize: '28px',
    display: "flex",
    height: "60px",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "left",
    position: "relative",
    left: -35,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing.unit*0,
      color: theme.secondary,
      fontWeight: 'bolder',
      height: "54px",
      fontSize: "22px",
      display: "flex",
      justifyContent: "center",
      justifyItems: "center",
      alignItems: "center",
    },
  },


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

    if(address.info === "SUCCESS"){
      if(address.addressComponent){
        this.setState({
          currentCity: address.addressComponent.city
        })
      }else{
        this.setState({
          currentCity: "北京市"
        })

      }

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
    switch (type) {
      case "new_contact":
        this.props.history.push("/my/new_contact")
        break;
      case "withdraw":
        this.props.history.push("/withdraw")
        break;

      case "createNewBankcard":
      this.props.history.push("/my/new_bankcard");
      break;

      default:
        break;
    }

  }

  render() {

    const { classes, layout } = this.props;
    const { currentCity,  } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar} color="secondary">
          <Toolbar style={{paddingRight:0,paddingLeft:0}}>
            <div style={{width:'20%'}}>
                {
                  layout.hasGeoLoc && <CitySelector currentCity={currentCity}  color="secondary" />
                }
                {
                  layout.isBack &&
                  <Button style={{
                    position: "relative",
                    padding:5
                  }} onClick={()=>this.props.history.push(layout.backTo)} color="secondary" >
                    <ChevronLeft style={{ fontSize: 20 }}/>
                    返回
                  </Button>
                }
              </div>
            <div style={{width:'60%',textAlign:'center'}}>

            <Typography variant="title" color="secondary" >

              <div>
                  <span style={{fontSize:18}}>{layout.title} </span>
              </div>
            </Typography>
            </div>
            <div style={{width:'20%',textAlign:'right',marginRight:5}}>
            {
              layout.hasCart && <CartTop  history={this.props.history} style={{marginRight:10}} color="secondary"/>
            }
            { layout.hasEditor &&
              <Button onClick={()=>this.handleEditorClick(layout.editorType)} className={classes.btn} color="secondary">
                编辑
                <ModeEdit />
              </Button>
            }
            { layout.hasNewCreate &&
              <Button onClick={()=>this.handleEditorClick(layout.editorType)} className={classes.btn} color="secondary">
                新建
                <OpenInNew />
              </Button>
            }
            { layout.hasWithdraw &&
              <Button onClick={()=>this.handleEditorClick(layout.editorType)} className={classes.btn} color="secondary">
                提现
                <OpenInNew />
              </Button>
            }
            { layout.hasCreateBankcard &&
              <Button onClick={()=>this.handleEditorClick(layout.editorType)} className={classes.btn} color="secondary">
                新增
                <OpenInNew />
              </Button>
            }
            </div>
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
