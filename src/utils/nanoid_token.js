import { nanoid } from "nanoid"
//要生成一个随机字符串,且每次执行不能发生变化,游客身份持久存储
export const getNanoid = ()=>{
    //先从本地存储获取idtoken看看是否有
    let nanoid_token = localStorage.getItem('NANOIDTOKEN');
    //若是没有
    if(!nanoid_token){
        //生成游客临时身份
        nanoid_token = nanoid();
        //本地存储存一次
        localStorage.setItem('NANOIDTOKEN',nanoid_token)
    }
    //返回值,若无则是undefinded
    return nanoid_token;
}