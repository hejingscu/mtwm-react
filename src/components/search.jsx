import React,{Component} from 'react'
import Footbar from './common/footbar'
import * as api from 'src/api/api'
import { TopReturnBtn, SearchInput } from './common/common'
import SearchOption from './common/searchOption'
import ShopList from './common/shopList'

export default class PageSearch extends Component{
  constructor(props) {
        super(props)
        this.state = {
          searched: false,
          list: ["黄焖鸡","麻辣烫","鸡排","沙拉","寿司","小炒肉","粉丝汤","排骨饭"],
          shopList: [],
          searchText: '',
          pageOption:{pageIndex: 1,pageSize: 10}
        }
    }
    //查询店铺
    getShop(item){
      api.getShop($.extend({name: item},this.state.pageOption)).then(res=>{
        this.setState({shopList: res.data.infos})
      })
    }
    //点击搜索小标签
    clickTag(item){
      this.setState({searched: true, searchText: item})
      this.getShop(item)
    }
    handleSearchText(val){
      this.setState({searchText: val})
      if(!val){
        this.setState({searched: false})
      }
    }
    //点击搜索按钮
    search(){
      this.setState({searched: true})
      this.getShop(this.state.searchText)
    }
    componentDidMount(){

    }
    render () {
      let { list,shopList } = this.state
      return (
        <div className="page-search">
          <div className="topper bg-fff">
            <TopReturnBtn width={"12%"}/>
            <SearchInput width={"72%"} value={this.state.searchText || ''} handleVal={(val)=>{this.handleSearchText(val)}}/>
            <div className="search-btn" onClick={()=>{this.search()}}>搜索</div>
          </div>
          <div id="blockShopTitle"></div>
          {
            this.state.searched ?
              <div>
                <SearchOption getShop={this.getShop}/>
                <ShopList shopList={shopList} nextPageLoading={this.props.nextPageLoading}></ShopList>
              </div>
              :<div>
                <SearchTagList list={list} title={"热门搜索"} clickTag={(item)=>{this.clickTag(item)}}/>
                <SearchTagList list={list} title={"历史搜索"} clickTag={(item)=>{this.clickTag(item)}} deleteIcon={true}/>
              </div>
          }
        </div>
      )
    }
}

class SearchTagList extends Component {
  constructor(props){
    super(props)
  }
  clickTag(item){
    this.props.clickTag && this.props.clickTag(item)
  }
  render() {
    return (
      <div className="search-tag-list">
        <div className="title">
          {this.props.title}
          {this.props.deleteIcon ? <span className="fr item-trash"><i className="icon icon-trash"></i></span> : ''}
        </div>
        <div className="tag-list">
          {
            this.props.list.map((item,index)=>{
              return(
                <div className="item" key={index} onClick={()=>{this.clickTag(item)}}>{item}</div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
