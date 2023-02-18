import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import {reducer as Allproducts} from "./Products/Reducer"
import {reducer as signUpReducer} from  "./SignUpReducer/reducer"
const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;



const rootReducer=combineReducers({Allproducts,signUpReducer})


const store = legacy_createStore(rootReducer,composeEnhancers (applyMiddleware(thunk)) );

export { store };