import React from "react";
import {  withRouter } from 'react-router-dom';
import Login from "../../screens/login/Login";
import Register from "../../screens/register/Register";

const LoginPopup = (props) => {
    return (
        <div>
            {props.showLoginModal &&
                <div><Login /><Register /></div>
            }
        </div>
    )
}


export default withRouter(LoginPopup)