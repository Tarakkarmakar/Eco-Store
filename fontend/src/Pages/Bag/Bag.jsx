import { Button, others } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getUserBagProduct } from "../../Redux/Products/action";
import bag from "./bag.module.css";

const Bag = () => {
  const [userToken, setUserToken] = useState(localStorage.getItem("email"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalPrice,setTotalPrice]=useState(0)
const [deliveryPrice,setDeliveryPrice]=useState(0)
const location=useLocation()
  const { isLoading, product } = useSelector((state) => {
    return {
      isLoading: state.Allproducts.isLoading,
      product: state.Allproducts.products,
    };
  });
  const { isAuth, isError } = useSelector((state) => {
    return {
      isAuth: state.signUpReducer.isAuth,
      isError: state.signUpReducer.isError,
      isLoading: state.signUpReducer.isLoading,
    };
  });
 
  useEffect(() => {
 
      setUserToken(localStorage.getItem("email"));
      dispatch(getUserBagProduct(userToken));
    

      const total_temp = product.reduce((total, item) => total + item.price, 0)
      if(total_temp<400){
      setDeliveryPrice(40)
      
      setTotalPrice(total_temp+deliveryPrice)
      }else{
        setTotalPrice(0)
        setTotalPrice(total_temp)
      }

  }, []);

console.log(location)
  return (
    <div className={bag.main_div}>
      <div className={bag.left_product_list}>
        {product.length > 0 ? (
          product.map((ele) => {
            return <ProductCard ele={ele} key={ele._id} />;
          })
        ) : (
          <h1>You have not added any product !</h1>
        )}
      </div>
      <div className={bag.right_total_product}>
       
        <div>
          <ul>
            {product.map((ele)=>{
return(
  <li><h3>{ele.brand}....</h3> <h3>{ele.price}</h3></li>
)

            })}
           
            
          </ul>
        </div>
<div>
  <ul>
    <li><h3>GST %</h3> <h3>RS.0</h3> </li>
    <li><h3>Delivery fee</h3> <h3>{deliveryPrice}</h3></li>

  </ul>

  
  </div>
<div>
  <ul>
    <li>
      <h1>Total </h1> <h2>{totalPrice}</h2>
    </li>
  </ul>
  
</div>


<div>
<Button  colorScheme='pink' variant='solid'>
   Place order
  </Button>
</div>
      </div>
    </div>
  );
};

export default Bag;
