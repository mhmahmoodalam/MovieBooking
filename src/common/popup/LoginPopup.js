import React from "react";
import {  withRouter } from 'react-router-dom';
import Login from "../../screens/login/Login";
import Register from "../../screens/register/Register";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Modal from 'react-modal';


const LoginPopup = (props) => {
    const { showLoginModal, setAuthenticated, setShowLoginModal } = props
    return (
      <div>
        <Modal isOpen={showLoginModal} 
            appElement={document.getElementById('root')}
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => setShowLoginModal(false)}
            >
            <Login           
                setAuthenticated={setAuthenticated} 
                setShowLoginModal={setShowLoginModal}
            />
            <Register            
                setAuthenticated={setAuthenticated} 
                setShowLoginModal={setShowLoginModal}
            />
        </Modal>
      </div>
    );
}


export default withRouter(LoginPopup)