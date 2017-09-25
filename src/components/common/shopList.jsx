import React,{Component} from 'react'
import {Link} from 'react-router'

class ShopList extends Component {
  constructor(props){
    super(props)
  }
  render() {
    let {shopList,nextPageLoading}=this.props;
    return (
      <section className="block-shop" id="shopList">
        {
          shopList.map((item,key)=>{
            return (
              <Link to={'/shop/detail/' + item._id} key={key} className="item-shop">
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
        {nextPageLoading ? <div className="c-999 text-center nextPageLoading"><img src={require('src/img/icon-loading.gif')} style={{height: "70%", width: "auto"}} alt=""/></div> : ''}
      </section>
    )
  }
}

export default ShopList
