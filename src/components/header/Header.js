import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {createStructuredSelector} from "reselect"

import CartDropdown from "../cart-dropdown/CartDropdown";
import CartIcon from "../cart-icon/CartIcon";
import {selectCartHidden} from "../../redux/cart/cartSelectors"
import {selectCurrentUser} from "../../redux/user/userSelector"
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import "./header.styles.scss";

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

//using createStructuredSlectors to avoid repetition
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//   currentUser,
//   hidden
// });

export default connect(mapStateToProps)(Header);
