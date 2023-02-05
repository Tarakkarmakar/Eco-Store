import { applyMiddleware, compose, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import {reducer} from "./Products/Reducer"

const store = legacy_createStore(reducer,applyMiddleware(thunk));

export { store };