import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setLoggedInOut, setToken } from '../../redux/slices/userSlice';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [] } = useSelector(state => state.cart || {});
  const { isLoggedIn = false, user = null } = useSelector(state => state.user || {});
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    dispatch(setCurrentUser(null));
    dispatch(setLoggedInOut(false));
    dispatch(setToken(null));
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold me-4" to="/">
          <img src="/logo.png" alt="ShirtShop" width="120" className="d-inline-block align-text-top" />
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler order-lg-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Main Navigation */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/products') ? 'active' : ''}`}
                to="/products"
                role="button"
              >
                Produk
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/products">Semua Produk</Link></li>
                <li><Link className="dropdown-item" to="/products/men">Pria</Link></li>
                <li><Link className="dropdown-item" to="/products/women">Wanita</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">Tentang Kami</Link>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex my-2 my-lg-0 mx-lg-4 flex-grow-1" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="search"
                className="form-control rounded-start-pill"
                placeholder="Cari produk..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-dark rounded-end-pill" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>

        {/* Right Navigation */}
        <div className="d-flex align-items-center order-lg-2">
          {/* User Account */}
          <div className="dropdown">
            <button className="btn btn-link text-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
              <i className="bi bi-person fs-5"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {isLoggedIn ? (
                <>
                  <li><span className="dropdown-item-text">Halo, {user?.name}</span></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item" to="/account">
                      <i className="bi bi-person-circle me-2"></i>Akun Saya
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/orders">
                      <i className="bi bi-box-seam me-2"></i>Pesanan
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className="dropdown-item" to="/login">
                      <i className="bi bi-box-arrow-in-right me-2"></i>Login
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/register">
                      <i className="bi bi-person-plus me-2"></i>Daftar
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Cart (Hanya tampil kalau login) */}
          {isLoggedIn && (
            <Link to="/cart" className="position-relative text-dark text-decoration-none ms-3">
              <i className="bi bi-cart3 fs-5"></i>
              {cartItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems.length}
                  <span className="visually-hidden">items in cart</span>
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
