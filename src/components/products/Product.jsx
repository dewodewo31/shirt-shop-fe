import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { axiosRequest } from '../../helpers/config';
import Alert from '../layouts/Alert';
import Spinner from '../layouts/Spinner';
import thousands from '../../helpers/thousands';

export default function Product() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState([false]);

  const [selectedColor, setSelectedColor] = useState("");
      const [selectedSize, setSelectedSize] = useState("");
      const [qty, setQty] = useState(1);
      const [error, setError] = useState("");
      const {slug} = useParams()
      useEffect(() => {
            const fetchProductBySlug = async () => {
              setLoading(true)
              try {
                  // Jika tidak ada filter/search, ambil semua produk
                  const response = await axiosRequest.get(`/product/${slug}/show`);
                  setProduct(response.data.data);
                  setLoading(false);

              } catch (error) {
                if (error?.response?.this.status === 404) {
                  setError('Produk Tidak Ditemukan.')
                }
                console.log(error);
                setLoading(false);
              }
            };
        
            // Trigger saat filter berubah
            fetchProductBySlug();
          }, [ slug ]);
        
  return (
    <div className='card my-5'>
      {
        error ? <Alert type="danger" content={error}/>
        :
        loading ?
        <Spinner/>
        :
        <>
        <div className="row g-0">
          <div className="col-md-4 p-2">
            <div className="">
              <img src={product.thumbnail} alt={product.name} 
            className='card-img-top'
            style={{
              maxWidth: "100%", // Width 100% (biar ngikutin lebar container)
              maxHeight: "400px", // Batas tinggi max 200px
              objectFit: "cover", // Gambar akan tetap terjaga proporsinya tanpa distorsi, tapi mungkin terpotong sedikit
            }}
            />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card card-body">
              <div className="d-flex justify-content-center">
              <div className="d-flex justify-content-between">
                <h3 className="text-dark fw-bold">{product.name}</h3>
              </div>
              </div>
            </div>
            <h6 className="fw-bold py-2">Harga :  <span className="badge bg-primary p-2">Rp. {thousands(product.price)},-</span></h6>
            <div className="row justify-content-between align-items-center my-3">
  {/* Label */}
  <div className="col-md-4">
    <h6 className="fw-bold mb-0">Warna Tersedia:</h6>
  </div>

  {/* Warna-warna */}
  <div className="col-md-4 d-flex gap-2 flex-wrap justify-content-end">
    {product.colors?.map((color) => (
      <div
        key={color.id}
        className="border border-light-subtle border-2 rounded"
        style={{
          backgroundColor: color.name.toLowerCase(),
          height: '20px',
          width: '20px',
        }}
      ></div>
    ))}
  </div>
</div>

          </div>
        </div>
        </>
      }
    </div>
  )
}
