import {reqTradeInfo,reqAddressInfo} from "@/api";

const actions = {
    async getTradeInfo({commit}) {
        let res = await reqTradeInfo();
        if (res.code == 200) {
            commit('TRADEINFO', res.data)
        } else {
            return Promise.reject(new Error(res.message))
        }
    },
    //获取用户地址信息
    async getUserAddress({commit}){
        let res = await reqAddressInfo();
        if (res.code == 200) {
            commit('ADDRESSINFO', res.data)
        } else {
            return Promise.reject(new Error(res.message))
        }
    }
};
const mutations = {
    TRADEINFO(state, tradeInfo) {
        state.tradeInfo = tradeInfo;
    },
    ADDRESSINFO(state,addressInfo){
        state.addressInfo = addressInfo
    }
};
const state = {
    tradeInfo: {},
    addressInfo:[]
};
const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}