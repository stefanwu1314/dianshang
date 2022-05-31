import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);

//3级联动--全局组件
import TypeNav from './components/TypeNav/type-nav.vue'
Vue.component(TypeNav.name,TypeNav)
//分页
import Pagination  from './components/the-pagination.vue';
Vue.component(Pagination.name,Pagination)
//引入mockServer.js
import '@/mock/mockServer';

import * as API from "@/api";

// reqCategoryList().then(res => console.log(res))

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },

  //组件身上多了$store属性
  store,
  router: router
}).$mount('#app')  
