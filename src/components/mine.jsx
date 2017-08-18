import React from 'react'
import Footbar from './common/footbar'


class Mine extends React.Component{
  constructor(props) {
        super(props)
        this.state = {msg: '111', info: '222'}
    }
    render () {
        return (
            <div style={{color: '#fff'}}>
            <div>999999999999999</div>
            <p>00000000000000000</p>
            <Footbar></Footbar>
          </div>
        )
    }
}

export default Mine
