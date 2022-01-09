import React from "react";
import './Header.css';
import Logo from '../../assets/logo.svg'
import Button from '@material-ui/core/Button';
import {  withRouter } from 'react-router-dom';
import * as TokenUtil from '../../utils/TokenUtil';

const Header = (props) => {
  const { isAuthenticated, location,history, setAuthenticated, setShowLoginModal } = props
  const loginButtonText = isAuthenticated? 'Logout':'Login'
  const isOnMovieDetailPage =  location && location.pathname && location.pathname.includes('/movie/')
  
  const handleLoginLogout = () => {
    if (isAuthenticated) {
      TokenUtil.clearToken();
      setAuthenticated(false);
      history.push("/");
    }else {
        console.log("Not logged in..please login first..")
        setShowLoginModal(true)
    }
  }

  const handleBookNow = (e) => {
    e.preventDefault()
    if(isAuthenticated){
      const id = location.pathname.split('/movie/')[1]
      history.push(`/bookshow/${id}`)
    }else {
      setShowLoginModal(true)
    }
  }
  return (
    <div className="header">
        <img className="header__logo" src={Logo} alt="Header Logo" />
        <div >
            {
                isOnMovieDetailPage &&
                <Button variant="contained" color="primary" className="header__button" onClick={handleBookNow}>
                    BOOK SHOW
                </Button>
            }
            <Button variant="contained" className="header__button" onClick={handleLoginLogout} >
            {loginButtonText}
            </Button>
        </div>
        
    </div>
  )
}

export default withRouter(Header)
