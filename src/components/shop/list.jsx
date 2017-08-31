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
        this.state = {noMore: false,searchOptionTop: false, pageParams: {pageIndex: 1, pageSize: 10}}
  }
  refreshSearchPosition = (flg) => {
    this.setState({searchOptionTop: flg})
  }
  //获取店铺列表
  getShop = (option) => {
    api.getShop(this.state.pageParams).then( (res) => {
      //this.setState({shopList: res.data})
      this.props.actions.updateTypeShopList(res.data)
      //this.props.actions.getTypeShopListData(this.state.pageParams)
      if(res.data.length < this.state.pageParams.pageSize){
        this.setState({noMore: true})
      }
    })
  }
  componentWillMount(){

  }
  async componentDidMount(){
    let { pageParams } = this.state
    let that = this
    this.refreshSearchPosition(this.props.pageIndexOptionPos.fixedTop)//筛选条件判断是否置顶

    this.props.actions.getTypeShopListData(this.state.pageParams)
    $(window).scrollTop(this.props.routes[this.props.routes.length-1].scrollY)//滚动到上次浏览位置
    //是否滚动到底部
    $(window).bind('scroll', function () {
      let totalH = document.body.clientHeight, screenH = window.screen.height, currentH = window.scrollY
      if(totalH - screenH - currentH < 1 && !that.state.noMore){
        pageParams.pageIndex += 1
        that.setState({pageParams: pageParams})
        that.getShop()
      }
		});
  }
  componentWillUnmount(){
    $(window).unbind("scroll")
  }
  componentDidUpdate() {

  }
  render () {
    let { shopList } = this.props.typeShopListData
    let { noMore } = this.state
    return (
      <div style={{fontSize: '0.26rem'}}>
        <div id="blockShopTitle" className="text-center" style={{height: '.7rem', lineHeight: '.7rem'}}>类型标题</div>
        <div id="topDiv"></div>
        <SearchOption ref="searchOption" getShop={this.getShop} refreshSearchPosition={this.refreshSearchPosition} posId={"topDiv"}></SearchOption>
        <ShopList shopList={shopList}></ShopList>
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
