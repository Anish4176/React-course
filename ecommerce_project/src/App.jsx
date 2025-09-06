import './App.css'
import Checkout from './components/Checkout'
import Homepage from './components/Homepage'
import { Routes,Route } from 'react-router'
import Orders from './components/Orders'
import Tracking from './components/Tracking'
import { useEffect } from 'react'
import { useState } from 'react'
function App() {
  const [cart, setcart] = useState([]);
  async function loadCart(){
     let response=await fetch('/api/cart-items?expand=product');
     let data=await response.json();
     setcart(data);
    }    
  useEffect(() => {
      loadCart();
  }, [])
  

  return (
    <>
    <Routes>
      <Route index element={<Homepage cart={cart} loadCart={loadCart} />} ></Route>
      <Route path='checkout' element={<Checkout cart={cart} />} ></Route>
      <Route path='orders' element={<Orders cart={cart}/>} ></Route>
      <Route path='tracking' element={<Tracking/>} ></Route>
    </Routes>
    </>
  )
}

export default App
