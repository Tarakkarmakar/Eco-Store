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


  dispatch(getProductsRequest());
  return axios
    .get(`${process.env.REACT_APP_API}/customerproducts`, params)
    .then((r) => {
      console.log(r.data);
      dispatch(getProductsSuccess(r.data));
    })
    .catch((e) => {
      dispatch(getProductssError());
    });
};

const getProductsKitchen = (params) => (dispatch) => {
  dispatch(getProductsRequest());
  return axios
    .get(`${process.env.REACT_APP_API}/customerproducts/kitchen`, params)
    .then((r) => {
      console.log(r.data);
      dispatch(getProductsSuccess(r.data));
    })
    .catch((e) => {
      dispatch(getProductssError());
    });
};
const getProductsFashion = (params) => (dispatch) => {
  dispatch(getProductsRequest());
  return axios
    .get(`${process.env.REACT_APP_API}/customerproducts/fashion`, params)
    .then((r) => {
      console.log(r.data);
      dispatch(getProductsSuccess(r.data));
    })
    .catch((e) => {
      dispatch(getProductssError());
    });
};
const getProductsPlants = (params) => (dispatch) => {
  dispatch(getProductsRequest());
  return axios
    .get(`${process.env.REACT_APP_API}/customerproducts/plants`, params)
    .then((r) => {
      console.log(r.data);
      dispatch(getProductsSuccess(r.data));
    })
    .catch((e) => {
      dispatch(getProductssError());
    });
};


const getSingleData = (id) =>(dispatch)=> {
  dispatch(getProductsRequest());
  axios
    .get(`${process.env.REACT_APP_API}/customerproducts/single/${id}`)
    .then((r) => {
      dispatch(getProductsSuccess(r.data));
    }).catch((e) => {
      dispatch(getProductssError());
      console.log("error product");
    });
};

const getUserBagProduct=(email)=>(dispatch)=>{

  dispatch(getProductsRequest());
  axios
    .get(`${process.env.REACT_APP_API}/cart`,{
      headers:{"Authorization":email}
    })
    .then((r) => {
      dispatch(getProductsSuccess(r.data));
    }).catch((e) => {
      dispatch(getProductssError());
      console.log("error product");
    });
}
const getDataBytitle = (search) =>(dispatch)=> {
  dispatch(getProductsRequest());
  axios
    .get(`${process.env.REACT_APP_API}/customerproducts?search=${search}`)
    .then((r) => {
      dispatch(getProductsSuccess(r.data));
    }).catch((e) => {
      dispatch(getProductssError());
      console.log("error product");
    });
};





export { getProducts,getDataBytitle ,getSingleData,getUserBagProduct , getProductsKitchen,getProductsFashion,getProductsPlants };
