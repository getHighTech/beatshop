
import Axios from 'axios';
import { setStore, getStore } from '../tools/localStorage';

const uuidv4 = require('uuid/v4');


export async function getToken(){
 
  if(getStore("token") && getStore("uuid")){
    return {
      uuid: await getStore("uuid"),
      token: await getStore("token")
      
    }
  }else{
    let uuid = uuidv4();
    let rlt = await Axios.get("http://test2.10000cars.cn/api/v1/get_token?uuid="+uuid)
    let token = rlt.data.msgCiphered;
    await setStore("token", token);
    await setStore("uuid", uuid);

    return {
      uuid,
      token,
    }

  }

}


