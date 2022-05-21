import { reqCartList , reqDeleteCartItem,reqCheckCart} from "@/api";

const actions = {
    //获取购物车列表数据
    async getCartInfo({commit}){
        let result = await reqCartList();
        if (result.code == 200) {
            commit('GETCARTINFO',result.data);
        }else{
            alert('faile');
        }
    },
    //删除购物车某一项
    async reqDeleteCartItem({commit},skuId){
        let result = await reqDeleteCartItem(skuId);
        if (result.code == 200) {
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //修改选中状态
    async CheckCart({commit},{skuId,isChecked}){
        let result = await reqCheckCart(skuId,isChecked);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
};
const mutations = {
    GETCARTINFO(state,cartlist){
        state.cartlist = cartlist
    }
};
const state = {
    cartlist:[]
};
const getters = {
    cartlist(state){
        return state.cartlist[0] || {}
    }
    // cartInfoList()
};

export default {
    actions,
    mutations,
    state,
    getters
};
