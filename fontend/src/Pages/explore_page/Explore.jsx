
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import Filter from "../../components/filter/Filter"
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts, getProductsKitchen } from "../../Redux/Products/action";

import exp from "./explore.module.css"

const Explore= () => {
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
   

        dispatch(getProducts());
      
    }, [] );
  return (
    <div className={exp.main_container}>


     

        <div className={exp.Eco_kitchen_box }>
        {prod.map((ele) => {
            
                return <ProductCard ele={ele} key={ele._id} />;
              
            

        }
        )}
            </div>
   
      
    </div>
  )
}

export default Explore
