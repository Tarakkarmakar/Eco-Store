import * as types from "./actionTypes";


// NOTE: DO NOT MODIFY the intial state structure in this file.
const initialState = {
  products:[],
  isLoading: false,
  isError: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type){
    case types.GET_PRODUCTS_REQUEST:
    
      return {...state, isLoading: true}
    case types.GET_PRODUCTS_FAILURE:
      return {...state, isLoading:false, isError: true}

    case types.GET_PRODUCTS_SUCCESS: 
    console.log(payload)
      return { ...state, isLoading: false, products: payload}
    default:
      return state
  }
  //write the logic to handle, get task, update task, add task, and delete task
  // return state;
};

export { reducer };