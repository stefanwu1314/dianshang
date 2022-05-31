//进行api统一管理
import requests from "./request";
import mockRequests from './mockAjax'
//3级联动接口
//   '/api/product/getBaseCategoryList' get 无参
// 发送请求 返回promise对象
export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
})
//获取banner，home首页轮播图
export const reqCetBannerList = () => mockRequests({
    url: '/banner',
    method: 'get'
})
//获取floor
export const reqCetFloorList = () => mockRequests({
    url: '/floor',
    method: 'get',
})
//获取search数据地址：/api/list 请求方式：post 有参可有可无
export const reqSearchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data: params
})
//获取详情页
export const reqGoodsInfo = (skuId) => requests({
    url: `/item/${ skuId }`,
    method: 'get',

})
//添加到购物车,获取更新产品数量
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})
//获取购物车列表
export const reqCartList = () => requests({
    url: '/cart/cartList',
    method: 'get'
})
//删除购物车某一项
//url:'/api/cart/deleteCart/{skuId}' method:delete
export const reqDeleteCartItem = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

//修改商品选中状态
//接口地址:'/api/cart/checkCart/{skuId}/{isChecked}' method:'get'
export const reqCheckCart = (skuId,isChecked) =>requests({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})

//获取验证码
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

//注册
export const reqUserRegister = (data) => requests({
    url: '/user/passport/register',
    data,
    method: 'post'
})

//login
export const reqUserLogin = (data)=>requests({
    url: '/user/passport/login',
    data,
    method:'post'
})

//携带用户token向服务器获取用户的信息
export const reqGetUserInfo = () => requests({
    url:'/user/passport/auth/getUserInfo',
    method: 'get'
})

//退出登录
export const reqUserLogout =()=>requests({
    url:'/user/passport/logout',
    method: 'get'
})

// /api/user/userAddress/auth/findUserAddressList
// 获取用户地址信息 get
export const reqAddressInfo =()=>requests({
    url:'/user/userAddress/auth/findUserAddressList',
    method: 'get'
})

//获取订单交易页信息
export const reqTradeInfo =()=>requests({
    url:'/order/auth/trade',
    method: 'get'
})

//提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data)=> requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method:'post'
})
//获取支付信息
///api/payment/weixin/createNative/{orderId} get
export const reqPayInfo = (orderId)=> requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
})
// 查询支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus = (orderId)=> requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
})

// const config = {
//     isLoading: true
// }

// export const reqCategoryList = () => getAxiosInstance(config).get('/product/getBaseCategoryList')