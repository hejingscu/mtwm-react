import * as api from '../api/api'

//获取首页数据
export const getPageIndexData = (shopParam) => {
  return async (dispatch, getState) => {
    if(getState().pageIndexData.shopList.length < 1){
      let banner = await api.getBanner()
      let category = await api.getCategory()
      let shop = await api.getShop(shopParam)
      dispatch({type: "getPageIndexData", data: {shopList: shop.data, bannerList: banner.data, categoryList: category.data}});
    }
  }
}

export const updateIndexShopList = (data) => {
  return (dispatch, getState) => {
    dispatch({type: "getPageIndexData", data: {shopList: getState().pageIndexData.shopList.concat(data)}});
  }
}

//获取店铺列表数据
export const getTypeShopListData = (shopParam) => {
  return async (dispatch, getState) => {
    if(getState().typeShopListData.shopList.length < 1){
      let shop = await api.getShop(shopParam)
      dispatch({type: "getTypeShopListData", data: {shopList: shop.data}});
    }
  }
}

export const updateTypeShopList = (data) => {
  return (dispatch, getState) => {
    dispatch({type: "getTypeShopListData", data: {shopList: getState().typeShopListData.shopList.concat(data)}});
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
