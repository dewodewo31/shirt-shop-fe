import React from 'react'
import ReactDom from 'react-dom/client'
// package
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'
// file
import './index.css'
import App from './App.jsx'

import { ToastContainer } from 'react-toastify'
ReactDom.createRoot(document.getElementById('root')).render(
  <div className='container card shadow-sm my-4'>
    <App />
    <ToastContainer position='top-right'/>
  </div>,
)
