import './App.css'
import Checkout from './components/Checkout'
import Homepage from './components/Homepage'
import { Routes,Route } from 'react-router'
function App() {
  

  return (
    <>
    <Routes>
      <Route index element={<Homepage/>} ></Route>
      <Route path='checkout' element={<Checkout/>} ></Route>
    </Routes>
    </>
  )
}

export default App
