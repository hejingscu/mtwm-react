import React from 'react'
import { Tab } from 'src/components/common/common'
import * as api from 'src/api/api'
import * as actions from 'src/actions/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { hashHistory } from 'react-router'


class ShopDetail extends React.Component{
  constructor(props) {
        super(props)
        this.state = {tabIndex: 0, showCart: false, curShopGoods: {discount: '', goods: []}, shopCartData: {list:[]}}
    }
    changeTab(i){
      this.setState({tabIndex: i})
    }
    componentDidMount(){
      this.getData()
      //this.props.actions.getCurShopGoods({id: this.props.params.id})
    }
    //获取商品数据和购物车数据
    getData(){
      //第一次存入localstorage
      if(!window.localStorage.getItem('shopCart')){window.localStorage.setItem('shopCart', '{}')}
      //从localStorage拉取当前店铺的购物车数据
      let shopCartData = JSON.parse(window.localStorage.getItem('shopCart'))[this.props.params.id] || [], totalAmount = 0
      shopCartData && shopCartData.forEach(item=>{
        totalAmount += ( item.price * item.count )
      })
      //获取店铺的最新商品数据
      api.getShopGoods({id: this.props.params.id}).then( res=> {
        res.data.goods.forEach(item=>{
          item.count = 0
        })
        res.data.goods = res.data.goods.concat(shopCartData).uniqueGoods()
        this.setState({curShopGoods: res.data});
      })
      this.setState({shopCartData: {list: shopCartData, totalAmount: totalAmount}});
    }
    //加减商品
    changeGoodsNum(item,type){
      //this.props.actions.changeGoodsNum(item,type,this.props.params.id)
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
    //显示隐藏购物车
    showCart(){
      if(this.props.shopCartData.list.length > 0){
        this.setState({showCart: !this.state.showCart})
      }
    }
    render () {
      let { tabIndex,curShopGoods,shopCartData } = this.state
      //let { curShopGoods,shopCartData } = this.props
        return (
          <div className="page-shop-detail">
            <div className="shop-info">
              <div className="shop-icon"> </div>
              <div className="text-info">
                <p>SUPERMAN炒饭</p><span onClick={()=>{hashHistory.goBack()}}>会返回</span>
                <p>{curShopGoods.discount}</p>
              </div>
            </div>
              <Tab text={['点菜','评价','商家']} tabIndex={tabIndex} changeTab={this.changeTab.bind(this)}></Tab>
              {
                tabIndex === 0 ?
                <div className="page-tab">
                  <div className="scroll-tab text-center">
                    <div className="item-tab active">
                      所有商品
                    </div>
                  </div>
                  <div className="goods-container"  style={{padding: '.3rem 0 1.3rem .2rem'}}>
                    {
                      curShopGoods.goods.map((item, index) => {
                        return(
                          <div className="item-goods" key={index}>
                            <div className="fl w30 text-center"><img className="img-goods" src={item.icon} alt=""/></div>
                            <div className="fr w70">
                              <div className="goods-info">
                                <span>{item.name}</span><br/>
                              </div>
                              <div className="item-price"><span>{item.price}</span></div>
                              <div className="item-num" style={{fontSsize: '.4rem'}}>
                                {item.count > 0 ? <span onClick={this.changeGoodsNum.bind(this,item,'decrease')}>-</span> : ''}
                                {item.count > 0 ? <span style={{margin: '0 0.3rem'}}>{item.count}</span> : ''}
                                <span onClick={this.changeGoodsNum.bind(this,item,'add')}>+</span>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="cart">
                    {
                      this.state.showCart ?
                      <div className="cart-main">
                        {
                          shopCartData.list.map((item,index) => {
                            return(
                              <div className="cart-item-goods" key={index}>
                                {item.name}
                                <span className="fr">{item.count}</span>
                              </div>
                            )
                          })
                        }
                      </div> : ''
                    }
                    <div onClick={this.showCart.bind(this)} className={shopCartData.list.length <= 0 ? 'item-icon empty' : 'item-icon notEmpty'}>
                      <span className={shopCartData.list.length <= 0 ? 'item-icon-empty' : 'item-icon-notEmpty'}></span>
                    </div>
                    <div className="cart-base">
                      <div className="total-price">
                        ￥{shopCartData.totalAmount}
                      </div>
                      <div className={shopCartData.list.length <= 0 ? 'to-pay to-pay-empty' : 'to-pay to-pay-notEmpty'}>
                        去结算
                      </div>
                    </div>
                  </div>
                </div> : ''
              }
              {
                tabIndex === 1 ?
                <div>评价页</div> : ''
              }
              {
                tabIndex === 2 ?
                <div>商家页</div> : ''
              }
          </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}
export default connect((state)=> {
    return state
}, mapDispatchToProps)(ShopDetail);
