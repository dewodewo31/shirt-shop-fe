import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { axiosRequest } from "../../helpers/config";
import thousands from "../../helpers/thousands";

const About = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosRequest.get("products?limit=4");
        const data = res.data;
        setProducts(data.data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container py-5">
      {/* About Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Tentang ShirtShop</h1>
        <div className="card shadow-sm mt-4 border-0">
          <div className="card-body">
            <p
              className="text-muted mt-3"
              style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.1rem" }}
            >
              ShirtShop adalah brand fashion lokal yang menghadirkan kaos
              berkualitas tinggi dengan desain eksklusif untuk kamu yang ingin
              tampil beda. Kami percaya bahwa fashion bukan hanya tentang
              penampilan, tapi juga ekspresi diri. Produk kami dibuat dengan bahan
              premium dan diproses dengan penuh cinta agar kamu selalu merasa nyaman
              dan percaya diri setiap saat.
            </p>
          </div>
        </div>
      </div>

      {/* Product Gallery */}
      <h2 className="text-center fw-bold mb-4">Galeri Produk Kami</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="card shadow-sm border-0">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="card-img-top"
                style={{
                  height: "220px",
                  objectFit: "contain",
                  backgroundColor: "#f8f9fa",
                  padding: "15px",
                }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text fw-bold text-primary">
                  Rp. {thousands(product.price)},-
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Contact Us Section */}
      <div className="card shadow-sm mt-5 border-0">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-3">
            <i className="bi bi-telephone-fill me-2"></i> Kontak Kami
          </h5>
          <ul className="list-unstyled mb-0">
            <li className="mb-2">
              <i className="bi bi-envelope-fill me-2 text-danger"></i>
              support@shirtshop.id
            </li>
            <li className="mb-2">
              <i className="bi bi-instagram me-2 text-danger"></i>
              @shirtshop.id
            </li>
            <li>
              <i className="bi bi-whatsapp me-2 text-success"></i>
              +62 812-3456-7890
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
