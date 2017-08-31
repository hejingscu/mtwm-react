import axios from 'axios'
import { hashHistory } from 'react-router'

const baseUrl = '/mtwm-api/'
    //'http://10.200.4.140:3000/mtwm/'//开发环境
    //'/'//生产环境

/*注册*/
export const register = params => axios.post(baseUrl + 'user/register', params);

/*登录*/
export const login = params => axios.post(baseUrl + 'user/login', params);

/*七牛*/
export const getQiniuToken = params => axios.get('/house/qiniu/test');

/*店铺列表*/
export const getShop = params => axios.get(baseUrl + 'shop', { params: params });

/*获取banner*/
export const getBanner = params => axios.get(baseUrl + 'banner', params);

/*获取主页类目*/
export const getCategory = params => axios.get(baseUrl + 'category', params);

//获取店铺信息
export const getShopGoods = params => axios.get(baseUrl + 'shop/manage/' + params.id);

//下单
export const newOrder = params => axios.post(baseUrl + 'order', params);

//获取我的订单
export const getOrder = () => axios.get(baseUrl + 'order');

//获取用户基本信息
export const getUserProfile = () => axios.get(baseUrl + 'user/profile');

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
                alert("404")
                break;
            case 502:
                alert("401")
                break;
            case 504:
                alert("401")
                break;
            default:
                alert("401")
        }
    }
    return error;
})