import { reqSearchInfo } from "@/api"

//准备actions 响应组件中的动作
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqSearchInfo(params)
        commit('GETSEARCHLIST', result.data)
    }
}
//用于操作数据
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
// 用于存储数据
const state = {
    searchList:{}
}
//理解为计算属性，简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    goodsList(state){
        //若网络慢 返回空数组否则是undefined
        return state.searchList.goodsList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}