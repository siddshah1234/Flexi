import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const workoutsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="AdvancedYoga"
          options={{
            headerShown: false, // Enable the header to show the back button
            headerTintColor: "#E55837", // Change back button color
          }}
        />
        <Stack.Screen
          name="BeginnerYoga"
          options={{
            headerShown: false, // Enable the header to show the back button
            headerTintColor: "#E55837", // Change back button color
          }}
        />
        <Stack.Screen
          name="YogaHomeScreen"
          options={{
            headerShown: false, // Enable the header to show the back button
            headerTintColor: "#E55837", // Change back button color
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default workoutsLayout;