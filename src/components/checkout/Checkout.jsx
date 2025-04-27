import React from "react";
import { useSelector } from "react-redux";
import thousands from "../../helpers/thousands";

export default function Checkout() {
  const { cartItems } = useSelector(state => state.cart);

  return (
    <div className="container-fluid py-5">
      <div className="row g-5">
        {/* Bagian Informasi Pengiriman */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-4">
              <h2 className="mb-4 fw-bold text-gradient-primary">
                Informasi Pengiriman
              </h2>

              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Nama Lengkap</label>
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    className="form-control form-control-lg rounded-3"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Alamat Lengkap
                  </label>
                  <textarea
                    className="form-control form-control-lg rounded-3"
                    rows="3"
                  ></textarea>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Kurir Pengiriman
                  </label>
                  <select className="form-select form-select-lg rounded-3">
                    <option>Pilih Kurir</option>
                    <option>JNE</option>
                    <option>SiCepat</option>
                    <option>GoSend</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Ringkasan Belanja */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-4">
              <h2 className="mb-4 fw-bold text-gradient-primary">
                Ringkasan Belanja
              </h2>

              <div className="vstack gap-4 mb-5">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="d-flex gap-3 p-3 bg-light rounded-4 hover-scale"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-3 object-fit-cover shadow-sm"
                    />

                    <div className="flex-grow-1">
                      <h5 className="fw-bold mb-2">{item.name}</h5>

                      <div className="d-flex gap-2 mb-2">
                        <span className="badge bg-dark rounded-pill">
                          {item.color?.name || item.color}
                        </span>
                        <span className="badge bg-secondary rounded-pill">
                          {item.size?.name || item.size}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="text-muted">
                          {item.qty} × Rp{thousands(item.price)}
                        </div>
                        <div className="fw-bold">
                          Rp{thousands(item.price * item.qty)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Voucher Diskon */}
              <div className="mb-4">
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    className="form-control rounded-start-3"
                    placeholder="Masukkan kode promo"
                  />
                  <button className="btn btn-primary rounded-end-3 px-4">
                    Terapkan
                  </button>
                </div>
              </div>

              {/* Total Pembayaran */}
              <div className="bg-dark text-white p-4 rounded-4 mb-4">
                <div className="d-flex justify-content-between fw-bold mb-2">
                  <span>Subtotal:</span>
                  <span>
                    Rp
                    {thousands(
                      cartItems.reduce(
                        (total, item) => total + item.price * item.qty,
                        0
                      )
                    )}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Diskon:</span>
                  <span className="text-success">- Rp{thousands(25000)}</span>
                </div>
                <hr className="my-3" />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total:</span>
                  <span>Rp{thousands(225000)}</span>
                </div>
              </div>

              {/* Tombol Checkout */}
              <button className="btn btn-primary btn-lg w-100 rounded-3 py-3 fw-bold hover-scale">
                Lanjut ke Pembayaran
              </button>

              {/* Garansi Keamanan */}
              <div className="mt-4 text-center">
                <div className="d-flex justify-content-center gap-3 text-muted">
                  <i className="bi bi-shield-lock fs-4"></i>
                  <small>Transaksi 100% Aman dan Terjamin</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
