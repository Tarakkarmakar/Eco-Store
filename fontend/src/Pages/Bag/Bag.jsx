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
  
      
      
     

  }, [isAuth]);
  const total_temp = product.reduce((total, item) => total + item.price, 0)
    if(total_temp<400){

      setDeliveryPrice(40)
      total_temp+=40
    }
console.log(total_temp)
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
       
        <div className={bag.first_div}>
          <ul>
            {product.map((ele)=>{
return(
  <li><h3>{ele.brand}....</h3> <h2>Rs.{ele.price}</h2></li>
)

            })}
           
            
          </ul>
        </div>
<div className={bag.sec_div}>
  <ul>
    <li><h3>GST %    &nbsp; &nbsp; &nbsp;</h3> <h2>RS.0</h2> </li>
    <li><h3>Delivery fee &nbsp; &nbsp;</h3> <h3>Rs.{deliveryPrice}</h3></li>

  </ul>

  
  </div>
<div className={bag.third_div}>
  <ul>
    <li>
      <h3>Total  &nbsp;</h3> <h2>RS.{total_temp}</h2>
    </li>
  </ul>
  
</div>


<div className={bag.last_div}>
<Button  colorScheme='pink' variant='solid'>
   Place order
  </Button>
</div>
      </div>
    </div>
  );
};

export default Bag;
