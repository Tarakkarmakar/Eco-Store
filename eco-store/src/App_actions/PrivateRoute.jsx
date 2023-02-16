import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const  PrivateRoute=({ children })=> {
  
const [isAuth,setIsAuth]=useState(false)
const data=[]

// const matchCustomer=()=>{
//     const email =JSON.parse( localStorage.getItem("email"))
//     axios
//     .get(`${process.env.REACT_APP_API}/customerUser/${email}`)
//     .then((r) => {
//         if(r.data!=="invalid"){
//       localStorage.setItem("userName",JSON.stringify(r.data.name))
//       console.log(r.data)
//       data.push(r.data)
//       setIsAuth(true)
//         }
//     }).catch((e) => {
// console.log(email)
//       console.log("error product");
//     });
// }
// useEffect(()=>{
// matchCustomer()
// },[])

   if(localStorage.getItem("email")){
    return children
   }else{
   return <Navigate to="/login" />
   }
  }