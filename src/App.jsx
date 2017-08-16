import React from 'react'
// import { Hello, Logo } from 'components'

import router from './common/router'
import store from './common/store'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import './App.scss'

render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('app')
);

