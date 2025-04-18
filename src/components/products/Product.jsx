import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../helpers/config";
import Alert from "../layouts/Alert";
import Spinner from "../layouts/Spinner";
import thousands from "../../helpers/thousands";
import parse from "html-react-parser";
import Slider from "./images/Slider";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState([false]);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const { slug } = useParams();
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
    <div className="card my-5">
      {error ? (
        <Alert type="danger" content={error} />
      ) : loading ? (
        <Spinner />
      ) : (
        <>
          <div className="row g-4 my-5 align-items-start">
            <div className="col-md-5">
              <div className="border rounded shadow-sm p-2 bg-white">
                <Slider product={product}/>
              </div>
            </div>

            <div className="col-md-7">
              <div className="card border-0 shadow-sm p-4">
                <h2 className="fw-bold text-dark mb-3">{product.name}</h2>

                <h4 className="mb-3 text-primary">
                  Harga:
                  <span className="badge bg-primary ms-2 p-3 fs-5">
                    Rp. {thousands(product.price)},-
                  </span>
                </h4>

                <div className="mb-4">
                  <strong className="fs-5 d-block mb-2 text-secondary">
                    Deskripsi Barang:
                  </strong>
                  <div
                    className="text-muted p-3 border border-2 rounded-3 bg-light"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {parse(product?.desc)}
                  </div>
                </div>

                <div className="mb-4">
                  <strong className="fs-5 text-secondary d-block mb-2">
                    Ukuran:
                  </strong>
                  <div className="d-flex flex-wrap gap-2">
                    {product.sizes?.map(size => (
                      <span
                        key={size.id}
                        className="badge rounded-pill bg-light text-dark border fw-bold px-3 py-2"
                        style={{ fontSize: "1rem" }}
                      >
                        {size.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <strong className="fs-5 text-secondary d-block mb-2">
                    Warna:
                  </strong>
                  <div className="d-flex flex-wrap gap-2">
                    {product.colors?.map(color => (
                      <div
                        key={color.id}
                        className="border rounded-circle"
                        title={color.name}
                        style={{
                          backgroundColor: color.name.toLowerCase(),
                          height: "35px",
                          width: "35px",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  {product.status == 1 ? (
                    <span className="badge bg-success fs-6 px-4 py-2">
                      Stok Tersedia
                    </span>
                  ) : (
                    <span className="badge bg-danger fs-6 px-4 py-2">
                      Sold Out
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
