import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div className="container">
      <Link className="navbar-brand fw-bold fs-4" to="/">
        <i className="bi bi-shop me-2"></i>ShirtShop
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
          <li className="nav-item">
            <Link className="nav-link active" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">Produk</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">Tentang Kami</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Kontak</Link>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Akun
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><Link className="dropdown-item" to="/login">Login</Link></li>
              <li><Link className="dropdown-item" to="/register">Register</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}
