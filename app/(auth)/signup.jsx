import { View, Text, ScrollView, Alert, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser, signInWithGoogle } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalprovider'
import { useXp } from '../(tabs)/XpContext'

const adjectives = ['Swift', 'Iron', 'Zen', 'Fierce', 'Bold', 'Apex', 'Elite', 'Turbo', 'Hyper', 'Blaze', 'Rogue', 'Ultra'];
const nouns = ['Runner', 'Lifter', 'Yogi', 'Beast', 'Warrior', 'Titan', 'Flex', 'Pulse', 'Grind', 'Surge', 'Spark', 'Force'];

const generateUsername = () => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 900) + 100;
  return `${adj}${noun}${num}`;
};

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const { handleLogin } = useXp();
  const [isSubmitting, setSubmitting] = useState(false);
  const [isGoogleSubmitting, setGoogleSubmitting] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);
      await handleLogin();
      router.replace('/exercise');
    } catch (error) {
      const msg = error.message?.includes('paused')
        ? 'Service is temporarily unavailable. Please try again later.'
        : error.message;
      Alert.alert('Error', msg);
    } finally {
      setSubmitting(false);
    }
  };

  const submitGoogle = async () => {
    setGoogleSubmitting(true);
    try {
      const user = await signInWithGoogle();
      setUser(user);
      setIsLogged(true);
      await handleLogin();
      router.replace('/exercise');
    } catch (error) {
      if (!error.message?.includes('cancelled')) {
        Alert.alert('Error', error.message);
      }
    } finally {
      setGoogleSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[70vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px] -ml-5"
            resizeMode="contain"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign up to Flexi
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <TouchableOpacity
            onPress={() => setForm({ ...form, username: generateUsername() })}
            className="mt-2 self-end"
          >
            <Text className="text-sm font-pregular" style={{ color: '#E55837' }}>
              🎲 Generate random username
            </Text>
          </TouchableOpacity>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex-row items-center my-5">
            <View className="flex-1 h-px bg-gray-700" />
            <Text className="text-gray-400 mx-3 font-pregular">or</Text>
            <View className="flex-1 h-px bg-gray-700" />
          </View>

          <TouchableOpacity
            onPress={submitGoogle}
            disabled={isGoogleSubmitting}
            className="flex-row items-center justify-center bg-white rounded-xl py-3 px-4"
            style={{ opacity: isGoogleSubmitting ? 0.6 : 1 }}
          >
            <Text className="text-base font-psemibold text-gray-800">
              {isGoogleSubmitting ? 'Signing in...' : 'Continue with Google'}
            </Text>
          </TouchableOpacity>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/signin" className="text-lg font-psemibold text-secondary">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
