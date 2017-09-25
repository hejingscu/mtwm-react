import React from 'react'
import * as api from 'src/api/api'
import ShopList from 'components/common/shopList'
import SearchOption from 'components/common/searchOption'
import axios from 'axios'
import * as actions from 'src/actions/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'



class PageShopList extends React.Component{
  constructor(props) {
        super(props)
        this.state = {searchOptionTop: false, pageParams: {pageIndex: 1, pageSize: 10, categoryId: this.props.location.state.categoryId}, }
  }
  refreshSearchPosition = (flg) => {
    this.setState({searchOptionTop: flg})
  }
  //单独获取店铺列表
  getShop = (option) => {
    let { pageParams } = this.state
    pageParams.pageIndex = 1
    this.setState({pageParams: pageParams})
    this.props.actions.getTypeShopListData(this.state.pageParams, 'reloadShop')//获取数据
    this.props.actions.saveIsNoMore('pageTypeShop', false)
  }
  //加载更多
  getMoreShop = () => {
    let { pageParams } = this.state
    //加载中图标
    this.props.actions.saveNextPageLoading(true)
    api.getShop(pageParams).then( (res) => {
      //this.setState({shopList: res.data})
      //加载中结束，图标消失
      setTimeout(()=>{
        this.props.actions.saveNextPageLoading(false)
        this.props.actions.updateTypeShopList(res.data)
        //this.props.actions.getTypeShopListData(this.state.pageParams)
        if(pageParams.pageIndex == res.data.totalPage){
          this.props.actions.saveIsNoMore('pageTypeShop', true)
        }
      },500)
    })
  }
  componentWillMount(){

  }
  async componentDidMount(){
    let { pageParams } = this.state
    let that = this
    this.refreshSearchPosition(this.props.pageIndexOptionPos.fixedTop)//筛选条件判断是否置顶
    this.getShop()
    $(window).scrollTop(0)
    //是否滚动到底部
    setTimeout(()=>{
      $(window).bind('scroll', function () {
        console.log(that.props.nextPageLoading)
        //let totalH = document.body.clientHeight, screenH = window.screen.height, currentH = window.scrollY
        //console.log($(window).scrollTop(),$(window).height(),$("#shopList").height(),document.getElementById("shopList").offsetTop)
        if(($(window).scrollTop() + $(window).height() + 10 > $("#shopList").height() + document.getElementById("shopList").offsetTop) && !that.props.noMoreFlgData.pageTypeShop && !that.props.nextPageLoading){
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
    let { shopList } = this.props.typeShopListData
    let noMore  = this.props.noMoreFlgData.pageTypeShop
    return (
      <div style={{fontSize: '0.26rem'}}>
        <div id="blockShopTitle" className="text-center" style={{height: '.7rem', lineHeight: '.7rem'}}>类型标题</div>
        <div id="topDiv"></div>
        <SearchOption ref="searchOption" getShop={this.getShop} refreshSearchPosition={this.refreshSearchPosition} posId={"topDiv"}></SearchOption>
        <ShopList shopList={shopList} nextPageLoading={this.props.nextPageLoading}></ShopList>
        {noMore ? <div className="no-more">没有更多了</div> : ''}
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
}, mapDispatchToProps)(PageShopList);
