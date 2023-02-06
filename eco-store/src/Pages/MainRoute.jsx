import { Route, Routes } from "react-router-dom"
import Home from "./Home/Home"


const MainRoute = () => {
  return (
    <Routes>
      
  <Route path="/" element={<Home />}/>

    </Routes>
  )
}

export default MainRoute
