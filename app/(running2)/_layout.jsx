import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const runningLayout = () => {

  return (
    <>
      <Stack>
        <Stack.Screen
          name="BeginnerRunSetup"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BeginnerRunSession"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MediumRun"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="running"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default runningLayout;