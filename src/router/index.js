import Vue from 'vue';
import VueRouter from "vue-router";

//使用插件
Vue.use(VueRouter);

//引入路由组件
import Home from '../pages/Home/indexHome.vue'
import Search from '../pages/search/indexSearch.vue'
import Login from '../pages/Login/indexLogin.vue'
import Register from '../pages/Register/indexRegister.vue'
import Detail from '../pages/Detail/detail-index.vue'
// import home from '@/store/home';
//拷贝Vuerouter原型对象的push并保存
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写Vuerouter原型对象的push | replace方法同push
//location表示往哪里跳转，resolve成功回调，reject失败回调
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,() => {},() => {});
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,() => {},() => {});
    }
}

//配置路由
const router = new VueRouter({
    routes:[
        {
            name:'home',
            path:'/home',
            component:Home,
            meta: { show : true }
        },
        {
            name: 'search',
            path:'/search/:keyword?',
            component:Search,
            meta: { show : true }
        },
        {
            path: '/login',
            component: Login,
            meta: { show : false }
        },
        {
            name:'detail',
            path:'/detail/:skuId',
            component:Detail,
            meta: { show : true }
        },
        {
            path: '/register',
            component: Register,
            meta: { show : false }
        },
        
        //重定向，在项目跑起来的时候，访问/，立马让他定向到home
        {
            path:'*',
            redirect: '/home'
        }
    ],
    scrollBehavior(){
        return{y:0}
    }
})

export default router