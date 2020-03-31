import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger";

import roorReducer from "./rootReducer";

const middlewares = [logger];

const store = createStore(roorReducer, applyMiddleware(...middlewares))

export default store;