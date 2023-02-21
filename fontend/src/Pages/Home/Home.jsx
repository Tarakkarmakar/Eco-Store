import Navbar from "../../components/Navbar.jsx/Navbar";
import csshome from "./Home.module.css";
import tree from "../../images/tree.png";
import { css } from "@chakra-ui/react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Skeleton, SkeletonCircle, SkeletonText, Box } from "@chakra-ui/react";
import { getProducts } from "../../Redux/Products/action";

const Home = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoading, prod } = useSelector((state) => {
    return {
      isLoading: state.Allproducts.isLoading,
      prod: state.Allproducts.products,
    };
  });

  const gotoKitchen = () => {
    navigate("/kitchen");
  };

  const gotoFashion = () => {
    navigate("/fashion");
  };
  const gotoPlants = () => {
    navigate("/plants");
  };
  const gotoExplore = () => {
    navigate("/explore");
  };
  const kitchen_product = [];
  const plants_product = [];
  const fashion_product = [];
  prod.map((ele) => {
    if (ele.category == "kitchen") {
      kitchen_product.push(ele);
    }
  });

  prod.map((ele) => {
    if (ele.category == "plants") {
      plants_product.push(ele);
    }
  });

  prod.map((ele) => {
    if (ele.category == "plants") {
      fashion_product.push(ele);
    }
  });
  useEffect(() => {}, []);

  // const prod = useSelector((store) => store.rootReducer.Allproducts.products);

  useEffect(() => {
    if (location || prod.length == 0) {
      const dataparams = {
        params: {
          _sort: "product-discountedPrice",
          _order: searchParams.get("sort"),
          brand: searchParams.getAll("category"),
        },
      };

      dispatch(getProducts(dataparams));
    }
  }, [searchParams, dispatch, location]);

  if (isLoading) {
    return (
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="25" />
        <SkeletonText mt="4" noOfLines={5} spacing="4" skeletonHeight="5" />
      </Box>
    );
  } else {
    return (
      <div className={csshome.home_main}>
        <div className={csshome.home_left_bar}>
          <div className={csshome.type_of_product} onClick={gotoPlants}>
            Plants
          </div>
          <div className={csshome.type_of_product} onClick={gotoFashion}>
            Fashion
          </div>
          <div className={csshome.type_of_product} onClick={gotoKitchen}>
            Kitchen
          </div>

          <div className={csshome.type_of_product} onClick={gotoExplore}>
            Explore
          </div>
        </div>

        <div className={csshome.home_right_main}>
          <div className={csshome.home_heading_box}>
            <h2>Shop Natural products with No chemicals</h2>

            {/* //for small screen */}
            <div className={csshome.typebox_small}>
              <div
                className={csshome.type_of_product_small}
                onClick={gotoPlants}
              >
                Plants
              </div>
              <div
                className={csshome.type_of_product_small}
                onClick={gotoFashion}
              >
                Fashion
              </div>
              <div
                className={csshome.type_of_product_small}
                onClick={gotoKitchen}
              >
                Kitchen
              </div>

              <div
                className={csshome.type_of_product_small}
                onClick={gotoExplore}
              >
                Explore
              </div>
            </div>
          </div>
          {/* ------- */}
          <br />
          <div className={csshome.home_right_slider}></div>

          <span className={csshome.Eco_kitchen}>Eco-Kitchen</span>
          <div className={csshome.Eco_kitchen_box}>
            {kitchen_product.map((ele, index) => {
              if (index < 5) {
                return <ProductCard ele={ele} key={ele._id} />;
              }
            })}
          </div>
          <br />
          <span className={csshome.Eco_kitchen}>Eco-Plants</span>
          <div className={csshome.Eco_kitchen_box}>
            {plants_product.map((ele, index) => {
              if (index < 5) {
                return <ProductCard ele={ele} key={ele._id} />;
              }
            })}
          </div>
          <br />
          <span className={csshome.Eco_kitchen}>Eco-fashion</span>
          <div className={csshome.Eco_kitchen_box}>
            {plants_product.map((ele, index) => {
              if (index < 5) {
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
