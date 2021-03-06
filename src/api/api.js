import axios from 'axios'
import { hashHistory } from 'react-router'
import { Toast } from 'antd-mobile'

const baseUrl = '/mtwm-api/'
    //'http://10.200.4.140:3000/mtwm/'//开发环境
    //'/'//生产环境

/*注册*/
export const register = params => axios.post(`${baseUrl}user/register`, params);

/*登录*/
export const login = params => axios.post(`${baseUrl}user/login`, params);

/*店铺列表*/
export const getShop = params => axios.get(`${baseUrl}shop`, { params: params });

/*获取banner*/
export const getBanner = params => axios.get(`${baseUrl}banner`, params);

/*获取主页类目*/
export const getCategory = params => axios.get(`${baseUrl}category`, params);

//获取店铺信息
export const getShopInfo = params => axios.get(`${baseUrl}shop/manage/` + params.id);

//获取用户购物车信息
export const getShopcartData = () => axios.get(`${baseUrl}shop/cart`);

//更新用户购物车信息
export const updateShopcart = params => axios.put(`${baseUrl}shop/cart/update`, params);

//下单
export const newOrder = params => axios.post(`${baseUrl}order`, params);

//获取我的订单
export const getOrder = () => axios.get(`${baseUrl}order`);

//获取用户基本信息
export const getUserProfile = () => axios.get(`${baseUrl}user/profile`);

//添加一个请求拦截器
axios.interceptors.request.use(function(config) {
    //在请求发出之前进行一些操作
    return config;
}, function(error) {
    //Do something with request error
    return Promise.reject(error);
});
//添加一个响应拦截器
axios.interceptors.response.use(function(res) {
    //在这里对返回的数据进行处理
    return res;
}, function(error) {
    //Do something with response error
    if (error.response) {
        switch (error.response.status) {
            case 401: //401
                hashHistory.push('/login')
                break;
            case 404:
                Toast.info(error.response.status)
                break;
            case 502:
                Toast.info(error.response.status)
                break;
            case 504:
                console.log(error.response.status)
                break;
            default:
                Toast.info(error.response.status)
        }
    }
    return Promise.reject(error);
})