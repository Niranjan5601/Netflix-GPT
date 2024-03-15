

export const checkValidData = (name,email, password,isSignInForm) => {
  
  if(!isSignInForm){
    if(name.length === 0){
      return "Please Enter Your Name";
    }
    else if(name.length <= 2 ){
      return "Please Enter a valid name"
    }
  }
  
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if(!isEmailValid) return "Email is not valid"
    if(!isPasswordValid) return "Password is not valid"

    return null;
};
