import './App.css'
import Checkout from './components/Checkout'
import Homepage from './components/Homepage'
import { Routes,Route } from 'react-router'
import Orders from './components/Orders'
import Tracking from './components/Tracking'
function App() {
  

  return (
    <>
    <Routes>
      <Route index element={<Homepage/>} ></Route>
      <Route path='checkout' element={<Checkout/>} ></Route>
      <Route path='orders' element={<Orders/>} ></Route>
      <Route path='tracking' element={<Tracking/>} ></Route>
    </Routes>
    </>
  )
}

export default App
