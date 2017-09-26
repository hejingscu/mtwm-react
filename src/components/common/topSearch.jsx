import React,{Component} from 'react'
import { hashHistory } from 'react-router'

class TopSearch extends Component {
  constructor(props){
    super(props)
    this.state = {searchItemFixed: false, timer: ''}
  }
  toSearch(){
    hashHistory.push("/search")
  }
  componentDidMount() {
    let that = this
    if(document.getElementById("category")){
      let height = document.getElementById("category").offsetHeight
      setTimeout(()=>{
        $(window).bind('scroll', function () {
          if(window.scrollY < height){
            that.setState({searchItemFixed: false})
          }else{
            that.setState({searchItemFixed: true})
          }
        });
      },2)
      // this.setState({
      //   fixedTopHeight: document.getElementById("category").offsetHeight,  //筛选条件开始置顶的位置
      //   //监测是否滑动到指定位置
      //   timer: setInterval( () => {
      //     if(window.scrollY < this.state.fixedTopHeight){
      //       this.setState({searchItemFixed: false})
      //     }else{
      //       this.setState({searchItemFixed: true})
      //     }
      //   },20)
      // })
    }
  }
  componentWillUnmount() {
    $(window).unbind("scroll")
  }
  render() {
    return (
      <section className="block-search">
        {
          this.state.searchItemFixed ? '' :
          <div className="item position">
            <div className="item-position">
              上峰电商产业园
            </div>
          </div>
        }
        {
          this.state.searchItemFixed ?
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

export default TopSearch
