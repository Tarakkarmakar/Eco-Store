import Navbar from "../../components/Navbar.jsx/Navbar";
import csshome from "./Home.module.css";
import tree from "../../images/tree.png";
import { css } from "@chakra-ui/react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Skeleton, SkeletonCircle, SkeletonText,Box } from '@chakra-ui/react'
import { getProducts } from "../../Redux/Products/action";

const Home = () => {
  const { isLoading ,prod} = useSelector((state) => {
    return {
      isLoading: state.Allproducts.isLoading,
      prod :state.Allproducts.products
    };
  });

  
  // const prod = useSelector((store) => store.rootReducer.Allproducts.products);

  const dispatch = useDispatch();

  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (location || prod.length == 0) {
      const dataparams = {
        params: {
          _sort: "product-discountedPrice",
          _order: searchParams.get("sort"),
          "product-brand": searchParams.getAll("category"),
        },
      };

      dispatch(getProducts(dataparams));
    }
  }, [searchParams, dispatch, location]);
 
  if(isLoading){
    return (
      <Box padding='6' boxShadow='lg' bg='white'>
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='5' />
</Box>
    )
  }
else{

  return (
    <div className={csshome.home_main}>
      <div className={csshome.home_left_bar}>
       <div className={csshome.type_of_product}>Plants</div>
       <div className={csshome.type_of_product}>Fashion</div>
       <div className={csshome.type_of_product}>Kitchen</div>
       <div className={csshome.type_of_product}>Daily Products</div>
       <div className={csshome.type_of_product}>Explore</div>
      </div>



      <div className={csshome.home_right_main}>
        <div className={csshome.home_heading_box}>
          <h2 className={csshome.home_heading_slogan}>
            Shop Natural Products to Save our World
          </h2>
        </div>
        <div className={csshome.home_right_slider}></div>

  
          <span className={csshome.Eco_kitchen}>Eco-Kitchen</span>
          <div className={csshome.Eco_kitchen_box}>
            {prod.map((ele) => {
              if (ele.category == "kitchen") {
                return <ProductCard ele={ele} key={ele._id} />;
              }
            })}
          </div>

          <span className={csshome.Eco_kitchen}>Eco-Plants</span>
          <div className={csshome.Eco_kitchen_box}>
            {prod.map((ele) => {
              if (ele.category == "plants") {
                return <ProductCard ele={ele} key={ele._id} />;
              }
            })}
          </div>

          <span className={csshome.Eco_kitchen}>Eco-fashion</span>
          <div className={csshome.Eco_kitchen_box}>
            {prod.map((ele) => {
              if (ele.category == "fashion") {
                return <ProductCard ele={ele} key={ele._id} />;
              }
            })}
          </div>
       
      </div>
    </div>
  );
}
};

export default Home;
