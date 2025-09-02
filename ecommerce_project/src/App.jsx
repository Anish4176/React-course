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
  useEffect(() => {
    fetch('/api/cart-items')
    .then((response)=>{
        response.json().then((data)=>{
          setcart(data);
        })
    })
  }, [])
  

  return (
    <>
    <Routes>
      <Route index element={<Homepage cart={cart}/>} ></Route>
      <Route path='checkout' element={<Checkout cart={cart} />} ></Route>
      <Route path='orders' element={<Orders/>} ></Route>
      <Route path='tracking' element={<Tracking/>} ></Route>
    </Routes>
    </>
  )
}

export default App
