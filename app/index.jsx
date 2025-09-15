// this file is the main entry point of the app
// it displays a welcome screen with a logo, motivational text, and a button to join/sign in
// if the user is already logged in, they are redirected to the exercise screen

import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from '../constants';
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/globalprovider";
import { LogBox } from 'react-native';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Text strings must be rendered within a <Text> component',
]);

export default function App() {
  const { loading, isLogged } = useGlobalContext();

  // Redirect to the exercise screen if the user is logged in
  if (!loading && isLogged) return <Redirect href="/exercise" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          {/* App Logo */}
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          {/* Motivational Image */}
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          {/* Motivational Text */}
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Be Motivated in your Fitness with <Text className="text-secondary-200">Flexi</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-0.5 -right-6"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Join Us and Transform Your Fitness Journey!
          </Text>
          {/* Join Button */}
          <CustomButton
            title="Join us Now"
            handlePress={() => router.push('/signin')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}