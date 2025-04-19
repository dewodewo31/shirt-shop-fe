import React from 'react'
import ReactDom from 'react-dom/client'
// package
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'
import "react-image-gallery/styles/css/image-gallery.css";

// file
import './index.css'
import App from './App.jsx'

import { ToastContainer } from 'react-toastify'
import { persistor, store } from './redux/store/index.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

ReactDom.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>  
      <div className='container card shadow-sm my-4'>
        <ToastContainer position='top-right'/>
        <App />
      </div>,
    </PersistGate>
  </Provider>
)