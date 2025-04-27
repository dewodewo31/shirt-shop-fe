import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { axiosRequest } from "../../helpers/config";
import thousands from "../../helpers/thousands";
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BiLeaf, BiRecycle, BiStore } from "react-icons/bi";

const About = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });

    const fetchData = async () => {
      try {
        const res = await axiosRequest.get("products?limit=8");
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
      <section className="py-5 bg-dark text-white" data-aos="fade-down">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-4">
            <BiStore className="me-3" />
            Tentang ShirtShop
          </h1>
          <p className="lead">
            Lebih dari Sekadar Toko Baju 
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="card border-0 shadow-lg h-100">
                <img 
                  src="https://source.unsplash.com/random/800x600?vintage-store" 
                  alt="Toko Kami" 
                  className="card-img-top"
                  style={{ height: "400px", objectFit: "cover" }}
                />
              </div>
            </div>
            
            <div className="col-lg-6" data-aos="fade-left">
              <div className="p-4">
                <h2 className="fw-bold mb-4">Cerita Kami</h2>
                <p className="lead text-muted mb-4">
                  Sejak 2015, ShirtShop berkomitmen untuk menghidupkan kembali fashion masa lalu 
                  dengan cara yang berkelanjutan. Setiap pakaian yang kami jual memiliki sejarah unik 
                  dan karakter khusus.
                </p>
                
                <div className="row g-4">
                  <div className="col-md-6" data-aos="zoom-in">
                    <div className="text-center p-3 bg-white rounded-3 shadow-sm">
                      <BiLeaf className="display-4 text-success mb-3" />
                      <h5>Fashion Berkelanjutan</h5>
                      <small className="text-muted">Mengurangi limbah tekstil</small>
                    </div>
                  </div>
                  
                  <div className="col-md-6" data-aos="zoom-in" data-aos-delay="100">
                    <div className="text-center p-3 bg-white rounded-3 shadow-sm">
                      <BiRecycle className="display-4 text-primary mb-3" />
                      <h5>Kurasi Ketat</h5>
                      <small className="text-muted">Kualitas terjamin</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" data-aos="fade-up">
            Koleksi Spesial
          </h2>
          
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            data-aos="zoom-in"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="card border-0 shadow-sm h-100">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="text-danger fw-bold">
                      Rp{thousands(product.price)}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" data-aos="fade-up">
            Tim Kami
          </h2>
          <div className="row g-4">
            {[
              { name: "Sarah", role: "Kurator", img: "https://source.unsplash.com/random/600x400?woman" },
              { name: "Dito", role: "Desainer", img: "https://source.unsplash.com/random/600x400?man" },
              { name: "Rina", role: "Customer Service", img: "https://source.unsplash.com/random/600x400?lady" }
            ].map((member, index) => (
              <div 
                className="col-md-4" 
                key={member.name}
                data-aos="flip-up" 
                data-aos-delay={index * 100}
              >
                <div className="card border-0 shadow-sm">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="fw-bold mb-1">{member.name}</h5>
                    <small className="text-muted">{member.role}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-4">Kontak Kami</h3>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
                      Jl. Perdamaian No. 123, Samarinda, Kalimantan Timur
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-envelope-fill me-2 text-primary"></i>
                      hello@shirtshop.id
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-whatsapp me-2 text-success"></i>
                      +62 812-3456-7890
                    </li>
                    <li>
                      <i className="bi bi-instagram me-2 text-danger"></i>
                      @shirtshop.id
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-4">Jam Operasional</h3>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>Senin - Jumat</td>
                          <td>09.00 - 20.00</td>
                        </tr>
                        <tr>
                          <td>Sabtu</td>
                          <td>10.00 - 18.00</td>
                        </tr>
                        <tr>
                          <td>Minggu/Hari Besar</td>
                          <td>Tutup</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4">
                    <h5>Berlangganan Newsletter</h5>
                    <div className="input-group">
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Masukkan email anda"
                      />
                      <button className="btn btn-dark">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;