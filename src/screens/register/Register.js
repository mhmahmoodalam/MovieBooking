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
        { name :'contact', label: "Contact No", required: true, type: 'number' },
    ]
    const fieldsErrorDefault = formInputFields.reduce ((prev,field) => {
        const { name } = field
        return { ...prev, [name] : false }
    },{}) 
    const [ formError, setFormError ] = React.useState(fieldsErrorDefault)

    const handleChange = () => {

    }

    const validate = () => {

    }

    const handleSubmit = () => {

    }
    
    return (
      <div className={classes.centerElement}>
            {
                formInputFields.map((field, index) => {
                   return (
                     <div className={classes.fieldContainer}>
                       <FormControl
                         fullWidth
                         key={`formfield_${index}_${field.label}`}
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
                           error={formError[field.name]}
                           onChange={handleChange}
                         />
                         {formError[field.name] && (
                           <Typography color="error">required</Typography>
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
                onClick={(e) => console.log('form submitted')}
                color="primary"  
                             
              >
                Login
              </Button>
      </div>
    );
}


export default withRouter(withStyles(style)(Register))