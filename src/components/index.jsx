import React from 'react'
import * as api from '../api/api'
import ShopList from './common/shopList'
import Footbar from './common/footbar'
import TopSearch from './common/topSearch'
import SearchOption from './common/searchOption'
import Slide from './common/Slide'
import axios from 'axios'
import Swiper from 'swiper'
import * as actions from 'src/actions/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { hashHistory } from 'react-router'



class Index extends React.Component{
  constructor(props) {
        super(props)
        this.state = {searchOptionTop: false,topSearchTop: false, pageParams: {pageIndex: 1, pageSize: 10}, refreshFlg: false}
  }
  refreshSearchPosition(flg){
    this.setState({searchOptionTop: flg})
  }
  refreshTopPosition(flg){
    this.setState({topSearchTop: flg})
  }
  //单独获取店铺列表（例如选择排序方式时，重新拉取店铺数据）
  getShop = (option) => {
    let { pageParams } = this.state
    pageParams.pageIndex = 1
    this.setState({pageParams: pageParams})
    this.props.actions.saveIsNoMore('pageIndex', false)//重置变量
    this.props.actions.getPageIndexData(this.state.pageParams, 'reloadShop')//获取数据
  }
  //下滑加载更多店铺
  getMoreShop(option){
    let { pageParams } = this.state
    //加载中图标
    this.setState({refreshFlg: false})
    this.props.actions.saveNextPageLoading(true)
    api.getShop(this.state.pageParams).then( (res) => {
      //加载中结束，图标消失
      setTimeout(()=>{
        this.props.actions.saveNextPageLoading(false)//加载中结束，图标消失
        this.props.actions.updateIndexShopList(res.data, option)//将拿到的数据塞入到数组列表中
        if(pageParams.pageIndex == res.data.totalPage){
          this.props.actions.saveIsNoMore('pageIndex', true)
        }
      },500)
    }).catch(()=>{
      this.props.actions.saveNextPageLoading(false)//加载中结束，图标消失
      this.setState({refreshFlg: true})
      this.props.actions.saveIsNoMore('pageIndex', true)//不允许再往下滑了
    })
  }
  //重新加载下一页
  refreshMorePage(){
    this.props.actions.saveIsNoMore('pageIndex', false)
    this.getMoreShop()
  }
  toTypeShopList = (item) => {
    hashHistory.push({pathname: '/shop/list', state: {categoryId: item._id}})
  }
  componentWillMount(){

  }
  async componentDidMount(){
    //this.getData()
    //alert(this.props.pageIndexOptionPos.fixedTop)
    let { pageParams } = this.state,
        that = this

    this.refreshSearchPosition(this.props.pageIndexOptionPos.fixedTop)//筛选条件判断是否置顶
    this.refreshTopPosition(this.props.pageIndexOptionPos.topFixedTop)//顶部搜索框判断是否置顶
    let getPageIndexData = await this.props.actions.getPageIndexData(this.state.pageParams)//获取数据

    $(window).scrollTop(this.props.routes[this.props.routes.length-1].scrollY)//滚动到上次浏览位置
    //this.refs['searchOption'].test()
    //构建轮播实例
    new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      autoplayDisableOnInteraction : false,
      autoplay: 5000,
      loop: true,
      observer:true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents:true//修改swiper的父元素时，自动初始化swiper
    });
    //是否滚动到底部
    setTimeout(()=>{
      $(window).bind('scroll', function () {
        let totalH = document.body.clientHeight, screenH = window.screen.height, currentH = window.scrollY
        //console.log($(window).scrollTop(),$(window).height(),$("#shopList").height(),document.getElementById("shopList").offsetTop)
        if(($(window).scrollTop() + $(window).height() + 10 > $("#shopList").height() + document.getElementById("shopList").offsetTop) && !that.props.noMoreFlgData.pageIndex && !that.props.nextPageLoading){
          pageParams.pageIndex += 1
          that.setState({pageParams: pageParams})
          that.getMoreShop()
        }
      });
    },2)
  }
  componentWillUnmount(){
    $(window).unbind("scroll")
  }
  componentDidUpdate() {

  }
  render () {

    let { shopList, bannerList, categoryList } = this.props.pageIndexData
    let  noMore  = this.props.noMoreFlgData.pageIndex
    let { refreshFlg } = this.state
    return (
      <div style={{fontSize: '0.26rem'}} className="pageIndex">
        <TopSearch></TopSearch>
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {/* <div className="swiper-slide">1</div>
            <div className="swiper-slide">2</div>
            <div className="swiper-slide">3</div> */}
            {
              bannerList.map((item,key) => {
                return (
                  <div key={key} className="swiper-slide">
                    <img src={item.img + "?imageView2/2/w/640"} alt="" height="100%"/>
                  </div>
                )
              })
            }
          </div>
          <div className="swiper-pagination"></div>
        </div>
        <div className="category" id="category">
          {
            categoryList.map((item,key) => {
              return (
                <div key={key} className="item-category" onClick={() => {this.toTypeShopList(item)}}>
                  <div className="item-inner">
                    <img src={item.icon + "?imageView2/2/w/200"} alt="" height="100%"/>
                    <div>{item.name}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div id="blockShopTitle" className="text-center">附近商家</div>
        {/* <div id="searchOptionPosition" className={this.state.searchOptionTop ? 'blockShopFlgShow' : 'blockShopFlgHide'}></div> */}
        <SearchOption ref="searchOption" memory={true} getShop={this.getShop} refreshSearchPosition={()=>{this.refreshSearchPosition}} posId={"blockShopTitle"} cssTop={'.9rem'}></SearchOption>
        <ShopList shopList={shopList} nextPageLoading={this.props.nextPageLoading}></ShopList>
        <Footbar/>
        {noMore && !refreshFlg ? <div className="no-more">没有更多了</div> : ''}
        {refreshFlg ? <div className="no-more"><span onClick={()=>{this.refreshMorePage()}}>点击重新加载</span></div> : ''}
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
}, mapDispatchToProps)(Index);
