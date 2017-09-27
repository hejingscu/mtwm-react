import React,{Component} from 'react'
import { hashHistory } from 'react-router'
import * as actions from 'src/actions/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class TopSearch extends Component {
  constructor(props){
    super(props)
    this.state = {fixedTop: false, fixedTopHeight: ''}
  }
  toSearch(){
    hashHistory.push("/search")
  }
  scroll = () =>{
    //posId 从滚动到id为该变量的元素时开始置顶
    this.setState({fixedTopHeight: document.getElementById("category").offsetTop})
    let prevValue = this.state.fixedTop
    if(window.scrollY < this.state.fixedTopHeight){
      this.setState({fixedTop: false})
    }else{
      this.setState({fixedTop: true})
    }
    //console.log(window.scrollY, this.state.fixedTopHeight)
    //经过指定位置时传递事件
    if(prevValue !== this.state.fixedTop){
      this.props.actions.setPageIndexOptionPos({topFixedTop: this.state.fixedTop})
    }
  }
  componentDidMount() {
    let that = this
    $(window).bind('scroll', this.scroll)
  }
  componentWillUnmount() {
    $(window).unbind("scroll")
  }
  render() {
    return (
      <section className="block-search">
        {
          this.state.fixedTop ? '' :
          <div className="item position">
            <div className="item-position">
              上峰电商产业园
            </div>
          </div>
        }
        {
          this.state.fixedTop ?
          <div className="item search w100 text-center" style={{background: '#fff', position: 'fixed'}} onClick={()=>{this.toSearch()}}>
            <div className="item-search item-search-full">
              <a href="javascript:;" className="c-999">麻辣香锅</a>
            </div>
          </div> :
          <div className="item search" onClick={()=>{this.toSearch()}}>
            <div className="item-search">
              <a href="javascript:;" className="c-999">麻辣香锅</a>
            </div>
          </div>
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
}, mapDispatchToProps)(TopSearch);
