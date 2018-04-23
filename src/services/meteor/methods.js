import { MClient } from '../../config/ddp.js';
import { getStore } from '../../tools/localStorage.js';
import App from '../../config/app.json'

export default function getRemoteMeteor(dispatch, getState, collectionType, remoteMethodName, params, successAction, failAction){
    let loginToken = getStore("stampedToken");
    let endParams = [loginToken, App.name];
    params.forEach(element => {
        if(element){
            endParams.push(element);
        }
    });
    console.log(endParams);
    let remoteMethodBackNumber=0;
    MClient.method(remoteMethodName, endParams);
        return MClient.on("result", message => {
            if(remoteMethodBackNumber>0){
                //防止同一个远程方法多次执行
                return false;
            }
            if (!message.error) {
                
                if (message.result.type === collectionType) {
                    if (message.result.fromMethod === remoteMethodName) {
                        remoteMethodBackNumber++;
                        return dispatch(successAction(message.result.msg));
                    }
                }
                if(message.result.type === "error"){
                     console.log(message.result);
                    
                    return dispatch(failAction(message.result.reason));
                }
                if(message.result.type === "fail"){
                    console.log(message.result);
                   
                   return dispatch(failAction(message.result.reason));
               }
            }else{
                console.log(message.error.error);
                return dispatch(failAction(message.error.error));
            }
        })
       
    }
