import React from 'react';
import {Link} from 'react-router-dom';

function CartTotals({value}) {
  const {cartSubtotal,cartTax,cartTotal,clearCart}=value;
  return (
    <div className='container'>
        <div className='row'>
          <div className='col-10 col-sm-8 mt-2 ml-sm-5 ml-md-auto text-capitalize text-right'>
              <Link to='/'>
                <button type='button' className='btn btn-outline-danger text-uppercase mb-3 px-5' onClick={()=>clearCart()}>Clear cart</button>
              </Link>
              <h5>
                <span className='text-title'>subtotal: </span>
                <strong>{cartSubtotal}</strong>
              </h5>

              <h5>
                <span className='text-title'>tax: </span>
                <strong>{cartTax}</strong>
              </h5>

              <h5>
                <span className='text-title'>total: </span>
                <strong>{cartTotal}</strong>
              </h5>
          </div>
        </div>
    </div>
  )
}

export default CartTotals