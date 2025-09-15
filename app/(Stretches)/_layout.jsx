// layout for different pages
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const stretchesLayout = () => {

  return (
    <>
      <Stack>
        <Stack.Screen
          name="RunningStretches"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WeightliftingStretches"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="stretcheshome"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default stretchesLayout;