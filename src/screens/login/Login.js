import React from "react";
import {  withRouter } from 'react-router-dom';
import { FormControl, Input, InputLabel, Button, withStyles, Typography } from "@material-ui/core";
import { generateFieldsErrorDefault, generateFormInitialValues } from "../../common/form/FormUtils";

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
},
loginButton: {
    margin: 'auto'
}
})

const Login = (props) => {
    const { classes } = props
    const formInputFields = [
      { name :'username', label: "Username", required: true, type: 'text' },
      { name :'password', label: "Password", required: true, type: 'password' }
  ]
  
  const [ formError, setFormError ] = React.useState(generateFieldsErrorDefault(formInputFields))
  const [ formData, setFormData ] = React.useState(generateFormInitialValues(formInputFields))
  const [ canSubmit, setCanSubmit ] = React.useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name] : value })
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
      console.log('cansubmit')
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


export default withRouter(withStyles(style)(Login))