import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const  PrivateRoute=({ children })=> {
   const { isAuth, isError, isLoading } = useSelector((state) => {
      return {
        isAuth: state.signUpReducer.isAuth,
        isError: state.signUpReducer.isError,
        isLoading: state.signUpReducer.isLoading,
      };
    });


// useEffect(()=>{
// matchCustomer()
// },[]






   if(localStorage.getItem("email") && isAuth){
    return children
   }else{
   return <Navigate to="/login" />
   }
  }