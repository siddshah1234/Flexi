import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MusicProvider } from '../../context/MusicContext'; // Adjust path if needed

const hiitLayout = () => {
  return (
    <MusicProvider>
      <>
        <Stack>
          <Stack.Screen
            name="amraphiit"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="emomhiit"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ladderhiit"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="tabatahiit"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="homehiit"
            options={{ headerShown: false }}
          />
        </Stack>
        <StatusBar backgroundColor="#161622" style="light" />
      </>
    </MusicProvider>
  );
};

export default hiitLayout;
