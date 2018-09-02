import URI from 'urijs';
import axios from 'axios';
import { setStore,getStore } from '../tools/localStorage.js'
import serverConfig  from '../config/server';
import wx from 'weixin-js-sdk'

export const wechatShare =()=>{
  // const url = document.location.href
  const uri = new URI(document.location.href);
  const url =document.location.href.split('#')[0];
  alert(url)
// const urll=window.location.href.split('#').toString();
  axios.get(`${serverConfig.server_url}/api/wechatShare`,{
      params: {
           url
       }
     }).then((res)=>{
    console.log(res.data);
    setStore('ticket',res.data)



  })
  let ticket = getStore("ticket");
  console.log(ticket);
  wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx387b34583841ec2d',
        timestamp: ticket.timestamp, // 必填，生成签名的时间戳
        nonceStr: ticket.nonceStr, // 必填，生成签名的随机串
        signature: ticket.signature,// 必填，签名
        jsApiList: ['onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone']// 必填，需要使用的JS接口列表
    });
    wx.error(function(res){
      console.log(res.errMsg);
      alert(res.errMsg)
    });
    wx.ready(function(){
       // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
       wx.onMenuShareTimeline({
           title: '111', // 分享标题
           link: 'http://mp.weixin.qq.com?params=value', // 分享链接
           imgUrl: 'http://img07.tooopen.com/images/20170226/tooopen_sy_199659683184.jpg', // 分享图标
           success: function () {
             console.log('success');
           },
           cancel: function () {
             console.log('fail1231231231231');
           }
       });
  //      wx.onMenuShareAppMessage({
  //      title: 'xxxxxxx', // 分享标题
  //      desc: 'xxxxxxx', // 分享描述
  //      link: 'http://www.xxxxx.com:8082/xxx/xxx.do?id='+id, // 分享链接
  //      imgUrl: 'http://www.xxxxx.com:8080/xxx/xxx.jpg', // 分享图标
  //      type: '', // 分享类型,music、video或link，不填默认为link
  //      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
  //      success: function () {
  //          // 用户确认分享后执行的回调函数
  //      },
  //      cancel: function () {
  //          // 用户取消分享后执行的回调函数
  //      }
  //  });
});


}
