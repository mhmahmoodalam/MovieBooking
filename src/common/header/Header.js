import React from "react";
import './Header.css';
import Logo from '../../assets/logo.svg'
import Button from '@material-ui/core/Button';
import {  withRouter } from 'react-router-dom';
import * as TokenUtil from '../../utils/TokenUtil';

const Header = (props) => {
  const { isAuthenticated, location,history, setAuthenticated } = props
  const loginButtonText = isAuthenticated? 'Logout':'Login'
  const isOnMovieDetailPage =  location && location.pathname && location.pathname.includes('/movie/')
  React.useEffect(() => {
    if(location && location.pathname && location.pathname.includes('/movie/')){
        //make api call to check if current
    }
  },[location])

  const handleLoginLogout = (isAuthenticated) => {
    if (isAuthenticated) {
      TokenUtil.clearToken();
      setAuthenticated(false);
      history.push("/");
    }
  };
  return (
    <div className="header">
        <img className="header__logo" src={Logo} alt="Header Logo" />
        <div >
            {
                isOnMovieDetailPage &&
                <Button variant="contained" color="primary" className="header__button">
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