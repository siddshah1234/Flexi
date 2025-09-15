// this file creates and manages an xp context for the whole app
// it stores the current user's xp, updates it, and saves it to the database
// other parts of the app can use this context to give xp rewards and track progress

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAccount, getCurrentUser, updateUser } from '../../lib/appwrite';

// create a new context for xp
const XpContext = createContext();

// this component wraps around all other components that need access to xp data
export const XpProvider = ({ children }) => {
  const [xp, setXp] = useState(0); // the user's current xp
  const [user, setUser] = useState(null); // stores the user's name

  // calculate how full the xp bar should be
  const calculateFillPercentage = (xp) => {
    const maxXp = 100;
    return ((xp % maxXp) / maxXp) * 100;
  };

  // calculate the user's current level
  const calculateLevel = (xp) => {
    const maxXp = 100;
    return Math.floor(xp / maxXp) + 1;
  };

  // adds xp to the user and saves it to the database
  const addXp = async (amount) => {
    try {
      const userDocument = await getCurrentUser(); // get user info from database
      const newXp = xp + amount; // add the new xp
      setXp(newXp); // update it in the app
      userDocument.xp = newXp;
      await updateUser(userDocument.$id, { xp: newXp }); // save it in the database
      return newXp;
    } catch (error) {
      console.error('Error adding XP:', error);
    }
  };

  // fetches the user and xp data when app loads
  const fetchUserData = async () => {
    try {
      const account = await getAccount();
      const userDocument = await getCurrentUser();
      setUser(account.name); // set user name
      setXp(userDocument.xp); // set user xp
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // called after login to refresh user data
  const handleLogin = async () => {
    try {
      await fetchUserData();
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // clears user and xp when logging out
  const handleLogout = () => {
    setUser(null);
    setXp(0);
  };

  // fetch user data when component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  // return all values/functions to children that use this context
  return (
    <XpContext.Provider
      value={{
        xp,
        setXp,
        addXp,
        calculateFillPercentage,
        calculateLevel,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </XpContext.Provider>
  );
};

// custom hook to use xp context in other components
export const useXp = () => useContext(XpContext);

/*

use this solution to fix the error we were encountering earlier:

export const useXp = () => useContext(XpContext);

export default function EmptyXpScreen() {
  return null;
}


*/