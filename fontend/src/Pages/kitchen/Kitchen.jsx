import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import Filter from "../../components/filter/Filter"
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts, getProductsKitchen } from "../../Redux/Products/action";

import kitchen from "./kitchen.module.css"

const Kitchen = () => {
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
        dispatch(getProductsKitchen(dataparams));
      }
    }, [searchParams, dispatch, location]);
  return (
    <div className={kitchen.main_container}>


        <div className={kitchen.left_filter_box}><Filter one="beco" two="sanhya dale" three="wood nature" /></div>

        <div className={kitchen.right_product_box}>
        {prod.map((ele) => {
            
                return <ProductCard ele={ele} key={ele._id} />;
              
            

        }
        )}
            </div>
   
      
    </div>
  )
}

export default Kitchen
