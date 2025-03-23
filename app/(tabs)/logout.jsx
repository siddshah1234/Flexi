import { router } from "expo-router";
import { View } from "react-native";
import React, { useEffect } from 'react';
import { signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalprovider";

const Logout = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/signin");
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <View>

    </View>
  )
}

export default Logout