import { LOCAL_STORAGE_VALUE_TYPES } from "../constants/common/common-constants";

const key = "auth-storage";

export const getToken = () => {
  if (typeof window === 'undefined') {
    console.log('localStorage is not available on the server-side');
    return null;
  }
  try {
    const storedUser = localStorage.getItem(key);
    return storedUser ? JSON.parse(storedUser)?.state?.token : null;
  } catch (error) {
    console.log("Error getting the auth token", error);
    return null;
  }
};

export const storeUser = (userData) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(userData));
    } catch (error) {
      console.log("Error storing the user data", error);
      return null;
    }
  } else {
    console.log('localStorage is not available on the server-side');
    return null;
  }
};

export const getUser = () => {
  if (typeof window === 'undefined') {
    console.log('localStorage is not available on the server-side');
    return null;
  }
  try {
    const storedUser = localStorage.getItem(key);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.log("Error getting the auth token", error);
    return null;
  }
};

export const getSelectedCountryFromLocalStorage = () => {
  const country = localStorage.getItem(LOCAL_STORAGE_VALUE_TYPES.country);
  return country ? JSON.parse(country) : null;
};

export const getBasicSettingsFromLocalStorage = () => {
  const country = localStorage.getItem(LOCAL_STORAGE_VALUE_TYPES.websitesettings);
  return country ? JSON.parse(country) : null;
};

