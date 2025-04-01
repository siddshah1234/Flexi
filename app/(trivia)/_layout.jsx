import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const triviaLayout = () => {

  return (
    <>
      <Stack>
        <Stack.Screen
          name="triviahard"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="triviamedium"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="triviaeasy"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="triviahome"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="basic"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="partyGame"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
            name="jepordy"
            options={{ headerShown: false }}
          />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default triviaLayout;