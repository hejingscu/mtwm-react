export const pageIndexData = (state = {shopList: [], bannerList: [], categoryList: []}, action)=> {
    switch (action.type) {
        case "getPageIndexData":
            return Object.assign({}, state, action.data);
        default :
            return state;
    }
}

export const typeShopListData = (state = {shopList: []}, action)=> {
    switch (action.type) {
        case "getTypeShopListData":
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

export const userProfile = (state = {}, action)=> {
    switch (action.type) {
        case "setUserProfile":
            return Object.assign({}, state, action.data);
        default :
            return state;
    }
}

