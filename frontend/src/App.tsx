import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./Components/Navbar"
import RegisterPage from "./pages/RegisterPage"

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/register" element={<RegisterPage/>} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
