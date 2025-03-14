import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from '../constants'
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/globalprovider";

export default function App() {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/exercise"/>;
  


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">Be Motivated in your Fitness with  <Text className="text-secondary-200">Flexi</Text></Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-0.5 -right-6"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Join Us and Transform Your Fitness Journey!</Text>
          <CustomButton
            title="Join us Now"
            handlePress={() => router.push('/signin')}
            containerStyles="w-full mt-7"
          />
        </View>

        



       





      </ScrollView>
      <StatusBar backgroundColor="#161622" style='light' />
    </SafeAreaView>
  );
}