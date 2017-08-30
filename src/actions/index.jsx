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
