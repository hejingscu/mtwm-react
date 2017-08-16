import React,{Component} from 'react'
import {Link} from 'react-router'

class ShopList extends Component {
  constructor(props){
    super(props)
  }
  render() {
    let {shopList}=this.props;
    return (
      <section className="block-shop">
        {
          shopList.map((item,key)=>{
            return (
              <Link to={'/order'} key={key} className="item-shop">
                  <div className="item-inner">
                    <div className="img"><img src={item.icon} alt=""/></div>
                    <div className="content">
                      <div className="shop-name">{item.name}</div>
                      <div className="shop-price">起送价￥{item.priceStart}|配送￥{item.psPrice}|人均￥{item.personPrice}</div>
                      <div className="shop-discount">
                        <i className="icon icon-test"></i>
                        {item.discount}
                      </div>
                    </div>
                  </div>
              </Link>
            )
          })
        }
        </section>
    )
  }
}

export default ShopList
