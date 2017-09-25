import * as api from '../api/api'

//获取首页数据
export const getPageIndexData = (shopParam, flg) => {
  return async (dispatch, getState) => {
    if(getState().pageIndexData.shopList.length < 1){
      let banner = await api.getBanner()
      let category = await api.getCategory()
      let shop = await api.getShop(shopParam)
      dispatch({type: "getPageIndexData", data: {shopList: shop.data.infos, bannerList: banner.data, categoryList: category.data}});
      if(shopParam.pageIndex === shop.data.totalPage){
        dispatch({type: "saveIsNoMore", data: {pageIndex: true}});
      }
    }
    if(flg == 'reloadShop'){
      let shop = await api.getShop(shopParam)
      dispatch({type: "getPageIndexData", data: {shopList: shop.data.infos}});
      if(shopParam.pageIndex === shop.data.totalPage){
        dispatch({type: "saveIsNoMore", data: {pageIndex: true}});
      }
    }
  }
}

export const updateIndexShopList = (data) => {
  return (dispatch, getState) => {
    dispatch({type: "getPageIndexData", data: {shopList: getState().pageIndexData.shopList.concat(data.infos)}});
  }
}

//获取店铺列表数据
export const getTypeShopListData = (shopParam, flg) => {
  return async (dispatch, getState) => {
    if(getState().typeShopListData.shopList.length < 1 || flg == 'reloadShop'){
      let shop = await api.getShop(shopParam)
      dispatch({type: "getTypeShopListData", data: {shopList: shop.data.infos}});
      console.log(shopParam)
      if(shopParam.pageIndex === shop.data.totalPage){

        dispatch({type: "saveIsNoMore", data: {pageTypeShop: true}});
      }
    }
  }
}

export const updateTypeShopList = (data) => {
  return (dispatch, getState) => {
    dispatch({type: "getTypeShopListData", data: {shopList: getState().typeShopListData.shopList.concat(data.infos)}});
  }
}

//保存首页一些位置数据
export const setPageIndexOptionPos = (obj) => {
  return async (dispatch, getState) => {
    dispatch({type: "setPageIndexOptionPos", data: obj});
  }
}

//用户基本信息
export const setUserProfile = (data) => {
  return async (dispatch, getState) => {
    dispatch({type: "setUserProfile", data: data});
  }
}


//保存某个页面是否到达了底部
export const saveIsNoMore = (type, flg) => {
  let obj = {}
  obj[type] = flg
  return async (dispatch, getState) => {
    dispatch({type: "saveIsNoMore", data: obj});
  }
}

//页面列表是否在加载中
export const saveNextPageLoading = (flg) => {
  return (dispatch) => {
    //console.log(flg)
    dispatch({type: "saveNextPageLoading", saveNextPageLoading: flg});
  }
}
