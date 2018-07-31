import React from 'react';
import urlencode from 'urlencode';
import {setStore, getStore} from '../tools/localStorage.js'

class WechatChecker extends React.Component {


  isWeChat(){
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) === "micromessenger";
  }
  componentDidMount(){
    console.log(this.props);
    // alert(JSON.stringify(this.props));
    let getOpenidCodeUrl = urlencode(window.location.href);

    if(this.props.match.params.openid===undefined){
      if(this.isWeChat()){

        window.location.assign('http://test2.10000cars.cn/app/getopenid/'+getOpenidCodeUrl);
      }else{
        this.props.history.push("/");

      }

    }
    if(this.props.match.params.openid){
      setStore("openid", this.props.match.params.openid);
      this.props.history.push(getStore("pathBeforeLogin"));
    }

  }


  render(){

    return (
        <div>


        </div>
      );

  }


}



export default WechatChecker;
