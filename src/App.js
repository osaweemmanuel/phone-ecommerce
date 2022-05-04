import {React} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Modal from './components/Modal'

import ProductList from './components/ProductList.js';
import Details from './components/Details.js'
import Default from './components/Default.js'
import {Cart} from './components/cart'

import './App.css';

function App() {
  return (
      <BrowserRouter>
      <Navbar/>
          <Routes>
               <Route path="/" element={<ProductList />} />
               <Route path='/details' element={<Details/>}/>
               <Route path='/cart' element={<Cart/>}/>
               <Route path='*' element={<Default/>}/>
          </Routes>
          <Modal/>
      </BrowserRouter>

  );
}

export default App;
