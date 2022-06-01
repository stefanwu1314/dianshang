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
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade/index.vue'
import Pay from "../pages/Pay/index.vue";
import store from '@/store';
import paySuccess from '../pages/PaySuccess/index.vue'
import Center from "../pages/Center/index.vue";
import groupOrder from "../pages/Center/groupOrder/index.vue";
import myOrder from "../pages/Center/myOrder/index.vue";
// import home from '@/store/home';
//拷贝Vuerouter原型对象的push并保存
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写Vuerouter原型对象的push | replace方法同push
//location表示往哪里跳转，resolve成功回调，reject失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {});
    }
}

//配置路由
const router = new VueRouter({
    routes: [{
            name: 'home',
            path: '/home',
            component: Home,
            meta: {
                show: true
            }
        },
        {
            name: 'pay',
            path: '/pay',
            component: Pay,
            meta: {
                show: true
            }
        },
        {
            name: 'center',
            path: '/center',
            component: Center,
            meta: {
                show: true
            },
            children: [{
                    name: 'myorder',
                    path: '/myorder',
                    component: myOrder,
                },
                {
                    name: 'grouporder',
                    path: '/grouporder',
                    component: groupOrder,
                },
                {
                    path: '/center',
                    redirect: '/center/myorder'
                }
            ]

        },
        {
            name: 'paysuccess',
            path: '/paysuccess',
            component: paySuccess,
            meta: {
                show: true
            },
            // children:[{
            //     name:Center,
            //     path:'/center',
            //     component:Center,
            //     meta:{
            //         show:true
            //     }
            // }]
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: Search,
            meta: {
                show: true
            }
        },
        {
            name: 'trade',
            path: '/trade',
            component: Trade,
            meta: {
                show: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                show: false
            }
        },
        {
            name: 'detail',
            path: '/detail/:skuId',
            component: Detail,
            meta: {
                show: true
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                show: false
            }
        },
        {
            path: '/addcartsuccess',
            name: 'addcartsuccess',
            component: AddCartSuccess,
            meta: {
                show: true
            }
        },
        {
            path: '/shopcart',
            name: 'shopcart',
            component: ShopCart,
            mata: {
                show: true
            }
        },
        //重定向，在项目跑起来的时候，访问/，立马让他定向到home
        {
            path: '*',
            redirect: '/home'
        }
    ],
    scrollBehavior() {
        return {
            y: 0
        }
    }
})

router.beforeEach(async (to, from, next) => {
    let token = store.state.users.token;
    if (token) {
        if (to.path == '/login') {
            alert('已经是登录状态了');
            next({
                name: 'home'
            });
        } else {
            try {
                await store.dispatch('getUserInfo');
                next();
            } catch (error) {
                await store.dispatch('userLogout');
                next('/login')
            }
        }

    } else {
        if (to.path == '/shopcart' || to.name == 'addcartsuccess') {
            alert('请先登录');
            next('/login');
        } else {
            next();
        }
    }
})

export default router