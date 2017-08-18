import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import * as reducer from '../reducers/index'

var store = createStore(
    combineReducers(reducer),
    applyMiddleware(thunk)
);

export default store;
