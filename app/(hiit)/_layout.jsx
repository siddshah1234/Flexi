import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const hiitLayout = () => {

  return (
    <>
      <Stack>
        <Stack.Screen
          name="amraphiit"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="emomhiit"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ladderhiit"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="tabatahiit"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="homehiit"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default hiitLayout;