let excutesNumber = 0;
//保证一次只能执行一个变化
function registerReativeFunction(callName, key, instance, history){
    if(excutesNumber>0){
        return false;
    }
    excutesNumber++;
    callName(key, instance, history);
}
export default function reactives(store, history, instance){


}