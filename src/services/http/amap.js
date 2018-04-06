import { loadGeoAddressSuccess } from '../../actions/process/load_app';

function  initMap(){
    if(!window.AMap){
        return null;
    }
    let amap = new window.AMap.Map('', {
        resizeEnable: true
    });
    return amap;
}

export function getAddress(dispatch, getState) {
    let amap = initMap();

    if(!amap){
        return dispatch(loadGeoAddressSuccess("定位失败"));
        
    }
    let geolocation;
    amap.plugin('AMap.Geolocation', () => {
        geolocation = new window.AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new window.AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
        geolocation.getCurrentPosition();
        window.AMap.event.addListener(geolocation, 'complete', (data)=> onComplete(dispatch, data))
        window.AMap.event.addListener(geolocation, 'error', (data) => onError(dispatch, data));

    })

}

function onComplete(dispatch, data) {
    console.log("定位成功")
    dispatch(loadGeoAddressSuccess(data));
}

function onError(dispatch, data){
    console.log(data);
    
    dispatch(loadGeoAddressSuccess(data));
  }
