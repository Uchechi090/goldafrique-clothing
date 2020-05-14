// import SHOP_DATA from "./ShopData";

import { ShopActionTypes } from "./shopTypes";

const INITIAL_STATE = {
  // collections: SHOP_DATA,  because the collections are now saved in the firebase backend
  collections: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
