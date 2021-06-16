import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import ShopPage from "./pages/shop/shop.component";
// import HatsPage from "./pages/hats/hatspage.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();
    this.state = { currentUser: null };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth=> {
      // this.setState({ currentUser: user });
      if(userAuth)
      {
        const useRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot =>{
           this.setState({
             currentUser:{
               id: snapShot.id,
               ...snapShot.data()
             }
           },
            ()=>console.log(this.state));
        });
      }
      this.setState({currentUser:userAuth})
      // createUserProfileDocument(user);
      // console.log(user);
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  };

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
        {/* <HomePage /> */}
      </div>
    );
  }
}

export default App;
