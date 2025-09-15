// this screen lets users create a new account by filling out a form
// they enter a username, email, and password
// if the account is made successfully, it saves the user info and sends them to the exercise screen
// if there’s a problem, it shows an error message

import { View, Text, ScrollView, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalprovider'
import { Account } from 'react-native-appwrite'
import { useFocusEffect } from '@react-navigation/native'

const SignUp = () => {
  // get global functions to store user info
  const { setUser, setIsLogged } = useGlobalContext();

  // track if the user is submitting the form
  const [isSubmitting, setSubmitting] = useState(false);

  // set up the form state for username, email, and password
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      // Try to fetch the current user when the screen is focused
      const fetchUser = async () => {
        try {
          const user = await account.get();
          setUser(user);
          setIsLogged(true);
        } catch {
          setUser(null);
          setIsLogged(false);
        }
      };
      fetchUser();
    }, [])
  );

  // runs when the user presses the sign up button
  const submit = async () => {
    // check if any field is empty
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    // start loading spinner
    setSubmitting(true);
    try {
      // try to create a new user
      const result = await createUser(form.email, form.password, form.username);

      // store user data globally
      setUser(result);
      setIsLogged(true);

      // go to the exercise screen
      router.replace("/exercise");
    } catch (error) {
      // show error message if something goes wrong
      Alert.alert("Error", error.message);
    } finally {
      // stop loading spinner
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[70vh] px-4 my-6">
          {/* show the app logo */}
          <Image
            source={images.logo}
            className="w-[115px] h-[35px] -ml-5"
            resizeMode="contain"
          />

          {/* screen title */}
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign up to Flexi
          </Text>

          {/* username input */}
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

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

          {/* sign up button */}
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          {/* link to sign in screen */}
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href={"/signin"} className="text-lg font-psemibold text-secondary">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
