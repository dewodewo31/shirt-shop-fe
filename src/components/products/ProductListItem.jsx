import React from "react";
import { Link } from "react-router-dom";

export default function ProductListItem({ product }) {
  return (
    <div className="col-md-4 mb-3 ">
      <Link to="" className="text-decoration-none text-dark">
        <div className="card shadow-sm h-100">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="card-img-top"
          />
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="text-dark">{product.name}</h5>
            </div>
            <div className="text-muted">
              <strong>Deskripsi Produk:</strong>
              <div dangerouslySetInnerHTML={{ __html: product.desc }} />
            </div>
            <div className="text-muted">
              <strong>Stok Tersedia:</strong>
              <div dangerouslySetInnerHTML={{ __html: product.qty }} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
