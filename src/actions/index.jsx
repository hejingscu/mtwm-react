import * as api from '../api/api'

//获取首页数据
export const getPageIndexData = () => {
  return async (dispatch, getState) => {
    if(getState().pageIndexData.shopList.length < 1){
      let banner = await api.getBanner()
      let category = await api.getCategory()
      let shop = await api.getShop()
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

//获取商家所有商品以及店铺内购物车商品，两者数据不重合，同步dispatch即可
export const getCurShopGoods = (params) => {
    return (dispatch, getState)=> {
      dispatch({type: "getCurShopGoods", data: {}});
      //第一次存入localstorage
      if(!window.localStorage.getItem('shopCart')){window.localStorage.setItem('shopCart', '{}')}
      //从localStorage拉取当前店铺的购物车数据
      let shopCartData = JSON.parse(window.localStorage.getItem('shopCart'))[params.id] || [], totalAmount = 0
      shopCartData && shopCartData.forEach(item=>{
        totalAmount += ( item.price * item.count )
      })
      //获取店铺的最新商品数据
      api.getShopGoods(params).then( res=> {
        res.data.goods.forEach(item=>{
          item.count = 0
        })
        res.data.goods = res.data.goods.concat(shopCartData).uniqueGoods()
        dispatch({type: "getCurShopGoods", data: res.data});
      })
      dispatch({type: "getShopCartData", data: {list: shopCartData, totalAmount: totalAmount}});
    }
}

//加减商品,包括购物车内的加减
export const changeGoodsNum = (goodsObj,type,shopId) => {
    return (dispatch, getState)=> {
      let totalBuyCart = JSON.parse(window.localStorage.getItem('shopCart'))//所有店铺的购物车数据
      let shopCartData = { list: totalBuyCart[shopId] || [], totalAmount : 0}//当前店铺的购物车初始化数据
      getState().curShopGoods.goods.forEach(item=>{
        if(item.id == goodsObj.id){
          let cartObj,cartObjIndex //购物车中正在操作的商品的对象
          //在购物车中获取增减商品的索引
          shopCartData.list.forEach((obj,index)=>{
            if(obj.id == goodsObj.id){
              cartObj = obj
              cartObjIndex = index
            }
          })
          //添加操作
          if(type == 'add'){
            if(item.count>0){
              item.count += 1
              cartObj.count += 1//已经点过的商品，执行数量增加即可
            }else{
              item.count = 1
              shopCartData.list.push(item)//新添加的商品，将其添加到购物车中
            }
          }
          //减操作
          else{
            item.count -= 1
            cartObj.count -= 1
            //当数量为0时从购物车中删除
            if(cartObj.count===0){shopCartData.list.splice(cartObjIndex, 1)}
          }
        }
        //计算总价
        shopCartData.totalAmount += ( item.count * item.price)
      })
      //将变化的数据存入localStorage
      totalBuyCart[shopId] = shopCartData.list
      window.localStorage.setItem('shopCart', JSON.stringify(totalBuyCart))
      dispatch({type: "getCurShopGoods", data: getState().curShopGoods})
      dispatch({type: "getShopCartData", data: shopCartData});
    }
}
