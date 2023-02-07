import { Route, Routes } from "react-router-dom"
import Home from "./Home/Home"
import Login from "./login/Login"
import SignUp from "./Signup/SignUp"


const MainRoute = () => {
  return (
    <Routes>
      
  <Route path="/" element={<Home />}/>
<Route path="/signup" element={<SignUp />} />
<Route path="/login" element={<Login />} />
     </Routes>
  )
}

export default MainRoute
