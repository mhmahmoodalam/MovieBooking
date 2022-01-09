import React from "react";
import { FormControl, Input, InputLabel, Button, withStyles, Typography } from "@material-ui/core"
import { generateFieldsErrorDefault, generateFormInitialValues } from "../../common/form/FormUtils"
import * as TokenUtil from '../../utils/TokenUtil'
import { login } from "../../utils/HttpConnector";

const style  = theme => ( {
  centerElement : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',        
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
},
fieldContainer: {
    marginBottom: theme.spacing.unit,
}
})

const Login = (props) => {
    const { classes } = props
    const formInputFields = [
      { name :'username', label: "Username", required: true, type: 'text', autoFocus: true },
      { name :'password', label: "Password", required: true, type: 'password', autoFocus: false }
  ]
  
  const [ formError, setFormError ] = React.useState(generateFieldsErrorDefault(formInputFields))
  const [ formData, setFormData ] = React.useState(generateFormInitialValues(formInputFields))
  const [ canSubmit, setCanSubmit ] = React.useState(false)
  const [ loginFailed, setLoginFailed ] = React.useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name] : value })
    if(loginFailed){
      setLoginFailed(false)
    }
  }

  const resetForm = () =>{
    setFormError(generateFieldsErrorDefault(formInputFields))
    setFormData(generateFormInitialValues(formInputFields))
    setCanSubmit(false)
  }

  const validate = (values) => {
    
    const errors = Object.keys(values).reduce((prev,current) =>{
      const isValid = values[current] !==null && values[current] !=='' ? true : false
      return { ...prev, [current]: { isValid , errMsg: 'required' } }
    },{})   

    setCanSubmit(Object.keys(errors).reduce((prev,key)=> {
      return prev && errors[key].isValid
    },true))

    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError(validate(formData))
    
  }
  
  React.useEffect(() => {
    if(canSubmit) {
      login(formData)
        .then((response) => {
          if(response.status === 200 ){

            props.setAuthenticated(true)
            props.setShowLoginModal(false)
            TokenUtil.setToken(response)

          }else if( response.status >= 400 && response.status < 500 ){
            // won't show actual error as it can lead to guessing
            // error shows if username or password was wrong
            // show will just show invalid credentials
            setLoginFailed(true)
            resetForm()
          }
        }).catch(( err) =>{
            console.log(err)
        })
    }

  },[formError])
    return (
      <div >
        <form onSubmit={handleSubmit} noValidate autoComplete="off" className={classes.centerElement}>
            {
                formInputFields.map((field, index) => {
                   return (
                     <div className={classes.fieldContainer} key={`formfield_${index}_${field.label}`}>
                       <FormControl
                         fullWidth                         
                       >
                         <InputLabel
                           required={field.required}
                           htmlFor={field.name}
                         >
                           {field.label}
                         </InputLabel>
                         <Input
                           type={field.type}
                           id={field.name}
                           name={field.name}
                           error={!formError[field.name].isValid}
                           onChange={handleChange}
                           value={formData[field.name]}
                           autoFocus={field.autoFocus}
                         />
                         {!formError[field.name].isValid && (
                           <Typography color="error">{formError[field.name].errMsg}</Typography>
                         )}
                       </FormControl>

                       <br />
                     </div>
                   );
                })              
                
            }
          <br />
          {
            loginFailed && 
            <Typography color="error">Invalid Credentials!</Typography>
          }
          <br />
          <Button
                variant="contained"
                color="primary"  
                type="submit"             
              >
                Login
          </Button>
        </form>
      </div>
    );
}


export default withStyles(style)(Login)