import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAppLayout } from '../../actions/app';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const styles = theme => ({
  root: {
    width: '100%',
  },
  avatar: {
    width: 65,
    height: 65,
  },
  item:{
    borderBottom:'1px solid #aaa'
  },
  textField: {
   marginLeft: theme.spacing.unit,
   marginRight: theme.spacing.unit,
   width: 200,
   },
   button: {
     margin: theme.spacing.unit,
   },
   aa:{
     textAlign:'center'
   }
});
class EditDatas extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false  }
  }
  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  changeCover = () => {
    console.log('上传头像方法在此');
  };
  componentDidMount(){
    const { dispatch, layout } = this.props;
    if(layout.title!=='编辑资料'){
        dispatch(setAppLayout(
            {
                isBack: true,
                backTo: "/my",
                title:'编辑资料',
                hasCart: false,
                hasBottomNav: false,
                hasGeoLoc: false,
                hasEditor: false,
                hasSearch: false,
            }
        ));
    }
  }
  render(){
    const { classes } = this.props;
    return(
      <div className={classes.root}>
      <List>
        <ListItem className={classes.item} button onClick={this.changeCover}>
          <ListItemText primary="头像"  />
          <Avatar
            alt="Adelle Charles"
            src="http://img05.tooopen.com/images/20150820/tooopen_sy_139205349641.jpg"
            className={classes.avatar}
          />
        </ListItem>
        <ListItem className={classes.item} button onClick={this.handleClick}>
          <ListItemText primary="姓名"  />
          周世雄
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>


          <Collapse in={this.state.open} timeout="auto" unmountOnExit className={classes.item}>
            <List component="div" disablePadding className={classes.aa}>
            <TextField
                id="with-placeholder"
                label="设置新名字"
                placeholder="长度不要大于10个字符"
                className={classes.textField}
                margin="normal"
              />
              <Button variant="contained" color="primary" className={classes.button}>
                确认
              </Button>
            </List>

          </Collapse>


      </List>
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
EditDatas.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapToState)(withStyles(styles)(EditDatas));
