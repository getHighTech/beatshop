import React from 'react';
import QRCode from 'qrcode-react'
import { setAppLayout } from '../../actions/app';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
const styles = theme => ({
  header:{
    textAlign:'center'
  },
  root:{
    backgroundColor:'#fff'
  }
})
class Share extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      url:''
     }
  }
  componentDidMount(){
    const { dispatch, layout } = this.props;

    if(layout.title!=='分享页面'){
      dispatch(setAppLayout(
          {
              isBack: true, 
              backTo: "/my/products", 
              title: "分享页面", 
              hasCart: false, 
              hasBottomNav: false, 
              hasGeoLoc: false,
              hasEditor: false, 
              hasSearch: false,
          }
      ));
  }
    console.log(this.props)
    let id = this.props.match.params.id
    this.setState({
      url:'https://wanchehui/#/products/' + id
    })
  }
  render() { 
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <img alt='logo' src='/imgs/wanchehui.jpeg' style={{height:60}}/>
        </div>
        <div className={classes.cover}>
          <img alt='商品主图' src='/imgs/webwxgetmsgimg.jpeg' style={{height:'auto',width:'100%'}}/>
        </div>
        <div>{this.state.url}</div>
        <QRCode value={this.state.url} logo='/imgs/webwxgetmsgimg.jpeg'/>,
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

Share.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapToState)(withStyles(styles)(Share))