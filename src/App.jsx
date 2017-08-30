import React from 'react'
// import { Hello, Logo } from 'components'

import router from './common/router'
import store from './common/store'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import './App.scss'
import createTapEventPlugin from 'react-tap-event-plugin';
createTapEventPlugin(); //添加touchTap事件

render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('app')
);

