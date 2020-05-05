import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import roorReducer from "./rootReducer";

const middlewares = [logger];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(roorReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store); //persisted version of our store

export default { store, persistor };
