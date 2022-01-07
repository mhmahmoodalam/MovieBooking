import React from "react";
import {  withRouter } from 'react-router-dom';
import { FormControl, Input, InputLabel, Button, withStyles } from "@material-ui/core";

const style  =theme =>({
    centerElement : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    loginButton: {
        margin: 'auto'
    }
})
const Register = (props) => {
    const { classes } = props
    return (
      <div className={classes.centerElement}>
        <div className={classes.centerElement} >
          <FormControl fullWidth >
            <InputLabel required={true} htmlFor="firstname">
              First Name
            </InputLabel>
            <Input
              id="firstname"
              onChange={(e) => console.log(e.target.value)}
            />
          </FormControl>
          <br />
          <FormControl fullWidth >
            <InputLabel required={true} htmlFor="lastname">
            Last Name
            </InputLabel>
            <Input
              id="lastname"
              onChange={(e) => console.log(e.target.value)}
            />
          </FormControl>
          <br />
          <FormControl fullWidth  >
            <InputLabel required={true} htmlFor="email">
            Email
            </InputLabel>
            <Input
              id="email"
              type="email"
              onChange={(e) => console.log(e.target.value)}
            />
          </FormControl>
          <br />
          <FormControl fullWidth  >
            <InputLabel required={true} htmlFor="password">
            Password
            </InputLabel>
            <Input
              id="password"
              type="password"
              onChange={(e) => console.log(e.target.value)}
            />
          </FormControl>
          <br />
          <FormControl fullWidth  >
            <InputLabel required={true} htmlFor="phone">
            Contact No
            </InputLabel>
            <Input
              id="phone"
              type="phone"
              onChange={(e) => console.log(e.target.value)}
            />
          </FormControl>
          <br />
          <br />
          <Button
                variant="contained"
                onClick={(e) => console.log('form submitted')}
                color="primary"  
                             
              >
                Login
              </Button>
        </div>
      </div>
    );
}


export default withRouter(withStyles(style)(Register))