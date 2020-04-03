//Memoization of selector codes using the reselect library - to optimize and
//avoid rerendering of the app
import { createSelector } from "reselect";

//Input Selector - a function that gets the whole state and returns a piece of it
const selectCart = state => state.cart;

//CreateSelector uses input selectors
export const selectCartItems = createSelector(
  //takes two args
  [selectCart], //an array of values of input selectors in an orderly way
  cart => cart.cartItems //a function to return a specific part
);

//CreateSelectors can also use other createselector functions as args
export const selectCartItemsCount = createSelector(
  [selectCartItems], //here
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);
