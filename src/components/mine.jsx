import React from 'react'
import Footbar from './common/footbar'
import * as api from 'src/api/api'
import * as actions from 'src/actions/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class Mine extends React.Component{
  constructor(props) {
        super(props)
        this.state = {msg: '111', info: '222'}
    }
    componentDidMount(){
      api.getUserProfile().then(res=>{this.props.actions.setUserProfile(res.data)})
    }
    render () {
      let { userProfile } = this.props
      return (
        <div className="text-center">
          <div>我的手机号码：{userProfile.phone}</div>
          <p>我的注册时间：{userProfile.registerTime}</p>
          <Footbar></Footbar>
        </div>
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
}, mapDispatchToProps)(Mine);
