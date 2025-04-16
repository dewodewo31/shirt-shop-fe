import React from 'react'
import ProductListItem from './ProductListItem'

export default function ProductList({products}) {
  return (
    <div className='row'>
      {
        products?.map(product =>(
          <ProductListItem product={product} key={product.id}/>
        ))
      }
    </div>
  )
}
