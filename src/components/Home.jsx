import React, { useEffect, useState } from "react";
import ProductList from "./products/ProductList";
import { axiosRequest } from "../helpers/config";
import { useDebounce } from "use-debounce";
import Alert from "./layouts/Alert";
import Spinner from "./layouts/Spinner";

export default function Home() {
    // State untuk menyimpan data
    const [products, setProducts] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState([false]);
  
    // State untuk filter dan search
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
  
    // State untuk pesan jika data tidak ditemukan
    const [message, setMessage] = useState("");
  
    // Debounce untuk search input agar tidak trigger API terus-terusan
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
    // Event saat memilih warna
    const handleColorSelectedBox = e => {
      setSelectedSize("");
      setSearchTerm("");
      setSelectedColor(e.target.value);
    };
  
    // Event saat memilih ukuran
    const handleSizeSelectedBox = e => {
      setSelectedColor("");
      setSearchTerm("");
      setSelectedSize(e.target.value);
    };
  
    // Reset filter warna & ukuran
    const clearFilters = () => {
      setSelectedColor("");
      setSelectedSize("");
    };
  
    // Ambil data berdasarkan filter atau search
    useEffect(() => {
      const fetchAllProducts = async () => {
        setMessage("");
        setLoading(true)
        try {
          if (selectedColor) {
            // Jika ada filter warna
            const response = await axiosRequest.get(`product/${selectedColor}/color`);
            setProducts(response.data.data);
            setColors(response.data.colors);
            setSizes(response.data.sizes);
            setLoading(false)
  
          } else if (selectedSize) {
            // Jika ada filter ukuran
            const response = await axiosRequest.get(`product/${selectedSize}/size`);
            setProducts(response.data.data);
            setColors(response.data.colors);
            setSizes(response.data.sizes);
            setLoading(false)
  
          } else if (debouncedSearchTerm[0]) {
            // Jika ada keyword search (dan sudah debounce)
            const response = await axiosRequest.get(`product/${searchTerm}/find`);
            if (response.data.data.length > 0) {
              setProducts(response.data.data);
              setColors(response.data.colors);
              setSizes(response.data.sizes);
              setLoading(false)

            } else {

              setMessage("Produk Tidak Ditemukan");
              setLoading(false)

            }
  
          } else {
            // Jika tidak ada filter/search, ambil semua produk
            const response = await axiosRequest.get("products");
            setProducts(response.data.data);
            setColors(response.data.colors);
            setSizes(response.data.sizes);
            setLoading(false)

          }
        } catch (error) {
          console.log(error);
          setLoading(false)
        }
      };
  
      // Trigger saat filter berubah
      fetchAllProducts();
    }, [selectedColor, selectedSize, debouncedSearchTerm[0]]);
  
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="row">
                {/* Filter berdasarkan warna */}
                <div className="col-md-4 mb-2">
                  <div className="mb-2">
                    <span className="fw-bold">Berdasarkan Warna:</span>
                  </div>
                  <select
                    name="color_id"
                    id="color_id"
                    defaultValue=""
                    onChange={e => handleColorSelectedBox(e)}
                    disabled={selectedSize || searchTerm}
                    className="form-select"
                  >
                    <option
                      value=""
                      disabled={!selectedColor}
                      onChange={() => clearFilters()}
                    >
                      Semua Warna
                    </option>
                    {colors.map(color => (
                      <option value={color.id} key={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
  
                {/* Filter berdasarkan ukuran */}
                <div className="col-md-4 mb-2">
                  <div className="mb-2">
                    <span className="fw-bold">Berdasarkan Ukuran:</span>
                  </div>
                  <select
                    name="size_id"
                    id="size_id"
                    defaultValue=""
                    onChange={e => handleSizeSelectedBox(e)}
                    disabled={selectedColor || searchTerm}
                    className="form-select"
                  >
                    <option
                      value=""
                      disabled={!selectedSize}
                      onChange={() => clearFilters()}
                    >
                      Semua Ukuran
                    </option>
                    {sizes.map(sizes => (
                      <option value={sizes.id} key={sizes.id}>
                        {sizes.name}
                      </option>
                    ))}
                  </select>
                </div>
  
                {/* Search box */}
                <div className="col-md-4 mb-2">
                  <div className="mb-2">
                    <span className="fw-bold">Cari :</span>
                  </div>
                  <form className="d-flex">
                    <input
                      type="search"
                      className="form-control me-2"
                      value={searchTerm}
                      disabled={selectedColor || selectedSize}
                      onChange={e => setSearchTerm(e.target.value)}
                      placeholder="Cari Produk"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
  
          {/* Tampilkan produk atau pesan */}
          <div>
            {message ? (
              <Alert type="primary" content={message}/>
            ) : (
              loading
              ?
              <Spinner/>
              :
              <ProductList products={products} />
            )}
          </div>
        </div>
      </div>
    );
}
