import { Route, Routes } from "react-router-dom";
import Explore from "./explore_page/Explore";
import Fashion from "./fashion/Fashion";
import Home from "./Home/Home";
import Kitchen from "./kitchen/Kitchen";
import Login from "./login/Login";
import Plants from "./plants/Plants";
import SignUp from "./Signup/SignUp";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/kitchen" element={<Kitchen />} />
      <Route path="/fashion" element={<Fashion />} />
      <Route path="plants" element={<Plants />} />
      <Route path="explore" element={<Explore />} />
    </Routes>
  );
};

export default MainRoute;
