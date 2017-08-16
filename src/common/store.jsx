import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

var store = createStore(
    applyMiddleware(thunk)
);

export default store;
