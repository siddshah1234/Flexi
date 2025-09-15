// this file is the main exercise homepage screen of the app
// it shows a welcome message with the user's name and level info
// it tracks xp and updates the user's data in the database
// it displays a horizontal scroll list of different activity options like basic workouts, trivia, hiit, yoga, and more
// it also randomly picks and shows 3 daily challenges with xp rewards
// the screen stops any playing music when it loads and also supports pull-to-refresh for new challenges

import { View, Text, FlatList, Image, RefreshControl, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import Quote from '../../components/Quote';
import { getAccount, getCurrentUser, updateUser } from '../../lib/appwrite';
import { useNavigation } from '@react-navigation/native';
import { Redirect, router } from "expo-router";
import { useXp } from '../(tabs)/XpContext';
import { useFocusEffect } from '@react-navigation/native';
import { useMusic } from '../../context/MusicContext';
import { shuffle } from 'lodash';

const exercise = () => {
  const [refreshing, setRefreshing] = useState(false); // refresh control state
  const [user, setUser] = useState(null); // user name
  const { addXp, xp } = useXp(); // xp context
  const navigation = useNavigation();
  const { selectedTrack, setSelectedTrack } = useMusic(); // stop music on screen load
  const [selectedChallenges, setSelectedChallenges] = useState([]); // 3 random challenges

  // stop music when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setSelectedTrack(null);
    }, [])
  );

  // pick 3 random daily challenges on mount
  useEffect(() => {
    const shuffledChallenges = shuffle(challenges);
    setSelectedChallenges(shuffledChallenges.slice(0, 3));
  }, []);

  // calculate xp bar fill %
  const calculateFillPercentage = (xp) => {
    const maxXp = 100;
    return ((xp % maxXp) / maxXp) * 100;
  };

  // calculate level from xp
  const calculateLevel = (xp) => {
    const maxXp = 100;
    return Math.floor(xp / maxXp) + 1;
  };

  // get user name from appwrite
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const Account = await getAccount();
        const userDocument = await getCurrentUser();
        setUser(Account.name);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  // save xp to appwrite when xp changes
  useEffect(() => {
    const saveUserData = async () => {
      if (user) {
        const userDocument = await getCurrentUser();
        await updateUser(userDocument.$id, { xp });
      }
    };
    saveUserData();
  }, [xp]);

  // pull to refresh -> gets new challenges
  const onRefresh = () => {
    setRefreshing(true);
    const shuffledChallenges = shuffle(challenges);
    setSelectedChallenges(shuffledChallenges.slice(0, 3));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // all available challenges
  const challenges = [
    { id: '1', title: 'Complete any HIIT', reward: '🏆 50 XP ✅ ' },
    { id: '2', title: 'Complete a Yoga Session', reward: '🎖️ 10 XP' },
    { id: '3', title: 'Get a Perfect Score in Trivia', reward: '✨ 75 XP' },
    { id: '4', title: 'Complete 3 Stretching Exercises', reward: '🌟 20 XP' },
    { id: '5', title: 'Finish a 10-Minute Meditation', reward: '🧘 15 XP' },
    { id: '6', title: 'Burn 100 Calories', reward: '🔥 30 XP' },
    { id: '7', title: 'Drink 2 Liters of Water', reward: '💧 5 XP' },
    { id: '8', title: 'Complete a Cardio Session', reward: '🏃 40 XP' },
    { id: '9', title: 'Do 50 Push-Ups', reward: '💪 25 XP' },
    { id: '10', title: 'Walk 5,000 Steps', reward: '🚶 10 XP' },
    { id: '11', title: 'Complete a Dance Workout', reward: '💃 35 XP' },
    { id: '12', title: 'Hold a Plank for 1 Minute', reward: '🛡️ 20 XP' },
    { id: '13', title: 'Run 1 Kilometer', reward: '🏅 50 XP' },
    { id: '14', title: 'Do 10 Burpees', reward: '🔥 15 XP' },
    { id: '15', title: 'Stretch for 15 Minutes', reward: '🧘‍♂️ 10 XP' },
  ];

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[]} // empty flatlist, only using header
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            {/* greeting and profile */}
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-lg text-gray-100">
                  Welcome back!
                </Text>
                <Text className="top-4 text-4xl font-psemibold text-white">{user}</Text>
              </View>
              <View className="mt-8">
                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
              </View>
            </View>

            {/* motivational quote */}
            <Quote />

            {/* xp level and progress bar */}
            <View className="w-full flex-1 pt-5 pb-8 top-5">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Level: {calculateLevel(xp)}  ({xp}xp)
              </Text>
              <View className="w-full bg-gray-300 h-2 rounded-full">
                <View
                  className="bg-secondary-200 h-2 rounded-full"
                  style={{ width: `${calculateFillPercentage(xp)}%` }}
                />
              </View>
            </View>

            {/* activity scroll list */}
            <Text className="text-xl text-white font-bold mb-5 mt-8">Activities</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}>
              <View className="flex flex-row gap-6 items-center">
                {/* each of these cards shows a different fitness activity (basic, party, trivia, hiit, etc) */}
                {/* copy/paste layout repeated for each option */}
                {/* example below is for basic workouts */}
                <View className="flex flex-col gap-3" style={{ width: 320 }}>
                  <View className="flex justify-center items-center flex-row w-full">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                      <Image source={images.basic1} className="w-full h-full rounded-lg" resizeMode="cover" />
                    </View>
                    <View className="flex justify-center flex-1 ml-3 gap-y-1">
                      <Text className="font-psemibold text-sm text-white">Basic Exercise</Text>
                      <Text className="text-xs text-gray-100 font-pregular">
                        Do Basic Exercise with a Video on the side! Simply Enter a Youtube Link and begin your workout!
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.push('basic')}
                    className="w-full h-60 rounded-xl relative flex justify-center items-center"
                  >
                    <Image source={images.basic} className="w-full h-full rounded-xl mt-3" resizeMode="cover" />
                  </TouchableOpacity>
                </View>

                {/* Party Games */}
                <View className="flex flex-col gap-3" style={{ width: 320 }}> {/* Set fixed width */}
                      <View className="flex justify-center items-center flex-row w-full">
                        <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                          <Image
                            source={images.game}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                          />
                        </View>
                        <View className="flex justify-center flex-1 ml-3 gap-y-1">
                          <Text
                            className="font-psemibold text-sm text-white"
                            numberOfLines={1}>
                            Group Activities
                          </Text>
                          <Text
                            className="text-xs text-gray-100 font-pregular"
                            numberOfLines={1}>
                            Get into action with friends while you exercise!
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.push('partyHome')}
                        className="w-full h-60 rounded-xl relative flex justify-center items-center"
                      >
                        <Image
                          source={images.party}
                          className="w-full h-full rounded-xl mt-3"
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    </View>
                    {/* Trvia Games */}
                    <View className="flex flex-col gap-3" style={{ width: 320 }}> {/* Set fixed width */}
                      <View className="flex justify-center items-center flex-row w-full">
                        <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                          <Image
                            source={images.question}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                          />
                        </View>
                        <View className="flex justify-center flex-1 ml-3 gap-y-1">
                          <Text
                            className="font-psemibold text-sm text-white"
                            numberOfLines={1}>
                            Trivia
                          </Text>
                          <Text
                            className="text-xs text-gray-100 font-pregular"
                            numberOfLines={1}>
                            Test your knowledge with fun trivia games!
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.push('triviahome')}
                        className="w-full h-60 rounded-xl relative flex justify-center items-center"
                      >
                        <Image
                          source={images.question1}
                          className="w-full h-full rounded-xl mt-3"
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    </View>
                    {/* HIIT Activity */}
                    <View className="flex flex-col gap-3" style={{ width: 320 }}> {/* Set fixed width */}
                      <View className="flex justify-center items-center flex-row w-full">
                        <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                          <Image
                            source={images.profile}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                          />
                        </View>
                        <View className="flex justify-center flex-1 ml-3 gap-y-1">
                          <Text
                            className="font-psemibold text-sm text-white"
                            numberOfLines={1}>
                            HIIT
                          </Text>
                          <Text
                            className="text-xs text-gray-100 font-pregular"
                            numberOfLines={1}>
                            High, Intesive workouts to get your heart pumping!
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.push('homehiit')}
                        className="w-full h-60 rounded-xl relative flex justify-center items-center"
                      >
                        <Image
                          source={images.thumbnail}
                          className="w-full h-full rounded-xl mt-3"
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Yoga Stretches Activity */}
                    <View className="flex flex-col gap-3" style={{ width: 320 }}> {/* Set fixed width */}
                      <View className="flex justify-center items-center flex-row w-full">
                        <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                          <Image
                            source={images.pose}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                          />
                        </View>
                        <View className="flex justify-center flex-1 ml-3 gap-y-1">
                          <Text
                            className="font-psemibold text-sm text-white"
                            numberOfLines={1}>
                            Yoga Stretches
                          </Text>
                          <Text
                            className="text-xs text-gray-100 font-pregular"
                            numberOfLines={1}>
                            Relax with guided yoga sessions.
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.push('YogaHomeScreen')}
                        className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
                      >
                        <Image
                          source={images.empty}
                          className="w-full h-full rounded-xl"
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    </View>
                    {/*Stretches Activity */}
                    <View className="flex flex-col gap-3" style={{ width: 320 }}> {/* Set fixed width */}
                      <View className="flex justify-center items-center flex-row w-full">
                        <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                          <Image
                            source={images.forest}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                          />
                        </View>
                        <View className="flex justify-center flex-1 ml-3 gap-y-1">
                          <Text
                            className="font-psemibold text-sm text-white"
                            numberOfLines={1}>
                            Regular Stretches
                          </Text>
                          <Text
                            className="text-xs text-gray-100 font-pregular"
                            numberOfLines={2}>
                            Warm up with some stretches before your workout!
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.push('stretcheshome')}
                        className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
                      >
                        <Image
                          source={images.stretch}
                          className="w-full h-full rounded-xl"
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    </View>

              </View>
            </ScrollView>

            {/* daily challenge cards */}
            <View className="w-full mt-10">
              <Text className="text-xl text-white font-bold mb-5">Daily Challenges</Text>
              {selectedChallenges.map((challenge) => (
                <View key={challenge.id} className="bg-gray-800 p-4 rounded-lg mb-4 relative">
                  <Text className="text-lg font-bold text-white">{challenge.title}</Text>
                  <Text className="text-sm text-gray-400">Reward: {challenge.reward}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default exercise;
