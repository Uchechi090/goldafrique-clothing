import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CartDropdown from "../cart-dropdown/CartDropdown";
import CartIcon from "../cart-icon/CartIcon";
import { selectCartHidden } from "../../redux/cart/cartSelectors";
import { selectCurrentUser } from "../../redux/user/userSelector";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
  //OptionDiv, - (case of minor differences: use - as="element-name" or as={component-name})
} from "./HeaderStyles";
// import "./header.styles.scss";

const Header = ({ currentUser, hidden }) => (
  // <div className="header">
  <HeaderContainer>
    {/* <Link className="logo-container" to="/"> */}
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    {/* </Link> */}
    {/* <div className="options"> */}
    <OptionsContainer>
      {/* <Link className="option" to="/shop"> */}
      <OptionLink to="/shop">SHOP</OptionLink>
      {/* </Link> */}
      {/* <Link className="option" to="/shop"> */}
      <OptionLink to="/shop">CONTACT</OptionLink>
      {/* </Link> */}
      {currentUser ? (
        // <div className="option" onClick={() => auth.signOut()}>
        // <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
        <OptionLink as="div" onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
      ) : (
        // </div>
        // <Link className="option" to="/signin">
        <OptionLink to="/signin">SIGN IN</OptionLink>
        // </Link>
      )}
      <CartIcon />
    </OptionsContainer>
    {/* </div> */}
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>

  // </div>
);

//using createStructuredSlectors to avoid repetition
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//   currentUser,
//   hidden
// });

export default connect(mapStateToProps)(Header);
