export const pageIndexData = (state = {shopList: [], bannerList: [], categoryList: []}, action)=> {
    switch (action.type) {
        case "getPageIndexData":
            return Object.assign({}, state, action.data);
        default :
            return state;
    }
}

export const pageIndexOptionPos = (state = {}, action)=> {
    switch (action.type) {
        case "setPageIndexOptionPos":
            return Object.assign({}, state, action.data);
        default :
            return state;
    }
}


export const curShopGoods = (state = {goods: []}, action)=> {
    switch (action.type) {
        case "getCurShopGoods":
            return Object.assign({}, state, action.data);
        default :
            return state;
    }
}

export const shopCartData = (state = {list: []}, action)=> {
    switch (action.type) {
        case "getShopCartData":
            return Object.assign({}, state, action.data);
        default :
            return state;
    }
}



