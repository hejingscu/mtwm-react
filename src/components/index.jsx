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



class Index extends React.Component{
  constructor(props) {
        super(props)
        this.state = {shopList: [],bannerList: [], categoryList: [], searchOptionTop: false}
  }
  refreshSearchPosition = (flg) => {
    this.setState({searchOptionTop: flg})
  }
  //获取主页所有数据
  async getData(){
    let shop = await api.getShop()
    let banner = await api.getBanner()
    let category = await api.getCategory()
    this.setState({shopList: shop.data, bannerList: banner.data, categoryList: category.data})
    new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      autoplayDisableOnInteraction : false,
      autoplay: 5000,
      loop: true,
      observer:true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents:true//修改swiper的父元素时，自动初始化swiper
    });
  }
  //单独获取店铺列表
  getShop = (option) => {
    api.getShop().then( (res) => {
      this.setState({shopList: res.data})
    })
  }
  componentWillMount(){

  }
  async componentDidMount(){
    //this.getData()
    //alert(this.props.pageIndexOptionPos.fixedTop)
    this.refreshSearchPosition(this.props.pageIndexOptionPos.fixedTop)//筛选条件判断是否置顶
    let getPageIndexData = await this.props.actions.getPageIndexData()//获取数据
    $(window).scrollTop(this.props.routes[this.props.routes.length-1].scrollY)//滚动到上次浏览位置
    //this.refs['searchOption'].test()

  }
  componentDidUpdate() {

  }
  render () {
    let { shopList, bannerList, categoryList } = this.props.pageIndexData
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
                    <img src={item.img} alt="" height="100%"/>
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
                <div key={key} className="item-category">
                  <div className="item-inner">
                    <img src={item.icon} alt="" height="100%"/>
                    <div>{item.name}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div id="blockShopTitle" className="text-center">附近商家</div>
        <div id="searchOptionPosition" className={this.state.searchOptionTop ? 'blockShopFlgShow' : 'blockShopFlgHide'}></div>
        <SearchOption ref="searchOption" getShop={this.getShop} refreshSearchPosition={this.refreshSearchPosition}></SearchOption>
        <ShopList shopList={shopList}></ShopList>
        <Footbar></Footbar>
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
