import { BrowserRouter, Routes , Route } from "react-router-dom"
import Home from "./components/Home"
import Header from "./components/layouts/Header"
import Product from "./components/products/Product"
import Dashboard from "./components/Dashboard"
import Cart from "./components/cart/Cart"
import About from "./components/about/About"

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/products" element={<Home/>}/>
        <Route path="/product/:slug" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
