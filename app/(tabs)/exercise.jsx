import { View, Text, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import Quote from '../../components/Quote';
import { getAccount, getCurrentUser, updateUser } from '../../lib/appwrite';
import { useNavigation } from '@react-navigation/native';
import { Redirect, router, link } from "expo-router";

const exercise = () => {
  
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(null);
  const [xp, setXp] = useState(0);
  const navigation = useNavigation(); // Add navigation hook

  const calculateFillPercentage = (xp) => {
    const maxXp = 100; // Example max XP value
    return ((xp % maxXp) / maxXp) * 100;
  };

  const calculateLevel = (xp) => {
    const maxXp = 100; // Example max XP value per level
    return Math.floor(xp / maxXp) + 1;
  };

  const addXp = (amount) => {
    const userDocument = getCurrentUser();
    setXp((prevXp) => prevXp + amount);
    userDocument.xp += amount;
    return userDocument.xp;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const Account = await getAccount();
        const userDocument = await getCurrentUser();

        setUser(Account.name);
        setXp(userDocument.xp);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const saveUserData = async () => {
      if (user) {
        const userDocument = await getCurrentUser();
        await updateUser(userDocument.$id, { xp });
      }
    };
    saveUserData();
  }, [xp]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const activities = [
    {
      id: '1',
      title: 'Guided Walking',
      description: 'Explore guided walking paths.',
      onPress: () => router.push('/running/running'), // Navigate to Running Tracker
      //image: require('../../assets/walking.png'),
    },
    {
      id: '2',
      title: 'Guided Yoga',
      description: 'Relax with guided yoga sessions.',
      onPress: () => router.push('/workouts/YogaHomeScreen'), // Navigate to Yoga Home Screen
      //image: require('../../assets/yoga.png'),
    },
    {
      id: '3',
      title: 'Stretch Breaks',
      description: 'Take quick stretch breaks to refresh your body.',

      //image: require('../../assets/stretching.png'),
    },
  ];

  const challenges = [
    { id: '1', title: 'Walk 5,000 Steps', reward: '🏆 50 XP' },
    { id: '2', title: 'Complete a Yoga Session', reward: '🎖️ 10 XP' },
    { id: '3', title: 'Finish both Beginner and Advanced Yoga Session ', reward: '✨ 75 XP' },
  ];

  const leaderboard = [
    { id: '1', name: 'Rishi', score: '1,350 XP' },
    { id: '2', name: 'siddhant', score: '1,120 XP' },
    { id: '3', name: 'Dylan', score: '20 XP' },
  ];

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-lg text-gray-100">
                  Welcome back!
                </Text>
                <Text className="top-4 text-4xl font-psemibold text-white">{user}</Text>
              </View>

              <View className="mt-8">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <Quote />
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
            <View className="w-full">
              <Text className="text-xl text-white font-bold mb-5 mt-8">Activities</Text>
              <View className="flex flex-col items-center px-4 mb-14">
                <View className="flex flex-col gap-3 items-start w-full"> {/* Ensure full width */}
                  <View className="flex flex-col gap-3 w-full"> {/* Change flex-row to flex-col */}
                    <View className="flex justify-center items-center flex-row w-full"> {/* Ensure full width */}
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
                          Guided Running
                        </Text>
                        <Text
                          className="text-xs text-gray-100 font-pregular"
                          numberOfLines={1}>
                          Become fit with an interactive running page.
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => router.push('running')
                        }
                      className="w-full h-60 rounded-xl relative flex justify-center items-center"
                    >
                      <Image
                        source={images.thumbnail}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                  <Text></Text>
                  <View className="flex justify-center items-center flex-row w-full"> {/* Ensure full width */}
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
              </View>
            </View>

            <View className="flex flex-wrap flex-row justify-between">
            </View>

            <View className="w-full mt-10">
              <Text className="text-xl text-white font-bold mb-5">Challenges</Text>
              {challenges.map((challenge) => (
                <View
                  key={challenge.id}
                  className="bg-gray-800 p-4 rounded-lg mb-4"
                >
                  <Text className="text-lg font-bold text-white">{challenge.title}</Text>
                  <Text className="text-sm text-gray-400">Reward: {challenge.reward}</Text>
                </View>
              ))}
            </View>

            <View className="w-full mt-10">
              <Text className="text-xl text-white font-bold mb-5">Leaderboard</Text>
              {leaderboard.map((player) => (
                <View
                  key={player.id}
                  className="bg-gray-800 p-4 rounded-lg mb-4 flex-row justify-between"
                >
                  <Text className="text-lg font-bold text-white">{player.name}</Text>
                  <Text className="text-lg text-secondary-200">{player.score}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        refreshControl={< RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView >
  );
};

export default exercise;
