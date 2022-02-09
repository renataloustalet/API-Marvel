import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index'
import 'bootstrap/dist/css/bootstrap.css'
import './fonts/KOMTITA_.ttf';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/marvel">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);