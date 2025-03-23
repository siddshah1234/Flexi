import { StyleSheet, Text, View } from 'react-native'
import { useEffect } from "react";
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font'
import { XpProvider } from '../app/(tabs)/XpContext';
import "../global.css";

import GlobalProvider from '../context/globalprovider';

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <XpProvider>
      <GlobalProvider>
        <Stack options={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(workouts)" options={{ headerShown: true, headerBackTitle: "Back", headerTransparent: true, headerTitle: "", headerTintColor: "#E55837" }} />
          <Stack.Screen name="(hiit)" options={{ headerShown: true, headerBackTitle: "Back", headerTransparent: true, headerTitle: "", headerTintColor: "#E55837" }} />
          <Stack.Screen name="(trivia)" options={{ headerShown: true, headerBackTitle: "Back", headerTransparent: true, headerTitle: "", headerTintColor: "#E55837" }} />
          <Stack.Screen name="(resourcesTab)" options={{ headerShown: true, headerBackTitle: "Back", headerTransparent: true, headerTitle: "Resources", headerTitleStyle: { color: 'white', fontSize: 25 }, headerTintColor: "#E55837" }} />
          <Stack.Screen name="(running2)" options={{ headerShown: true, headerBackTitle: "Back", headerTransparent: true, headerTitle: "" }} />
        </Stack>
      </GlobalProvider>
    </XpProvider>
  )
}

export default RootLayout