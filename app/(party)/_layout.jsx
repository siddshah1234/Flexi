// layout for different pages
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const partyLayout = () => {
    return (
        <>
          <Stack>
            <Stack.Screen
              name="partyHome"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="channelOne"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
          <StatusBar backgroundColor="#161622" style="light" />
        </>
      );
}
export default partyLayout;