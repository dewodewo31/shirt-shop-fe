import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import thousands from "../../helpers/thousands";
// import { Rating } from 'react-simple-star-rating'
import { BiTime } from "react-icons/bi";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProductListItem({ product, index }) {
  const calculateReviewAverage = () => {
    let average = product?.reviews?.reduce((acc, review) => {
      return (acc += review.rating / product.reviews.length);
    }, 0);
    return average > 0 ? average.toFixed(1) : 0;
  };

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div
      className="col-sm-6 col-md-4 col-lg-3 mb-4"
      data-aos="fade-up"
      data-aos-delay={index * 50}
    >
      <Link
        to={`/product/${product.slug}`}
        className="text-decoration-none text-dark product-card"
      >
        <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden hover-effect">
          <div className="position-relative">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="img-fluid product-image"
              style={{
                height: "250px",
                width: "100%",
                objectFit: "cover",
                filter: product.status !== 1 ? "grayscale(80%)" : "none",
              }}
            />

            {/* Vintage Badge */}
            {product.is_vintage && (
              <div className="position-absolute top-0 start-0 m-2 vintage-badge">
                <BiTime className="me-1" />
                Vintage
              </div>
            )}

            {/* Stock Status */}
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

          <div className="card-body d-flex flex-column">
            <h6 className="text-dark fw-bold mb-1 text-truncate vintage-title">
              {product.name}
            </h6>

            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-danger fw-bold fs-5">
                Rp{thousands(product.price)}
              </span>
              {calculateReviewAverage() > 0 && (
                <div className="d-flex align-items-center">
                  <Rating
                    initialValue={calculateReviewAverage()}
                    readonly
                    size={20}
                    allowFraction
                    className="me-2"
                  />
                  <small>({product.reviews?.length})</small>
                </div>
              )}
            </div>

            {/* Size Tags */}
            <div className="d-flex flex-wrap gap-1 mb-2">
              {product.sizes?.map(size => (
                <span
                  key={size.id}
                  className="badge rounded-pill bg-light text-dark border px-2 size-tag"
                >
                  {size.name}
                </span>
              ))}
            </div>

            {/* Color Swatches */}
            <div className="d-flex align-items-center gap-2 mb-2 color-swatches">
              {product.colors?.map(color => (
                <div
                  key={color.id}
                  className="border rounded-circle color-swatch"
                  title={color.name}
                  style={{
                    backgroundColor: color.hex_code || color.name.toLowerCase(),
                    height: "24px",
                    width: "24px",
                  }}
                ></div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-auto d-flex justify-content-between align-items-center">
              <small className="text-muted">{product.category?.name}</small>
              {product.is_second && (
                <span className="badge bg-warning text-dark">
                  Bekas Premium
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
