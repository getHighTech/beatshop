import { MClient } from '../../config/ddp.js';
import { getStore } from '../../tools/localStorage.js';
import App from '../../config/app.json'

export default function getRemoteMeteor(
    dispatch,
     getState,
      collectionType,
       remoteMethodName,
        params,
         successAction,
          failAction){
    let loginToken = getStore("stampedToken");
    let endParams = [loginToken, App.name];
    params.forEach(element => {
        if(element){
            endParams.push(element);
        }
    });
    let tempResult = null;
    let tempRemoteMethodName = null;
    let tempEndParams = null;
    let loadTimes = 0;
    MClient.method(remoteMethodName, endParams);
       
        tempRemoteMethodName = remoteMethodName;
        tempEndParams = endParams;
        return MClient.on("result", message => {
           
            if (!message.error) {
                
                if (message.result.type === collectionType) {
                   
                    if (message.result.fromMethod === remoteMethodName) {
                        if(tempResult ===message.result.msg){
                            return false;
                        }
                        return dispatch(successAction(message.result.msg));
                    }
                }
                if(message.result.type === "error"){
                    
                    return dispatch(failAction(message.result.reason));
                }
                if(message.result.type === "fail"){
                   
                   return dispatch(failAction(message.result.reason));
               }
            }else{
                return dispatch(failAction(message.error.error));
            }
        })
       
    }
