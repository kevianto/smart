import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./pages/SignIn"
import Signup from "./pages/Signup"
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  

  return (
    <div>
     <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Signin />} />
                <Route path="/home" element={<Home/>} />
                <Route path="/admin" element={<Admin/>} />
                
            </Routes>    
    </Router>
    </div>
  )
}

export default App
