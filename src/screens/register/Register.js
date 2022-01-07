import React from "react";
import {  withRouter } from 'react-router-dom';
import { FormControl, Input, InputLabel, Button, withStyles, Typography } from "@material-ui/core";
import { ContactsOutlined, FormatStrikethroughSharp } from "@material-ui/icons";

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
    },
    loginButton: {
        margin: 'auto'
    }
})
const Register = (props) => {
    const { classes } = props
    const formInputFields = [
        { name :'firstname', label: "First Name", required: true, type: 'text' },
        { name :'lastname', label: "Last Name", required: true, type: 'text' },
        { name :'email', label: "Email", required: true, type: 'email' },
        { name :'password', label: "Password", required: true, type: 'password' },
        { name :'contact', label: "Contact No", required: true, type: 'text' },
    ]
    const fieldsErrorDefault = formInputFields.reduce ((prev,field) => {
      const { name } = field
      return { ...prev, [name] : { isValid: true, errMsg: 'required' }}
    },{})  

    const formInitialValues = formInputFields.reduce ((prev,field) => {
      const { name } = field
      return { ...prev, [name] : '' }
    },{})
    const [ formError, setFormError ] = React.useState(fieldsErrorDefault)

    const [ formData, setFormData ] = React.useState(formInitialValues)

    const [ canSubmit, setCanSubmit ] = React.useState(false)

    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name] : value })
    }

    const validate = (values) => {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const regexPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
      const errors = Object.keys(values).reduce((prev,current) =>{
        const isValid = values[current] !==null && values[current] !=='' ? true : false
        return { ...prev, [current]: { isValid , errMsg: 'required' } }
      },{})

      if(errors.email.isValid && !regexEmail.test(values.email)){
        errors.email = { isValid: false, errMsg: "Invalid email format"}
      }
      if(errors.password.isValid && values.password.length < 4 ){
        errors.password = { isValid: false, errMsg: "Password length less than 4"}
      }
      if(errors.contact.isValid && !regexPhone.test(values.contact) ){
        errors.contact = { isValid: false, errMsg: "Invalid contact no format"}
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
        // do post request here
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


export default withRouter(withStyles(style)(Register))