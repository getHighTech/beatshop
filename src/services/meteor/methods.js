import { MClient } from '../../config/ddp.js';


export default function getRemoteMeteor(dispatch, getState, collectionType, remoteMethodName, params, successAction, failAction){
    MClient.method(remoteMethodName, params);
        return MClient.on("result", message => {
            if (!message.error) {
                if (message.result.type === collectionType) {
                    if (message.result.fromMethod === remoteMethodName) {
                        
                        return dispatch(successAction(message.result.msg));
                    }
                }
                if(message.result.type === "error"){
                    return dispatch(failAction(message.result.reason));
                }
            }else{
                console.log(message.error.error);
                
                return dispatch(failAction(message.error.error));
            }
        })
       
    }
