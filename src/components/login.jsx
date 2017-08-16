import React from 'react'
import * as api from 'src/api/api'
import { hashHistory } from 'react-router'

class Login extends React.Component{
  constructor(props) {
        super(props)
        this.state = {phone: '18012341234', password: '123456'}
    }
    login(){
      api.login($.param({phone: this.state.phone, password: this.state.password})).then( () => {
        hashHistory.push('/index')
      })
    }
    changeVal(e){
      this.setState({phone: e.target.value})
    }
    changeVal1(e){
      this.setState({password: e.target.value})
    }
    render () {
      let { phone, password } = this.state
      return (
        <div style={{color: '#000'}}>
          手机号<input type="text" onChange={this.changeVal.bind(this)} value={phone}/><br/>
          密码<input type="text" onChange={this.changeVal1.bind(this)} value={password}/><br/>
          <button onClick={this.login.bind(this)}>登录</button>
        </div>
      )
    }
}

export default Login
