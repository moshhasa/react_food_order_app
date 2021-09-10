import { useState, useEffect } from "react";
import { getStorageValue, setStorageValue } from "../helper/LocalStorageHelper";

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(getStorageValue(key, defaultValue));

  useEffect(() => {
    setStorageValue(key, value);
  }, [key, value]);

  return { value, setValue };
};
