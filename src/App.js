import React from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import {connect} from "react-redux";

import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import ShopPage from "./pages/shop/shop.component";
// import HatsPage from "./pages/hats/hatspage.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import {setCurrentUser} from "./redux/user/user.actions";

class App extends React.Component {
 

  unsubscribeFromAuth = null;

  componentDidMount() {

    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // this.setState({ currentUser: user });
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }
      setCurrentUser( userAuth );
      // createUserProfileDocument(user);
      // console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route  exact path="/signin" render={()=>this.props.currentUser ? (<Redirect to='/' />):(<SignInAndSignUp />)} />
        </Switch>
        {/* <HomePage /> */}
      </div>
    );
  }
}


const mapStateToProps =({user})=>({
  currentUser:user.currentUser
});

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
