import {reqGetCode,reqUserRegister,reqUserLogin,reqGetUserInfo} from '@/api'

//用于操作数据
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    USERINFO(state,userInfo){
        state.userInfo = userInfo
    }
}

const actions = {
    //获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit('GETCODE',result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegisters({commit},user){
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    //login
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        if (result.code == 200) {
            //存储token
            localStorage.setItem('TOKEN',result.data.token)
            commit('USERLOGIN',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqGetUserInfo();
        console.log(result);
        if (result.code == 200) {
            
            commit ('USERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}

const state = {
    code: '',
    token: '',
    userInfo: ''
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}