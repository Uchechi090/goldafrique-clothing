import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shop/ShopPage";
import Header from "./components/header/Header";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/SignInAndSignUpPage";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/userActions";
import "./App.css";

class App extends Component {
  //not in use anymore because of the connect function
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null
  //   };
  // }

  //this is to prevent memory leaks in our app since onAuthStateChanged is an open communication between our app and firebase
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({ currentUser: user });
      //createUserProfileDocument(user);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          // this.setState(
          //   {
          //     currentUser: {
          //       id: snapshot.id,
          //       ...snapshot.data()
          //     }
          //   },
          setCurrentUser(
            {
              currentUser: {
                id: snapshot.id,
                ...snapshot.data()
              }
            },
            () => {
              //this console.log is here in case the setState is not done at the time
              console.log(this.state);
            }
          );
          //console.log(snapshot.data());
        });
      }
      //this.setState({ currentUser: userAuth }); //or null; means the same thing
      setCurrentUser(userAuth);

      //console.log(user);
    });
  }

  //closes the onAuthStateChanged open subcription when our app unmounts
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header
        //currentUser={this.state.currentUser}
        />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          {/* <Route path="/signin" component={SignInAndSignUpPage} /> */}
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  //dispatch is used to send an object to an action that needs it
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App); //connect takes to args: mapStateToProps & mapDispatchToProps
