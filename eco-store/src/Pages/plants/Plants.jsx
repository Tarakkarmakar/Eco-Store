import plants from "./plants.module.css"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import Filter from "../../components/filter/Filter"
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts, getProductsKitchen, getProductsPlants } from "../../Redux/Products/action";


const Plants = () => {
  const dispatch = useDispatch();
    const { isLoading ,prod} = useSelector((state) => {
        return {
          isLoading: state.Allproducts.isLoading,
          prod :state.Allproducts.products
        };
      });
   

    const location = useLocation();
    const [searchParams] = useSearchParams();
  
    useEffect(() => {
      if (location || prod.length == 0) {
        const dataparams = {
          params: {
            sort: "price",
            order: searchParams.getAll("order"),
            brand: searchParams.get("brand"),
            off:searchParams.get("discount")
          },
        };
  console.log(dataparams)
        dispatch(getProductsPlants(dataparams));
      }
    }, [searchParams, dispatch, location]);
  return (
    <div className={plants.main_container}>


        <div className={plants.left_filter_box}><Filter one="" two="" three="" /></div>

        <div className={plants.right_product_box}>
        {prod.map((ele) => {
            
                return <ProductCard ele={ele} key={ele._id} />;
              
            

        }
        )}
            </div>
   
      
    </div>
  )
}

export default Plants
