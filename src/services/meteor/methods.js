import { MClient } from '../../config/ddp.js';
import { getStore } from '../../tools/localStorage.js';
import App from '../../config/app.json'
let rltIds = [];
let tempResult = null;
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
    console.log(remoteMethodName);
    params.forEach(element => {
        if(element){
            endParams.push(element);
        }
    });
    let actionIsNew = true;
    let rltId = MClient.method(remoteMethodName, endParams);
    console.log(rltId);

        for (let index = 0; index< rltIds.length; index++) {
             if(rltIds[index] === rltId){
                 actionIsNew = false;
             }

        }
        if(actionIsNew){
            rltIds.push(rltId);
        }

        console.log(rltIds);



        return MClient.on("result", message => {
          // console.log(message);
            if (message.id === rltId && !message.error && message.result && rltIds.includes(message.id)) {
                console.log("message", message);

                if (message.result.type === collectionType) {

                    if (message.result.fromMethod === remoteMethodName) {
                        if(tempResult ===message.result.msg){
                            return dispatch(successAction(message.result.msg));
                        }else{
                            tempResult = message.result.msg
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
                // console.log(message);
                // return dispatch(failAction(message.error));
            }
        })

    }
