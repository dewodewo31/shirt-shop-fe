import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import thousands from "../helpers/thousands";
import { axiosRequest } from "../helpers/config";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  // Simulasi fetch API (ganti dengan real API)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosRequest.get("products?limit=4");
        const data = res.data;
        console.log(data);
        setProducts(data.data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Selamat Datang di ShirtShop</h1>
          <p className="lead">
            Temukan koleksi kaos distro terbaik dengan desain kekinian!
          </p>
          <Link to="/products" className="btn btn-light btn-lg mt-3">
            Jelajahi Produk
          </Link>
        </div>
      </div>

      {/* Produk Terbaru */}
      <div className="container py-5">
        <h2 className="mb-4 text-center">Produk Kami</h2>
        <div className="row">
          {products.map(product => (
            <div className="col-md-3 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                {product.status == 1 ? (
                  <span className="position-absolute top-0 end-0 badge bg-success m-2">
                    Ready Stock
                  </span>
                ) : (
                  <span className="position-absolute top-0 end-0 badge bg-danger m-2">
                    Sold Out
                  </span>
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text fw-bold text-primary">
                    Rp. {thousands(product.price)},-
                  </p>
                  <Link
                    to={`/product/${product.slug}`}
                    className="btn btn-outline-primary mt-auto"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alasan Berbelanja */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="mb-4 text-center">Kenapa Belanja di ShirtShop?</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <i className="bi bi-truck display-4 text-primary mb-3"></i>
              <h5>Pengiriman Cepat</h5>
              <p>
                Order kamu akan diproses dan dikirim dengan cepat ke rumahmu.
              </p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-shield-check display-4 text-primary mb-3"></i>
              <h5>Garansi Produk</h5>
              <p>
                Produk bergaransi & bisa ditukar jika ada kerusakan produksi.
              </p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-star-fill display-4 text-primary mb-3"></i>
              <h5>Kualitas Terjamin</h5>
              <p>Bahan kaos premium dan sablon awet tahan lama.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
