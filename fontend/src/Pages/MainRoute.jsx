import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../App_actions/PrivateRoute";
import Bag from "./Bag/Bag";
import Explore from "./explore_page/Explore";
import Fashion from "./fashion/Fashion";
import Home from "./Home/Home";
import Kitchen from "./kitchen/Kitchen";
import Login from "./login/Login";

import Partner from "./Partner/Partner";
import Plants from "./plants/Plants";
import Search from "./SearchPage/Search";
import SignUp from "./Signup/SignUp";
import SinglePage from "./singleProduct/singlePage";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/kitchen" element={<Kitchen />} />
      <Route path="/fashion" element={<Fashion />} />
      <Route path="/plants" element={<Plants />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/singlePage/:id" element={<SinglePage />} />
      <Route path="/serach/:title" element={<Search />} />
      <Route
        path="/bag"
        element={
          <PrivateRoute>
            <Bag />
          </PrivateRoute>
        }
      />
      <Route path="/partner" element={<Partner />} />
    </Routes>
  );
};

export default MainRoute;
