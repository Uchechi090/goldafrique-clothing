import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //this is the actual localstorage on the browser; you can also import sessionstorage for use from the redux-persist libraries

import userReducer from "./user/userReducer";
import cartReducer from "./cart/cartReducer";
import directoryReducer from "./directory/directoryReducer";
import shopReducer from "./shop/shopReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"] //whitelist property is an array containing the string names of any of the reducers we want to persist
};

//What we exported before becomes the rootReducer because we have to wrap it with the persistReducer function

const rootReducer = combineReducers({
  user: userReducer, //this is already persisted using firebase so we can't add it to the persistConfig object
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

//Modified version of our rootReducer but with persistence capabilities
export default persistReducer(persistConfig, rootReducer);
