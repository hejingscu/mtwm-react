import React,{Component} from 'react'

class Footbar extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <section className="footer">
        <a className="item" href="#/index">首页</a>
        <a className="item" href="#/order">订单</a>
        <a className="item" href="#/mine">我的</a>
        <a className="item" href="#/login">登录</a>
      </section>
    )
  }
}

export default Footbar
