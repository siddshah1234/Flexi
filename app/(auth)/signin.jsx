// this screen lets the user sign in with their email and password
// it uses a form and sends the data to appwrite to log in
// if the login works, it saves the user and sends them to the exercise screen
// if not, it shows an error

import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from "../../context/globalprovider";
import { getUserProfile } from '../../lib/appwrite';
import { useFocusEffect } from '@react-navigation/native';


const SignIn = () => {
  // get global functions to set user info
  const { setUser, setIsLogged } = useGlobalContext();

  // track if the user is submitting the form
  const [isSubmitting, setSubmitting] = useState(false);

  // set up the form state for email and password
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      const fetchProfile = async () => {
        try {
          const accountUser = await getCurrentUser();
          const userProfile = await getUserProfile(accountUser.$id);
          setUser(userProfile);
          setIsLogged(true);
        } catch {
          setUser(null);
          setIsLogged(false);
        }
      };
      fetchProfile();
    }, [])
  );

  // runs when the sign in button is pressed
  const submit = async () => {
    // check if fields are empty
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    // start the loading spinner
    setSubmitting(true);

    try {
      await signIn(form.email, form.password);

      // Wait for session to be ready (optional, but helps with Appwrite timing)
      await new Promise(resolve => setTimeout(resolve, 300));

      // Get the current user account
      const accountUser = await getCurrentUser();

      // Fetch the user's profile document (where XP and level are stored)
      const userProfile = await getUserProfile(accountUser.$id);

      // Save the user profile globally (this should include XP and level)
      setUser(userProfile);
      setIsLogged(true);

      router.replace("/exercise");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[70vh] px-4 my-6">
          {/* app logo */}
          <Image
            source={images.logo}
            className="w-[115px] h-[35px] -ml-5"
            resizeMode="contain"
          />

          {/* screen title */}
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Flexi
          </Text>

          {/* email input */}
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          {/* password input */}
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          {/* sign in button */}
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          {/* link to sign up page */}
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link href={"/signup"} className="text-lg font-psemibold text-secondary">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
