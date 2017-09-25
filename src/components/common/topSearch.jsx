import React,{Component} from 'react'

class TopSearch extends Component {
  constructor(props){
    super(props)
    this.state = {searchItemFixed: false, timer: ''}
  }
  componentDidMount() {
    if(document.getElementById("category")){
      this.setState({
        fixedTopHeight: 111,  //筛选条件开始置顶的位置
        //监测是否滑动到指定位置
        timer: setInterval( () => {
          if(window.scrollY < this.state.fixedTopHeight){
            this.setState({searchItemFixed: false})
          }else{
            this.setState({searchItemFixed: true})
          }
        },20)
      })
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.timer)
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
          <div className="item search w100 text-center" style={{background: '#fff', position: 'fixed'}}>
            <div className="item-search item-search-full">
              <a href="javascript:;" className="c-999">麻辣香锅</a>
            </div>
          </div> :
          <div className="item search">
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
