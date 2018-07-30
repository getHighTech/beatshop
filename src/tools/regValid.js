//密码验证
export function testPassword(pwd){
    let reg = /\S{6}/;
    if(reg.test(pwd)){
        return true;
    }else{
        return false;
    }
}


// 手机号验证
export function testPhone(phone){
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if(reg.test(phone))
        return true;
    else
        return false;
}


//用户验证
export function testUser(user){
    let reg = /^[a-zA-Z]\w{3,15}$/;
    if(reg.test(user)){
        return true;
    }else{
        return false;
    }
}