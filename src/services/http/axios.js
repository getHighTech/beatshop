import Axios from 'axios'
import {getStore} from '../../tools/localStorage.js';


export function getMyOrder(){
  let userId = getStore("userId");
  if(!userId){
    return "NEED TO LOGIN";
  }
  Axios.get("http://localhost:1235/api/order/status"+"?userId="+userId+"&status=unpaid")
  .then((res)=>{
    console.log(res.data);
  })
}
