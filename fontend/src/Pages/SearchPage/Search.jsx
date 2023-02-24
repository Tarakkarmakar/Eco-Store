
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getProducts } from "../../Redux/Products/action"
import serach from "./serach.module.css"
const Search = () => {
const dispatch=useDispatch()
    const {title}=useParams()

    useEffect(()=>{
useDispatch()

    },[title])
  return (
    <div className={serach.Eco_kitchen_box}>
      
    </div>
  )
}

export default Search
