import Vue from 'vue';
import Vuex from 'vuex';
import home from './home';
import search from './search'
import detail from './detail'
import shopcart from './shopcart'

Vue.use(Vuex);
// //准备actions 响应组件中的动作
// const actions = {}
// //用于操作数据
// const mutations = {}
// // 用于存储数据
// const state = {}
// //理解为计算属性，简化仓库数据，让组件获取仓库的数据更加方便
// const getters = {   }


export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart
    }
})