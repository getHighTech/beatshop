import { MClient } from '../../config/ddp.js';

export default function getRemoteMeteor(dispatch, getState, collectionType, remoteMethodName, params, successAction, failAction){
    MClient.method(remoteMethodName, params);
        return MClient.on("result", message => {
            if (!message.error) {
                
                if (message.result.type === collectionType) {
                    if (message.result.fromMethod === remoteMethodName) {
                        console.log(message.result);
                        
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
