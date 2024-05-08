import { applyMiddleware, combineReducers, createStore } from "redux";

import logger from "redux-logger"
import { categorysReducers } from "../reducers/categors"; 

const rootReducer = combineReducers({
  categors: categorysReducers,
})

const initialState = {};


const store = createStore(rootReducer, initialState, applyMiddleware(logger));


const currentState = store.getState();

console.log(currentState,123213213123);

export default store