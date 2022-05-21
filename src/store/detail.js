import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api";
import { getNanoid } from "../utils/nanoid_token.js";
const actions = {
    //获取产品信息
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code === 200) {
            commit("GETDOOD", result.data);
        }
    },
    //添加到购物车
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let res = await reqAddOrUpdateShopCart(skuId,skuNum);
        if (res.code === 200) {
            //加入成功
            return 'ok'
        }else{
            //加入失败
            return Promise.reject(new Error('faile'))
        }
    }
};
const mutations = {
    GETDOOD(state, goodInfo) {
        state.goodInfo = goodInfo;
    },
};
const state = {
    goodInfo: {},
    nanoid_token: getNanoid()
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
