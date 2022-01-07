import React from "react";
import { FormControl, Input, InputLabel, Button, withStyles, Typography } from "@material-ui/core";
import { generateFieldsErrorDefault, generateFormInitialValues } from "../../common/form/FormUtils";

const style  =theme =>({
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
const Register = (props) => {
    const { classes } = props
    const formInputFields = [
        { name :'first_name', label: "First Name", required: true, type: 'text', autoFocus: true },
        { name :'last_name', label: "Last Name", required: true, type: 'text' , autoFocus: false},
        { name :'email_address', label: "Email", required: true, type: 'email', autoFocus: false},
        { name :'password', label: "Password", required: true, type: 'password', autoFocus: false },
        { name :'mobile_number', label: "Contact No", required: true, type: 'text', autoFocus: false },
    ]
    
    const [ formError, setFormError ] = React.useState(generateFieldsErrorDefault(formInputFields))
    const [ formData, setFormData ] = React.useState(generateFormInitialValues(formInputFields))
    const [ canSubmit, setCanSubmit ] = React.useState(false)
    const [ registerFailed, setRegisterFailed ] = React.useState(false)
    const [ registerSuccess, setRegisterSuccess ] = React.useState(false)

    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name] : value })
      if(registerFailed){
        setRegisterFailed(false)
      }
    }

    const validate = (values) => {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const regexPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
      const errors = Object.keys(values).reduce((prev,current) =>{
        const isValid = values[current] !==null && values[current] !=='' ? true : false
        return { ...prev, [current]: { isValid , errMsg: 'required' } }
      },{})

      if(errors.email_address.isValid && !regexEmail.test(values.email_address)){
        errors.email_address = { isValid: false, errMsg: "Invalid email format"}
      }
      if(errors.password.isValid && values.password.length < 4 ){
        errors.password = { isValid: false, errMsg: "Password length less than 4"}
      }
      if(errors.mobile_number.isValid && !regexPhone.test(values.mobile_number) ){
        errors.mobile_number = { isValid: false, errMsg: "Invalid contact no format"}
      }

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
        fetch(props.baseUrl + `signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
          } ,
          body : JSON.stringify(formData)
          
        })
          .then((response) => {
            if(response.status === 201 ){  
              setRegisterSuccess(true)  
            }else if( response.status >= 400 && response.status < 500 ){
              // won't show actual error as it can lead to guessing
              // error shows if username or password was wrong
              // show will just show invalid credentials
              setRegisterFailed(true)
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
            registerFailed && 
            <Typography color="error">Registration Failed!</Typography>
          }
          {
            registerSuccess && 
            <Typography color="primary">Registration Successful. Please Login!</Typography>
          }
          <br />
          <Button
                variant="contained"
                color="primary"  
                type="submit"             
              >
                Register
          </Button>
        </form>
      </div>
    );
}


export default withStyles(style)(Register)