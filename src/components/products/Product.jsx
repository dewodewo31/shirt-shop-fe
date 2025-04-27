import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../helpers/config";
import Alert from "../layouts/Alert";
import Spinner from "../layouts/Spinner";
import thousands from "../../helpers/thousands";
import parse from "html-react-parser";
import Slider from "./images/Slider";
import { Rating } from "@mui/material";
import { FaTruck, FaShieldAlt, FaExchangeAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState([false]);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const { slug } = useParams();
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchProductBySlug = async () => {
      setLoading(true);
      try {
        // Jika tidak ada filter/search, ambil semua produk
        const response = await axiosRequest.get(`/product/${slug}/show`);
        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error?.response?.this.status === 404) {
          setError("Produk Tidak Ditemukan.");
        }
        console.log(error);
        setLoading(false);
      }
    };

    // Trigger saat filter berubah
    fetchProductBySlug();
  }, [slug]);

  return (
    <div className="container my-5">
      {error ? (
        <Alert type="danger" content={error} />
      ) : loading ? (
        <Spinner />
      ) : (
        <>

          <div className="row g-5">
            {/* Image Gallery */}
            <div className="col-lg-6">
              <div className="sticky-top" style={{ top: "80px" }}>
                <div className="main-image mb-3 border rounded-3 overflow-hidden">
                  <Slider product={product} />
                </div>
                
                <div className="thumbnail-slider d-flex gap-2">
                  {product.images?.map((img) => (
                    <img
                      key={img.id}
                      src={img.url}
                      alt={product.name}
                      className="img-thumbnail cursor-pointer"
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="col-lg-6">
              <div className="card border-0 p-4 shadow-sm">
                <h1 className="fw-bold display-6 mb-3">{product.name}</h1>
                
                <div className="d-flex align-items-center gap-3 mb-4">
                  <Rating
                    value={product.rating || 4.5}
                    precision={0.5}
                    readOnly
                    size="large"
                  />
                  <span className="text-muted">(1,234 reviews)</span>
                </div>

                <div className="bg-light p-4 rounded-3 mb-4">
                  <div className="d-flex align-items-baseline gap-3">
                    <h2 className="text-danger fw-bold mb-0">
                      Rp{thousands(product.price)}
                    </h2>
                    <del className="text-muted fs-5">Rp{thousands(product.price + 50000)}</del>
                    <span className="badge bg-danger fs-6">30% OFF</span>
                  </div>
                  
                  <div className="mt-3 d-flex gap-2 text-success">
                    <FaTruck className="fs-5" />
                    <span>Gratis Ongkir &amp; Pengembalian</span>
                  </div>
                </div>

                {/* Variant Selection */}
                <div className="mb-5">
                  <div className="mb-4">
                    <h5 className="fw-bold mb-3">Pilih Ukuran:</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {product.sizes?.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setSelectedSize(size)}
                          className={`btn ${
                            selectedSize?.id === size.id
                              ? "btn-dark"
                              : "btn-outline-dark"
                          } rounded-pill px-4`}
                        >
                          {size.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="fw-bold mb-3">Pilih Warna:</h5>
                    <div className="d-flex flex-wrap gap-3">
                      {product.colors?.map(color => (
                      <div
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-circle border transition-all duration-200 ${
                          selectedColor?.id === color.id
                            ? "border-3 border-dark shadow-lg scale-110 ring ring-warning"
                            : "border border-secondary-subtle hover:scale-105 hover:shadow-sm"
                        }`}
                        title={color.name}
                        style={{
                          backgroundColor: color.name.toLowerCase(),
                          height: "35px",
                          width: "35px",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                    </div>
                  </div>

                  <div className="quantity-selector mb-4">
                    <h5 className="fw-bold mb-3">Kuantitas:</h5>
                    <div className="d-flex align-items-center gap-2">
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => setQty(Math.max(1, qty - 1))}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control text-center"
                        value={qty}
                        onChange={(e) => setQty(Math.max(1, e.target.value))}
                        style={{ width: "70px" }}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => setQty(qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-3 mb-4">
                  <button
                    className="btn btn-danger btn-lg flex-grow-1"
                    disabled={!selectedColor || !selectedSize}
                    onClick={()=> {
                      dispatch(addToCart({
                        product_id: product.id,
                        slug: product.slug,
                        name: product.name,
                        qty: parseInt(qty),
                        price: parseInt(product.price),
                        color: selectedColor,
                        size: selectedSize,
                        maxQty: parseInt(product.qty),
                        image: product.thumbnail,
                        coupon_id: null
                      }))
                      setSelectedColor(null)
                      setSelectedSize(null)
                      setQty(1)
                    }}
                  >
                    <i className="bi bi-cart3 me-2"></i> Tambah ke Keranjang
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="row g-3 text-center mb-4">
                  <div className="col-4">
                    <div className="p-2 border rounded-3">
                      <FaTruck className="fs-3 text-primary mb-2" />
                      <div className="small">Gratis Pengiriman</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 border rounded-3">
                      <FaShieldAlt className="fs-3 text-success mb-2" />
                      <div className="small">Garansi 5 Hari</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 border rounded-3">
                      <FaExchangeAlt className="fs-3 text-warning mb-2" />
                      <div className="small">10 Hari Retur</div>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="accordion" id="productAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#description"
                      >
                        Deskripsi Produk
                      </button>
                    </h2>
                    <div
                      id="description"
                      className="accordion-collapse collapse show"
                    >
                      <div className="accordion-body">
                        {parse(product?.desc)}
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Sticky Add to Cart */}
          <div className="d-lg-none fixed-bottom bg-white border-top shadow-lg">
            <div className="container py-3">
              <div className="d-flex gap-2">
                <div className="flex-grow-1">
                  <div className="h4 text-danger mb-0">Rp{thousands(product.price)}</div>
                  <small className="text-muted">Stok: {product.qty}</small>
                </div>
                <button 
                  className="btn btn-danger btn-lg"
                  disabled={!selectedColor || !selectedSize}
                  onClick={()=> {
                    dispatch(addToCart({
                      product_id: product.id,
                      slug: product.slug,
                      name: product.name,
                      qty: parseInt(qty),
                      price: parseInt(product.price),
                      color: selectedColor,
                      size: selectedSize,
                      maxQty: parseInt(product.qty),
                      image: product.thumbnail,
                      coupon_id: null
                    }))
                    setSelectedColor(null)
                    setSelectedSize(null)
                    setQty(1)
                  }}
                >
                  <i className="bi bi-cart3 me-2"></i> Beli
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
