import React from "react";
import "./Header.css";
import Logo from "../../assets/logo.svg";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import * as TokenUtil from "../../utils/TokenUtil";

const Header = (props) => {
  const {
    isAuthenticated,
    location,
    history,
    setAuthenticated,
    setShowLoginModal,
  } = props;
  const isOnMovieDetailPage =
    location && location.pathname && location.pathname.includes("/movie/");

  const handleLogout = () => {
    TokenUtil.clearToken();
    setAuthenticated(false);
    history.push("/");
  };
  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      const id = location.pathname.split("/movie/")[1];
      history.push(`/bookshow/${id}`);
    } else {
      setShowLoginModal(true);
    }
  };
  return (
    <div className="header">
      <img className="header__logo" src={Logo} alt="Header Logo" />
      <div>
        {isOnMovieDetailPage && (
          <Button
            variant="contained"
            color="primary"
            className="header__button"
            onClick={handleBookNow}
          >
            BOOK SHOW
          </Button>
        )}
        {!isAuthenticated && (
          <Button
            variant="contained"
            className="header__button"
            onClick={handleLogin}
          >
            Login
          </Button>
        )}
        {isAuthenticated && (
          <Button
            variant="contained"
            className="header__button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
