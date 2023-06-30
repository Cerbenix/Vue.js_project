export const passwordValidation = (password: string) => {
  
    if (!password) {
      return {
        isValid : false,
        errorMessage: 'Password is required'
      }
    }
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/;

    if (!passwordRegex.test(password)) {
      return {
        isValid : false,
        errorMessage: 'Password must contain lower and upper case letters and numbers'
      }
    }
  
    return {
      isValid : true,
      errorMessage: ''
    }
}