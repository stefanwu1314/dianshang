import {reqCategoryList, reqCetBannerList,reqCetFloorList} from '@/api'

//用于操作数据
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}

//准备actions 响应组件中的动作
const actions = {
    //通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        if (result.code === 200) {
            // console.log(result.data)
            commit('CATEGORYLIST',result.data)
            
        }
    },
    //获取轮播图数据
    async getBannerList({commit}){
       let result = await reqCetBannerList()
       if (result.code === 200) {
           commit('GETBANNERLIST',result.data)
       }
       
    },
    //获取floor数据
    async getFloorList({commit}){
        let result = await reqCetFloorList()
        if (result.code === 200) {
            commit('GETFLOORLIST',result.data)
        }
        // console.log(result.data);
    }
}

// 用于存储数据
const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
}
//理解为计算属性，简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}