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
      let height = document.getElementById("category").offsetTop
      setTimeout(()=>{
        $(window).bind('scroll', function () {
          if(window.scrollY < height){
            that.setState({searchItemFixed: false})
          }else{
            that.setState({searchItemFixed: true})
          }
        });
      },2)
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
