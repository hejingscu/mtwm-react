import React,{Component} from 'react'
import { hashHistory } from 'react-router'

export class Tab extends Component {
  constructor(props){
    super(props)
  }
  click(i){
    this.props.changeTab && this.props.changeTab(i)
  }
  render() {
    let { text, tabIndex } = this.props
    return (
      <div className="hj-tab">
        {
          text.map((item, index) => {
            let className = 'item ' + (tabIndex === index ? 'active' : '')
            return(
              <div key={index} className={className} onClick={this.click.bind(this, index)}>{item}</div>
            )
          })
        }
      </div>
    )
  }
}

export class TopReturnBtn extends Component {
  constructor(props){
    super(props)
  }
  action(){
    history.go(-1)
  }
  render() {
    let { width } = this.props
    return (
      <div className="top-return-btn" style={{width: width}} onClick={()=>{this.action()}}>
        <img src={require('src/img/returned.png')} alt=""/>
      </div>
    )
  }
}

export class SearchInput extends Component {
  constructor(props){
    super(props)
  }
  changeVal(e){
    this.props.handleVal && this.props.handleVal(e.target.value)
  }
  render() {
    let { width } = this.props
    return (
      <div className="search-input" style={{width: width}}>
        <div className="search-input-wrap">
          <i className="icon icon-search"></i>
          <input type="text" placeholder="饮品" onChange={(e)=>{this.changeVal(e)}} value={this.props.value}/>
        </div>
      </div>
    )
  }
}
