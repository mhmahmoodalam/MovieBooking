import React, { useState } from "react";
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import Header from '../common/header/Header'
import { BrowserRouter as Router,  Route } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";
import LoginPopup from "../common/popup/LoginPopup";
import * as TokenUtil from '../utils/TokenUtil'

const Controller = (props) => {
  
  /**  based on token values it is decided if logged in or not **/
  const [ isAuthenticated, setAuthenticated ] = useState(TokenUtil.isAuthenticated())  
  const [ showLoginModal, setShowLoginModal ] = useState(false) 

  return (
    <Router>
      <div className="main-container">
        <Header isAuthenticated={isAuthenticated} 
          setAuthenticated={setAuthenticated} 
          setShowLoginModal={setShowLoginModal}
        />
        <Route
          exact
          path="/"
          render={(props) => <Home {...props}  />}
        />
        <Route
          path="/movie/:id"
          render={(props) => <Details {...props}  />}
        />
        <Route
          path="/bookshow/:id"
          render={(props) => <BookShow {...props}  />}
        />
        <Route
          path="/confirm/:id"
          render={(props) => <Confirmation {...props} />}
        />
        <LoginPopup 
          showLoginModal={showLoginModal}           
          setAuthenticated={setAuthenticated} 
          setShowLoginModal={setShowLoginModal}
          {...props} 
        />
      </div>
    </Router>
  );
};


export default Controller;
