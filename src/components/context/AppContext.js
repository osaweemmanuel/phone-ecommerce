import React, { Component } from 'react'
import { storeProducts,detailsProduct} from '../../data';

const ProductContext=React.createContext()

//provider and consumer

export default class ProductProvider extends Component {

  state={
    products:storeProducts,
    detailsProduct:detailsProduct,
    cart:[],
    modalOpen:false,
    modalProduct:detailsProduct,
    cartSubtotal:0,
    cartTax:0,
    cartTotal:0
  };

  //OUR LIFE CYCLE METHOD
  componentDidMount(){
    this.setProducts();
  }

  setProducts=()=>{
    let tempProducts=[];
    storeProducts.forEach(item => {
      const singleItem={...item};
      tempProducts=[...tempProducts,singleItem];
    });

    this.setState(()=>{
      return {products:tempProducts}
    })
  };

  //getting the id of 
  getItem=(id)=>{
    const product=this.state.products.find(item=>item.id===id);
    return product;
  };

  //add to cart 
addToCart=(id)=>{
  let tempProducts=[...this.state.products];
  const index=tempProducts.indexOf(this.getItem(id));
  const product=tempProducts[index];
  product.inCart=true;
  product.count=1;
  const price=product.price;
  product.total=price;
  
  this.setState(()=>{
    return {products:tempProducts,cart:[...this.state.cart,product]}
  },()=>this.addTotal());
};


//handle detail for image container
  handleDetail=(id)=>{
    const product=this.getItem(id);
    this.setState(()=>{
      return {detailsProduct:product}
    });
  };


  //openModal
openModal=id=>{
  const product=this.getItem(id);
  this.setState(()=>{
    return {modalProduct:product,modalOpen:true}
  })
};


//closed modal
closeModal=()=>{
  this.setState(()=>{
    return {modalOpen:false}
  })
};

//increment function
increment=(id)=>{
    let tempCart=[...this.state.cart];
    const selectedProduct=tempCart.find((item)=>item.id===id);
    const index=tempCart.indexOf(selectedProduct);
    const product=tempCart[index];

    product.count=product.count + 1;
    product.total=product.count * product.price;

    this.setState(()=>{
      return {
        cart:[...tempCart]
      }
    },()=>{
      this.addTotal();
    })
}


//decrement function
decrement=(id)=>{
  let tempCart=[...this.state.cart];
  const selectedProduct=tempCart.find((item)=>item.id===id);
  const index=tempCart.indexOf((selectedProduct));
  const product=tempCart[index];

  product.count=product.count - 1;

  if(product.count === 0){
    this.removeItem(id);
  }else{
    product.total=product.count * product.price;
    this.setState(()=>{
      return {
        cart:[...tempCart]
      }
    },()=>{
      this.addTotal();
    })

  }
}

//decrement function
removeItem=(id)=>{
  let tempProducts=[...this.state.products];
  let tempCart=[...this.state.cart];
  tempCart=tempCart.filter((item)=>item.id !==id);
  const index=tempProducts.indexOf(this.getItem(id));
  let removeProduct=tempProducts[index];
  removeProduct.inCart=false;
  removeProduct.total=0;
  removeProduct.count=0;

  this.setState(()=>{
    return {
      cart:[...tempCart],
      products:[...tempProducts]
    }
  },()=>{
    this.addTotal();
  })

  
}


//clearCart function
clearCart=()=>{
  this.setState(()=>{
    return {
      cart:[]
    };
  },()=>{
    this.setProducts();
    this.addTotal();
  });
};


//addTotal function
addTotal=()=>{
  let subTotal=0;
  //mapping throught the cart to add the item and subtotal
  this.state.cart.map(item =>(subTotal += item.total));
  //calculating the tax (subTotal * the tax percent)
  const tempTax=subTotal * 0.1;
  //setting the tax to decimal
  const tax=parseFloat(tempTax.toFixed(2));
  //getting the total of the price
  const total=subTotal + tax;

//updating the state

  this.setState(()=>{
    return {
      cartSubtotal:subTotal,
      cartTax:tax,
      cartTotal:total,
    }
  });
}




  render() {
   
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail: this.handleDetail,
        addToCart : this.addToCart,
        openModal:this.openModal,
        closeModal:this.closeModal,
        increment:this.increment,
        decrement:this.decrement,
        removeItem:this.removeItem,
        clearCart:this.clearCart,
       

       
      }}>


        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer=ProductContext.Consumer;
export {ProductConsumer,ProductProvider}
