import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQ,
  incrementQ,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import thousands from "../../helpers/thousands";

export default function Cart() {
  const { cartItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const total = cartItems.reduce(
    (acc, item) => (acc += item.price * item.qty),
    0
  );
  return (
    <div className="row my-5">
      <div className="col-md-12">
        <div className="card shadow-sm p-4">
          <div className="card-body">
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item, index) => (
                  <div
                    className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-4 border-bottom py-4 mb-3"
                    key={index}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="rounded shadow-sm object-fit-cover"
                    />

                    <div className="flex-grow-1 w-90">
                      <h5 className="fw-semibold mb-2">{item.name}</h5>

                      <div className="d-flex flex-wrap align-items-center gap-3 text-muted small mb-3">
                        <div>
                          <strong>Warna:</strong>{" "}
                          <span
                            className="d-inline-block border rounded-circle"
                            style={{
                              backgroundColor:
                                item.color?.name.toLowerCase() || "#ccc",
                              width: "20px",
                              height: "20px",
                              verticalAlign: "middle",
                            }}
                            title={item.color?.name}
                          ></span>
                        </div>
                        <div>
                          <strong>Ukuran:</strong>{" "}
                          <span className="badge bg-light text-dark border fw-normal">
                            {item.size?.name || "N/A"}
                          </span>
                        </div>
                        <div>
                          <strong>Harga:</strong> Rp. {thousands(item.price)}
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => dispatch(decrementQ(item))}
                        >
                          <i className="bi bi-dash-lg"></i>
                        </button>
                        <span className="fw-bold px-2">{item.qty}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => dispatch(incrementQ(item))}
                        >
                          <i className="bi bi-plus-lg"></i>
                        </button>
                      </div>
                    </div>

                    <div className="text-md-end mt-3 mt-md-0">
                      <h6 className="mb-2 text-muted">Subtotal</h6>
                      <h5 className="fw-bold text-dark mb-3">
                        Rp. {thousands(item.price * item.qty)}
                      </h5>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => dispatch(removeFromCart(item))}
                      >
                        <i className="bi bi-trash3"></i> Hapus
                      </button>
                    </div>
                  </div>
                ))}

                <div className="text-end mt-5">
                  <h4 className="fw-bold mb-3">
                    Total Belanja: Rp. {thousands(total)}
                  </h4>
                  <Link to="/checkout" className="btn btn-dark btn-lg">
                    <i className="bi bi-bag-check-fill"></i> Checkout Sekarang
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-5">
                <i className="bi bi-cart4 display-4 text-muted"></i>
                <h4 className="mt-3 text-muted">Keranjang kamu kosong.</h4>
                <Link to="/products" className="btn btn-outline-primary mt-3">
                  <i className="bi bi-arrow-left"></i> Belanja Sekarang
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
