import * as types from "./actionTypes";

import axios from "axios";

const getProductsRequest = () => {
  return {
    type: types.GET_PRODUCTS_REQUEST,
  };
};

const getProductsSuccess = (payload) => {
  return {
    type: types.GET_PRODUCTS_SUCCESS,
    payload,
  };
};

const getProductssError = () => {
  return {
    type: types.GET_PRODUCTS_FAILURE,
  };
};
const getProducts = (params) => (dispatch) => {

    //console.log(name)
    dispatch(getProductsRequest());
    return axios
      .get(`${process.env.REACT_APP_API}/customerproducts`,params)
      .then((r) => {
  
        console.log(r.data)
        dispatch(getProductsSuccess(r.data));
  
       
      })
      .catch((e) => {
        dispatch(getProductssError());
      });
    
  }

  export {getProducts}