import 'tslib'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './Components/App'
import store from './Store/store'
import { CryptoStoreType } from './Store/store'

const CryptoStore: CryptoStoreType = new store()

ReactDOM.render(
  <React.StrictMode>
    <App CryptoStore={CryptoStore} />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
