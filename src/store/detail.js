import { reqGoodsInfo } from "@/api";

const actions = {
    //获取产品信息
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code === 200) {
            commit("GETDOOD", result.data);
        }
    },
};
const mutations = {
    GETDOOD(state, goodInfo) {
        state.goodInfo = goodInfo;
    },
};
const state = {
    goodInfo: {},
};
const getters = {
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    },
    
};

export default {
    actions,
    mutations,
    state,
    getters
};
