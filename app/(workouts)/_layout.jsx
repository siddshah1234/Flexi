import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const workoutsLayout = () => {

  return (
    <>
      <Stack>
        <Stack.Screen
          name="AdvancedYoga"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BeginnerYoga"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="YogaHomeScreen"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default workoutsLayout;