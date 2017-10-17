import React,{Component} from 'react'
import tools from '../../tools'
import * as actions from 'src/actions/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class SearchOption extends Component {
  constructor(props){
    super(props)
    this.state = {
      shopDropdown: false,
      fixedTopHeight: 0,
      timer: '',
      fixedTop: false,
      curIndex: this.props.memory ? this.props.pageIndexOptionPos.curIndex : '',
      zhpxMap: {'zhpx': '综合排序', 'pfzg': '评分最高', 'psfzd': '配送费最低', 'qsjzd': '起送价最低', 'rjzd': '人均最低'},
      zhpxCurrnet: 'zhpx',
      showMask: false
    }
  }
  //区分不同类型选择
  switchTab = (index, option) =>{
    console.log(this.state.fixedTop,this.state.showMask,this.state.shopDropdown)
    switch(index){
      case 1:
        this.setState({shopDropdown: false, showMask: false, curIndex: index})
        this.props.getShop('xlzg');
        break;
      case 2:
        this.setState({shopDropdown: false, showMask: false, curIndex: index})
        this.props.getShop('jlzj');
        break;
      case 0:
        if(option){
          this.setState({curIndex: index, zhpxCurrnet: option})
          this.props.getShop(option);
        }
        //滑动高度超过筛选元素时，点击综合排序但没点击具体排序方式时，不滚动，只是单纯控制下拉菜单的显隐
        if(this.state.fixedTop){
          this.setState({showMask: !this.state.showMask, shopDropdown: !this.state.shopDropdown})
        }
        break
      case -1:
        this.setState({shopDropdown: false,showMask: false})
        break
      default:
        break;
    }
    if(index==1||index==2||option||(index===0&&!this.state.fixedTop)){
      if(this.props.memory){
        this.props.actions.setPageIndexOptionPos({curIndex: index})
      }
      tools.scrollTo("blockShopTitle",()=>{
        //如果点击的是tab0下的子元素，则在滚动到筛选元素位置之后才对下拉选项进行显示
        if(index===0&&!this.state.fixedTop){
          this.setState({showMask: !this.state.showMask, shopDropdown: !this.state.shopDropdown})
        }
      })
    }
  }
  test = () => {
    //posId 从滚动到id为该变量的元素时开始置顶
    this.setState({fixedTopHeight: document.getElementById(this.props.posId).offsetTop})
    let prevValue = this.state.fixedTop
    if(window.scrollY < this.state.fixedTopHeight){
      this.setState({fixedTop: false})
      $("#searchOptionMain").css("top", 0)
    }else{
      this.setState({fixedTop: true})
      if(this.props.cssTop){
        $("#searchOptionMain").css("top",this.props.cssTop)
      }
    }
    //console.log(window.scrollY, this.state.fixedTopHeight)
    //经过指定位置时传递事件
    if(prevValue !== this.state.fixedTop){
      this.props.refreshSearchPosition(this.state.fixedTop)
      this.props.actions.setPageIndexOptionPos({fixedTop: this.state.fixedTop})
    }
  }
  componentDidMount(){
    if(this.props.posId){
      window.addEventListener('scroll', this.test);
    }
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.test);
  }
  render() {
    let { zhpxMap,zhpxCurrnet } = this.state
    return (
      <section style={{position: 'relative'}} id="searchOption">
        {this.state.fixedTop ? <div style={{height: '.9rem'}}></div> : ''}
        <div className={this.state.fixedTop ? "fixedTop" : "notFixedTop"} id="searchOptionMain">
          <div className="block-option">
            <dic className={"item-option " + (this.state.curIndex === 0 ? "active" : "")} onClick={() => {this.switchTab(0)}}>{zhpxMap[zhpxCurrnet]}</dic>
            <dic className={"item-option " + (this.state.curIndex === 1 ? "active" : "")} onClick={() => {this.switchTab(1)}}>销量最高</dic>
            <dic className={"item-option " + (this.state.curIndex === 2 ? "active" : "")} onClick={() => {this.switchTab(2)}}>距离最近</dic>
            <dic className={"item-option " + (this.state.curIndex === 3 ? "active" : "")}className="item-option">筛选</dic>
          </div>
          {
            this.state.shopDropdown && this.state.showMask ?
            <div className="block-zh-rank text-left" style={{borderTop: '1px solid #eee'}}>
              <div className="item-rank" onClick={() => {this.switchTab(0,'zhpx')}}>{zhpxMap['zhpx']}</div>
              <div className="item-rank" onClick={() => {this.switchTab(0,'pfzg')}}>{zhpxMap['pfzg']}</div>
              <div className="item-rank" onClick={() => {this.switchTab(0,'psfzd')}}>{zhpxMap['psfzd']}</div>
              <div className="item-rank" onClick={() => {this.switchTab(0,'qsjzd')}}>{zhpxMap['qsjzd']}</div>
              <div className="item-rank" onClick={() => {this.switchTab(0,'rjzd')}}>{zhpxMap['rjzd']}</div>
            </div> : ''
          }
        </div>
        {
          this.state.shopDropdown && this.state.showMask ?
          <div onTouchStart={(e) => {e.preventDefault();this.switchTab(-1)}} style={{height: '100vh',position: 'fixed',top: '0',bottom: '.8rem',background: '#000',zIndex: '99',opacity: '.8',width: '100%'}}></div>
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
