import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import thousands from "../helpers/thousands";
import { axiosRequest } from "../helpers/config";
import AOS from "aos";
import "aos/dist/aos.css";
import { BiLeaf, BiRecycle } from "react-icons/bi";
import { FaTshirt } from "react-icons/fa";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    const fetchData = async () => {
      try {
        const res = await axiosRequest.get("products?limit=4");
        setProducts(res.data.data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section
        className="hero-thrift bg-dark text-white py-5"
        data-aos="fade-down"
      >
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-4">
            <FaTshirt className="me-3" />
            Vintage Threads Thrift Shop
          </h1>
          <p className="lead mb-5">
            Temukan gaya retro unik dengan kualitas premium bekas pilihan
          </p>
          <Link
            to="/products"
            className="btn btn-warning btn-lg rounded-pill px-5"
            data-aos="zoom-in"
          >
            Jelajahi Koleksi →
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5 display-5 fw-bold" data-aos="fade-up">
            Koleksi Terbaru
          </h2>
          <div className="row g-4">
            {products.map((product, index) => (
              <div
                className="col-md-6 col-lg-3"
                key={product.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-img-top position-relative">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="img-fluid"
                      style={{ height: "250px", objectFit: "cover" }}
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
                  </div>
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{product.name}</h5>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="text-danger fw-bold fs-5">
                        Rp{thousands(product.price)}
                      </span>
                      <Link
                        to={`/product/${product.slug}`}
                        className="btn btn-outline-dark btn-sm"
                      >
                        Detail
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 display-5 fw-bold" data-aos="fade-up">
            Kenapa Memilih Kami?
          </h2>
          <div className="row g-4 text-center">
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="100">
              <div className="p-4 bg-white rounded-3 shadow-sm h-100">
                <BiLeaf className="display-4 text-success mb-3" />
                <h5 className="fw-bold">Ramah Lingkungan</h5>
                <p className="text-muted">
                  Mendukung sustainable fashion dengan daur ulang pakaian bekas
                  berkualitas
                </p>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
              <div className="p-4 bg-white rounded-3 shadow-sm h-100">
                <BiRecycle className="display-4 text-primary mb-3" />
                <h5 className="fw-bold">Kualitas Terjamin</h5>
                <p className="text-muted">
                  Setiap produk melalui proses kurasi ketat dan sanitasi bersih
                </p>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="300">
              <div className="p-4 bg-white rounded-3 shadow-sm h-100">
                <FaTshirt className="display-4 text-warning mb-3" />
                <h5 className="fw-bold">Unik & Vintage</h5>
                <p className="text-muted">
                  Desain eksklusif tahun 80-90an yang tidak akan pernah
                  ketinggalan zaman
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5 display-5 fw-bold" data-aos="fade-up">
            Kategori Populer
          </h2>
          <div className="row g-4">
            {[
              {
                name: "Band Tees",
                img: "https://source.unsplash.com/random/800x600?vintage-band",
              },
              {
                name: "Sport Vintage",
                img: "https://source.unsplash.com/random/800x600?vintage-sport",
              },
              {
                name: "Denim Jacket",
                img: "https://source.unsplash.com/random/800x600?vintage-denim",
              },
            ].map((category, index) => (
              <div
                className="col-md-4"
                key={category.name}
                data-aos="flip-left"
                data-aos-delay={index * 100}
              >
                <div className="card border-0 shadow-sm h-100">
                  <img
                    src={category.img}
                    alt={category.name}
                    className="card-img-top"
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                  <div className="card-body bg-dark text-center">
                    <h3 className="card-title text-white mb-0">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-5 bg-warning" data-aos="fade-up">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h2 className="display-6 fw-bold mb-4">
                Dapatkan Update Koleksi Terbaru
              </h2>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control rounded-start-pill"
                  placeholder="Masukkan email anda"
                />
                <button className="btn btn-dark rounded-end-pill px-4">
                  Subscribe
                </button>
              </div>
              <small className="text-muted">
                Kami tidak akan membagikan email anda ke pihak lain
              </small>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 display-5 fw-bold" data-aos="fade-up">
            Tips Thrifting
          </h2>
          <div className="row g-4">
            {[
              {
                title: "Cara Merawat Baju Bekas",
                content:
                  "Tips membersihkan dan menyimpan pakaian thrift agar awet",
                img: "https://source.unsplash.com/random/800x600?laundry",
              },
              {
                title: "Mix & Match Gaya Vintage",
                content: "Kombinasi outfit retro dengan gaya modern",
                img: "https://source.unsplash.com/random/800x600?vintage-fashion",
              },
            ].map((post, index) => (
              <div
                className="col-md-6"
                key={post.title}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{post.title}</h5>
                    <p className="card-text text-muted">{post.content}</p>
                    <button className="btn btn-link text-decoration-none">
                      Baca Selengkapnya →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
