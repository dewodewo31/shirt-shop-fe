import React from 'react'
import { Link } from 'react-router-dom'
import thousands from '../../helpers/thousands'
// import { Rating } from 'react-simple-star-rating'

export default function ProductListItem({ product }) {
  const calculateReviewAverage = () => {
    let average = product?.reviews?.reduce((acc, review) => {
      return acc += review.rating / product.reviews.length
    }, 0);
    return average > 0 ? average.toFixed(1) : 0
  }

  return (
    <div className='col-sm-6 col-md-4 col-lg-3 mb-4'>
      <Link to={`/product/${product.slug}`} className='text-decoration-none text-dark'>
        <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
          <div className="position-relative">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="img-fluid"
              style={{
                height: "220px",
                width: "100%",
                objectFit: "cover",
              }}
            />
            {
              product.status == 1 ? 
                <span className="position-absolute top-0 end-0 badge bg-success m-2">
                  Ready Stock
                </span>
              :
              <span className="position-absolute top-0 end-0 badge bg-danger m-2">
              Sold Out
            </span>
            }
          </div>

          <div className="card-body d-flex flex-column">
            <h6 className="text-dark fw-bold text-truncate mb-1">{product.name}</h6>

            <h6 className="text-primary fw-semibold mb-2">
              Rp. {thousands(product.price)},-
            </h6>

            {
              calculateReviewAverage() > 0 && (
                <div className="mb-2">
                  <Rating
                    initialValue={calculateReviewAverage()}
                    readonly
                    size={20}
                    allowFraction
                  />
                </div>
              )
            }

            <div className="d-flex flex-wrap gap-1 mb-2">
              {product.sizes?.map(size => (
                <span
                  key={size.id}
                  className="badge rounded-pill bg-light text-dark border px-2"
                  style={{ fontSize: "0.75rem" }}
                >
                  {size.name}
                </span>
              ))}
            </div>

            <div className="d-flex align-items-center gap-2 mb-2">
              {product.colors?.map(color => (
                <div
                  key={color.id}
                  className="border rounded-circle"
                  title={color.name}
                  style={{
                    backgroundColor: color.name.toLowerCase(),
                    height: "20px",
                    width: "20px",
                  }}
                ></div>
              ))}
            </div>

            {
              product.status === 1 && (
                <span className="badge bg-success align-self-start">
                  Tersedia
                </span>
              )
            }
          </div>
        </div>
      </Link>
    </div>
  )
}
