// this file automatically logs the user out when they open the logout screen
// it calls the signOut function from appwrite to clear the session
// it resets the global user state to null and sets isLogged to false
// after logging out, it redirects the user to the signin screen

import { router } from "expo-router";
import { View } from "react-native";
import React, { useEffect } from 'react';
import { signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalprovider";

const Logout = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  // this function signs the user out and redirects to the signin page
  const logout = async () => {
    await signOut(); // log out from appwrite
    setUser(null); // clear user data in global context
    setIsLogged(false); // mark user as logged out
    router.replace("/signin"); // go to signin page
  };

  // run the logout function when this screen loads
  useEffect(() => {
    logout();
  }, []);

  return (
    <View>
      {/* this view is empty because logout happens automatically on mount */}
    </View>
  );
};

export default Logout;
