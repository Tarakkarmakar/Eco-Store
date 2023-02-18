import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const  PrivateRoute=({ children })=> {
  
const [isAuth,setIsAuth]=useState(false)
const data=[]


// useEffect(()=>{
// matchCustomer()
// },[])

   if(localStorage.getItem("email")){
    return children
   }else{
   return <Navigate to="/login" />
   }
  }