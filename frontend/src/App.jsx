import Login from "./components/Login"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Register from "./components/Register"

function App() {
  return (
   <BrowserRouter>
   <div className="row">
      <Navbar/>
    </div>
   <Routes>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
   </Routes>
   </BrowserRouter>
    
    
  )
}

export default App
