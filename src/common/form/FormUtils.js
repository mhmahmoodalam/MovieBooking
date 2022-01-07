
export const generateFieldsErrorDefault =(formInputFields) => {
    return formInputFields.reduce ((prev,field) => {
        const { name } = field
        return { ...prev, [name] : { isValid: true, errMsg: 'required' }}
      },{})
}   

export  const generateFormInitialValues = (formInputFields) => {
  return formInputFields.reduce((prev, field) => {
    const { name } = field;
    return { ...prev, [name]: "" };
  }, {});
}