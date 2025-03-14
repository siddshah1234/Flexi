import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const resourcesTabLayout = () => {

  return (
    <>
      <Stack>
        <Stack.Screen
          name="HomeResources"
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="OutdoorResources"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="YogaResources"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default resourcesTabLayout;