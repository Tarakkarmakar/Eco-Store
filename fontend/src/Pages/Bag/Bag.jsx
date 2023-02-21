import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import ProductCard from "../../components/ProductCard/ProductCard"
import { getUserBagProduct } from "../../Redux/Products/action"
import bag from "./bag.module.css"

const Bag = () => {

  const [userToken,setUserToken]=useState(localStorage.getItem("email"))
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { isAuth, isError,} = useSelector((state) => {
    return {
      isAuth: state.signUpReducer.isAuth,
      isError: state.signUpReducer.isError,
      isLoading: state.signUpReducer.isLoading,
    };
  });
  useEffect(()=>{
    if(isAuth){
setUserToken(localStorage.getItem("email"))
dispatch(getUserBagProduct(userToken))
  }
  else{
    navigate("/login")
  }
  },[])


  const { isLoading ,product} = useSelector((state) => {
    return {
      isLoading: state.Allproducts.isLoading,
      product :state.Allproducts.products
    };
  });

  console.log(product)
  return (
    <div className={bag.main_div}>
     <div className={bag.left_product_list}>

     {product.length>0 ? product.map((ele) => {
          
          return <ProductCard ele={ele} key={ele._id} />;
        
      

  })
 : <h1>You not added any product !</h1>

}

     </div>
     <div className={bag.right_total_product}>Right</div>
      
    </div>
  )
}

export default Bag
