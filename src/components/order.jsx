import React from 'react'
import Footbar from './common/footbar'
import * as api from 'src/api/api'

class Test extends React.Component{
  constructor(props) {
        super(props)
        this.state = {msg: '111', info: '222'}
    }
    componentDidMount(){
      api.getOrder().then(res=>{})
    }
    render () {
        return (
            <div style={{color: '#fff'}}>
            <div>222</div>
            <p>test</p>
            <Footbar></Footbar>
          </div>
        )
    }
}

export default Test
