import React,{Component} from 'react'
import { Router, Route,IndexRoute,Redirect, hashHistory,browserHistory,IndexRedirect} from 'react-router'
import Main from '../components/main'
import Index from '../components/index'
import Order from '../components/order'
import Mine from '../components/mine'
import PageSearch from '../components/search'
import Login from '../components/login'
import PageShopList from '../components/shop/list'
import ShopDetail from '../components/shop/detail'


const routeLeave = (state) => {
    if(state.routes[state.routes.length-1].keep){
      state.routes[state.routes.length-1].scrollY = document.body.scrollTop
    }
}

const RouterConfig=(
    <Router history={hashHistory}>
        <Route path='/' component={Main}>
            <IndexRedirect to="/index"/>
            <Route path='/index' component={Index} onLeave={routeLeave} keep={true}></Route>
            <Route path='/order' component={Order}></Route>
            <Route path='/mine' component={Mine}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/search' component={PageSearch}></Route>
            <Route path='/shop/list' component={PageShopList}></Route>
            <Route path='/shop/detail/:id' component={ShopDetail}></Route>
        </Route>
    </Router>
);

export default RouterConfig;
