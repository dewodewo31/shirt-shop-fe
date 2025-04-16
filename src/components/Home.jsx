import React, { useEffect, useState } from "react";
import ProductList from './products/ProductList'
import { axiosRequest } from "../helpers/config";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState([false]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axiosRequest.get('products')
        setProducts(response.data.data)
        setColors(response.data.colors)
        setSizes(response.data.sizes)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllProducts()
  }, [])
  
  return(
    <div className="">
      <ProductList products={products}/>
    </div>
  );
}
