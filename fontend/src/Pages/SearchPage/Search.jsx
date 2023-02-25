
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import ProductCard from "../../components/ProductCard/ProductCard"
import { getDataBytitle, getProducts } from "../../Redux/Products/action"
import serach from "./serach.module.css"
const Search = () => {
const dispatch=useDispatch()
const navigate=useNavigate()
    const {title}=useParams()
    const { isLoading ,prod} = useSelector((state) => {
      return {
        isLoading: state.Allproducts.isLoading,
        prod :state.Allproducts.products
      };
    });

 
    useEffect(()=>{
      if(title){
dispatch(getDataBytitle(title))
      }
   
    },[title,prod])
  return (
    <div className={serach.Eco_kitchen_box}>
  {prod.length>0 && prod.map((ele) => {
          return <ProductCard ele={ele} key={ele._id} />;
        })}
    </div>
  )
}

export default Search
