import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const { cartItems } = useSelector(state => state.cart)
  const location = useLocation()

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-danger fs-4" to="/">
          <i className="bi bi-bag-heart-fill me-2"></i>ShirtShop
        </Link>

        {/* Toggler for mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' && 'active fw-semibold text-primary'}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/products' && 'active fw-semibold text-primary'}`} to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' && 'active fw-semibold text-primary'}`} to="/about">
                About
              </Link>
            </li>
          </ul>

          {/* Cart */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link position-relative ${location.pathname === '/cart' && 'text-primary fw-semibold'}`} to="/cart">
                <i className="bi bi-cart-fill fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems.length}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
