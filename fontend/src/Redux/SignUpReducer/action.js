import axios from "axios";
import {
  CREATE_FAILURE,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
} from "./actionTypes";

export const SignUpFunction = (data) => (dispatch) => {
  dispatch({ type: CREATE_REQUEST });
  axios
    .post(`${process.env.REACT_APP_API}/customerUser/register`, data)
    .then((response) => {
      dispatch({ type: CREATE_SUCCESS, payload: response.data });
      console.log(response);
    })
    .catch((e) => {
      dispatch({ type: CREATE_FAILURE });
      console.log(e);
    });
};
export const Loginfunction = (data) => (dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });
  axios
    .post(`${process.env.REACT_APP_API}/customerUser/login`, data)
    .then((response) => {
      if (response.data == "wrong crediential") {
        dispatch({ type: SIGNIN_FAILURE });
      } else if (response.data.email || response.data == "login successfull") {
        dispatch({ type: SIGNIN_SUCCESS, payload: response.data.email });
        localStorage.setItem("email", null);
        localStorage.setItem("email", JSON.stringify(response.data.email));
      }else 
      console.log(response);
    })
    .catch((e) => {
      dispatch({ type: SIGNIN_FAILURE });
      // console.log(e);
    });
};

export const AutoSignIn = (email) => (dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });
  axios
    .get(`${process.env.REACT_APP_API}/customerUser/${email}`)
    .then((r) => {
      if (r.data._id) {
        localStorage.setItem("userDetails", JSON.stringify(r.data));
        dispatch({ type: SIGNIN_SUCCESS, payload: r.data });
        console.log(r.data);
      } else {
        dispatch({ type: SIGNIN_FAILURE });
        console.log(r.data);
      }
      
    })
    .catch((e) => {
     
      dispatch({ type: SIGNIN_FAILURE });
      console.log("error Login");
    });
};
