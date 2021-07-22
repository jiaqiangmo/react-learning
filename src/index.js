import React from 'react'
import ReactDom from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
ReactDom.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,document.getElementById('root')
)