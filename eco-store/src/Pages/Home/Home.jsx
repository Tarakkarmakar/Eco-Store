import Navbar from "../../components/Navbar.jsx/Navbar";
import csshome from "./Home.module.css";
import tree from "../../images/tree.png";
import { css } from "@chakra-ui/react";
const Home = () => {
  return (
    <div className={csshome.home_main}>
      <div className={csshome.home_left_bar}></div>
      <div className={csshome.home_right_main}>
        <div className={csshome.home_heading_box}><h2 className={csshome.home_heading_slogan}>
          Shop Natural  Products to Save our World</h2></div>
        <div
      className={csshome.home_right_slider}>



        </div>

        <div className={csshome.shop_kitchen_box}>
          <h2>Shop kitchen </h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
