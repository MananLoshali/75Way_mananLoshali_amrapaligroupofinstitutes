import validator from "validator";

export const isPassword = (password:string)=>{
   if(password.length > 8){
    return true
   }
   return false
}

export const isEmail = (email:string)=>{
    return validator.isEmail(email);
}