import React, { useState } from "react";
import {  withRouter } from 'react-router-dom';
import Login from "../../screens/login/Login";
import Register from "../../screens/register/Register";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Modal from 'react-modal';
import Typography from '@material-ui/core/Typography';

const  TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


const LoginPopup = (props) => {
    const { showLoginModal, setAuthenticated, setShowLoginModal } = props
    const [ tabValue, setTabValue  ] = useState(0)

    const handleTabChange = (event, value) => setTabValue(value)
    return (
      <div>
        <Modal
          isOpen={showLoginModal}
          appElement={document.getElementById("root")}
          shouldCloseOnOverlayClick={true}
          onRequestClose={() => setShowLoginModal(false)}
        >
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          {tabValue === 0 && (
            <TabContainer>
              <Login
                setAuthenticated={setAuthenticated}
                setShowLoginModal={setShowLoginModal}
              />
            </TabContainer>
          )}
          {tabValue === 1 && (
            <TabContainer>
              <Register
                setAuthenticated={setAuthenticated}
                setShowLoginModal={setShowLoginModal}
              />
            </TabContainer>
          )}
        </Modal>
      </div>
    );
}


export default withRouter(LoginPopup)