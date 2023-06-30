export const matchValidation = (former: string, latter: string) => {

    if (former !== latter) {
      return {
        isValid : false,
        errorMessage: 'Fields do not match'
      }
    }
  
    return {
      isValid : true,
      errorMessage: ''
    }
  }