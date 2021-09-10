import { useState } from 'react'

export const useInput = (validateValue) => {

  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  
  const valueIsValid = validateValue(enteredValue);
  const hasError = isTouched && !valueIsValid;

  const valueChangeHandler = e => setEnteredValue(e.target.value);
  const valueBlurHander = e => setIsTouched(true);

  const reset = () => {
      setEnteredValue("");
      setIsTouched(false)
  }
  
  return {
      value : enteredValue,
      isValid : valueIsValid,
      hasError,
      valueChangeHandler,
      valueBlurHander,
      reset 
  }
}