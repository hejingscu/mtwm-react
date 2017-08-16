import React from 'react'
import Footbar from './common/footbar'

const Main=React.createClass({
    render: function () {
        return (
            <div>
                {this.props.children}
                <Footbar></Footbar>
            </div>
        )
    }
})

export default Main;
