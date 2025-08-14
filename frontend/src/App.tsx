import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./Components/Navbar"
import RegisterPage from "./pages/RegisterPage"
import AuthProvider from "./Context/AuthProvider"
import LoginPage from "./pages/LoginPage"
import CartPage from "./pages/CartPage"

function App() {

  return (
    // this use to access auth in all router 
    <AuthProvider>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/register" element={<RegisterPage/>} ></Route>
          <Route path="/login" element={<LoginPage/>} ></Route>
          <Route path="/cart" element={<CartPage/>} ></Route>


        </Routes>
      </BrowserRouter>

    </AuthProvider>
  )
}

export default App
