import React from 'react'
import Footbar from './common/footbar'

class Test extends React.Component{
  constructor(props) {
        super(props)
        this.state = {msg: '111', info: '222'}
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
