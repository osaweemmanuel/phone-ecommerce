import React, { Component } from 'react'
import Title from '../Title.js'
import {CartColumns,EmptyCart,CartList,CartTotals} from '.';
import { ProductConsumer } from '../context/AppContext.js';



export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {(value)=>{
            const {cart}=value;
            if(cart.length>0){
              return (
                <div>
                  <Title name='your' title='cart'/>
                   <CartColumns/>
                   <CartList value={value}/>
                   <CartTotals value={value}/>
                </div>
              )
            }
            else{
             return  <EmptyCart/>
            }
          }}
        </ProductConsumer>
       
       
      
        
      </section>
    )
  }
}

