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
    url:'/list',
    method:'post',
    data:params
})
//获取详情页
export const reqGoodsInfo = (skuId) =>requests({
    url: `/item/${ skuId }`,
    method:'get',
    
})



// const config = {
//     isLoading: true
// }

// export const reqCategoryList = () => getAxiosInstance(config).get('/product/getBaseCategoryList')
