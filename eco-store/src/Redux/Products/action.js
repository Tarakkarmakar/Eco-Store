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
export { getProducts, getProductsKitchen,getProductsFashion,getProductsPlants };
