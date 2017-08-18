import React,{Component} from 'react'
import tools from '../../tools'
import * as actions from 'src/actions/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class SearchOption extends Component {
  constructor(props){
    super(props)
    this.state = {shopDropdown: false, fixedTopHeight: 0,timer: '', fixedTop: '', curIndex: this.props.pageIndexOptionPos.curIndex}
  }
  //区分不同类型选择
  switchTab = (index, option) =>{
    tools.scrollTo("searchOptionPosition")
    switch(index){
      case 1:
        this.setState({shopDropdown: false, curIndex: index})
        this.props.getShop('xlzg');
        break;
      case 2:
        this.setState({shopDropdown: false, curIndex: index})
        this.props.getShop('jlzj');
        break;
      case 0:
        if(option){
          this.setState({curIndex: index})
          this.props.getShop(option);
        }
        this.setState({shopDropdown: !this.state.shopDropdown})
        break
      default:
        break;
    }
    if(index==1||index==2||(index==0&&option)){
      this.props.actions.setPageIndexOptionPos({curIndex: index})
    }
  }
  componentDidMount(){
    //等待接口数据请求到之后才定义事件监听，针对网速过慢的情况
    let isGetShopList = setInterval(()=>{
      if(this.props.pageIndexData.shopList.length > 0){
        clearInterval(isGetShopList)
        let mainFun = (h) => {
          if(document.getElementById("blockShopTitle")){
            this.setState({
              fixedTopHeight: h,  //筛选条件开始置顶的位置
              timer: setInterval( () => {
                let prevValue = this.state.fixedTop
                if(window.scrollY < this.state.fixedTopHeight){
                  this.setState({fixedTop: false})
                }else{
                  this.setState({fixedTop: true})
                }
                //经过指定位置时传递事件
                if(prevValue !== this.state.fixedTop){
                  this.props.refreshSearchPosition(this.state.fixedTop)
                  this.props.actions.setPageIndexOptionPos({num: h, fixedTop: this.state.fixedTop})
                }
              },20)
            })
          }
        }
        if(!this.props.pageIndexOptionPos.num){
          setTimeout(()=>{
            mainFun(document.getElementById("blockShopTitle").offsetTop)
          },200)
        }else{
          mainFun(this.props.pageIndexOptionPos.num)
        }
      }
    },30)
  }
  componentWillUnmount(){
    clearInterval(this.state.timer)
  }
  render() {
    return (
      <section style={{position: 'relative'}} id="searchOption">
        <div className={this.state.fixedTop ? "fixedTop" : "notFixedTop"}>
          <div className="block-option">
            <dic className={"item-option " + (this.state.curIndex === 0 ? "active" : "")} onClick={() => {this.switchTab(0)}}>综合排序</dic>
            <dic className={"item-option " + (this.state.curIndex === 1 ? "active" : "")} onClick={() => {this.switchTab(1)}}>销量最高</dic>
            <dic className={"item-option " + (this.state.curIndex === 2 ? "active" : "")} onClick={() => {this.switchTab(2)}}>距离最近</dic>
            <dic className={"item-option " + (this.state.curIndex === 3 ? "active" : "")}className="item-option">筛选</dic>
          </div>
          {
            this.state.shopDropdown ?
            <div className="block-zh-rank text-left">
              <div className="item-rank" onClick={() => {this.switchTab(0,'pfzg')}}>评分最高</div>
              <div className="item-rank" onClick={() => {this.switchTab(0,'psfzd')}}>配送费最低</div>
              <div className="item-rank" onClick={() => {this.switchTab(0,'qsjzd')}}>起送价最低</div>
              <div className="item-rank" onClick={() => {this.switchTab(0,'rjzd')}}>人均最低</div>
            </div> : ''
          }
        </div>
        {
          this.state.shopDropdown ?
          <div onClick={() => {this.switchTab(0)}} style={{height: '100vh',position: 'absolute',top: '0',background: '#000',zIndex: '99',opacity: '.8',width: '100%'}}></div>
          : ''
        }

      </section>
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
}, mapDispatchToProps)(SearchOption);
