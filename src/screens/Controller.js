import React, { useState } from "react";
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import Header from '../common/header/Header'
import { BrowserRouter as Router,  Route } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";
import LoginPopup from "../common/popup/LoginPopup";

const Controller = (props) => {
  const baseUrl = "/api/v1/";
  const [ isAuthenticated, setAuthenticated ] = useState(false)  
  const [ showLoginModal, setShowLoginModal ] = useState(true)  
  console.log("controller called",props, isAuthenticated, showLoginModal)

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
        <LoginPopup 
          showLoginModal={showLoginModal}           
          setAuthenticated={setAuthenticated} 
          setShowLoginModal={setShowLoginModal}
          {...props} 
          baseUrl={baseUrl}
        />
      </div>
    </Router>
  );
};


export default Controller;
