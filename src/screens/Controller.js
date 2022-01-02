import React, { useState } from "react";
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import Header from '../common/header/Header'
import { BrowserRouter as Router,  Route } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";
import * as TokenUtil from '../utils/TokenUtil'
import LoginPopup from "../common/popup/LoginPopup";

const Controller = (props) => {
  const baseUrl = "/api/v1/";
  TokenUtil.setToken("Bearer 9348750345--0dfoi08345o3pjtpoer");
  const [ isAuthenticated, setAuthenticated ] = useState(TokenUtil.isAuthenticated())  
  const [ showLoginModal, setShowLoginModal ] = useState(!TokenUtil.isAuthenticated())  
  console.log("controller called",props, isAuthenticated, showLoginModal)

  return (
    <Router>
      <div className="main-container">
        <Header isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated}/>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/movie/:id"
          render={(props) => <Details {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/bookshow/:id"
          render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/confirm/:id"
          render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
        />
        <LoginPopup showLoginModal={showLoginModal} />
      </div>
    </Router>
  );
};


export default Controller;
