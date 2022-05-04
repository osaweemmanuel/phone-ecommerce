import React, { Component } from 'react'
import Product from './Product'
import Title from './Title'
import { ProductConsumer } from './context/AppContext'



export default class ProductList extends Component {
 


  render() {
   

    return (
      <div className='py-5'>
          <div className='container'>
            <Title name='Our' title='Product'/>
            <div className='row'>
                  <ProductConsumer>
                    {value=>{
                      return value.products.map(product=>{
                        return <Product key={product.id} product={product}/>
                      })
                    }}
                  </ProductConsumer>
            </div>
          </div>
      </div>
    )
  }
}
