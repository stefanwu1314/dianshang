//对axios进行二次封装,需要使用请求和响应拦截器
import axios from "axios";

//引入进度条插件
// import nprogress from "nprogress";
//start  and  done
//引入nprogress样式
// import "nprogress/nprogress.css";

// 利用axios对象方法create，去创建一个axios实例
const requests = axios.create({
    // baseURL:"api",
    //设置请求超时时间5s
    baseURL: '/mock',
    timeout:5000
})

// 请求拦截器
requests.interceptors.request.use((config)=>{
    //config:配置对象
    return config;
})
//响应拦截器
requests.interceptors.response.use(res =>{
    //成功回调
    return res.data
},(error)=>{
    //响应失败回调
    return Promise.reject('error')
})

//对外暴露
export default requests



