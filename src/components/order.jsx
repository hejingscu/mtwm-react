import React from 'react'
import Footbar from './common/footbar'
import * as api from 'src/api/api'

class Test extends React.Component{
  constructor(props) {
        super(props)
        this.state = {orderData: []}
    }
    componentDidMount(){
      api.getOrder().then(res=>{
        this.setState({orderData: res.data})
      })
    }
    render () {
      let { orderData } = this.state
      return (
        <div className="page-order">
          {
            orderData.map((item,index)=>{
              return(
                <div key={index} className="item-order">
                  <label htmlFor="">订单号</label>{item._id}
                  <div>
                    <p>订单内容</p>
                    {
                      item.list.map((cItem, cIndex)=>{
                        return(
                          <div key={cIndex}>
                            {cItem.name}----{cItem.price}----{cItem.count}
                          </div>
                        )
                      })
                    }
                    总价：{item.totalAmount}
                  </div>
                </div>
              )
            })
          }
          <Footbar></Footbar>
        </div>
      )
    }
}

export default Test
