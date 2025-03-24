import { View, Text, FlatList, Image, RefreshControl, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import Quote from '../../components/Quote';
import { getAccount, getCurrentUser, updateUser } from '../../lib/appwrite';
import { useNavigation } from '@react-navigation/native';
import { Redirect, router, link } from "expo-router";
import { useXp } from '../(tabs)/XpContext';

const exercise = () => {

  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(null);
  const { addXp, xp } = useXp()
  const navigation = useNavigation();

  const calculateFillPercentage = (xp) => {
    const maxXp = 100; // Example max XP value
    return ((xp % maxXp) / maxXp) * 100;
  };

  const calculateLevel = (xp) => {
    const maxXp = 100; // Example max XP value per level
    return Math.floor(xp / maxXp) + 1;
  };

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

  const challenges = [
    { id: '1', title: 'Complete any HIIT', reward: '🏆 50 XP ✅ ' },
    { id: '2', title: 'Complete a Yoga Session', reward: '🎖️ 10 XP' },
    { id: '3', title: 'Get a Perfect Score in Triva', reward: '✨ 75 XP' },
  ];

  const leaderboard = [
    { id: '2', name: 'Siddhant', score: 2120 },
    { id: '3', name: 'Dylan', score: 1720 },
  ];

  // Add current user to leaderboard
  leaderboard.push({ id: '0', name: user, score: xp });

  // Sort leaderboard by score in descending order
  leaderboard.sort((a, b) => b.score - a.score);

  // Get top 5 players
  const topFiveLeaderboard = leaderboard.slice(0, 5);

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
              <View>
                {/* Scrollable Cards */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={true} // Enable default scroll indicator
                  contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }} // Add padding for spacing
                >
                  <View className="flex flex-row gap-6 items-center">
                    {/* Basic Games */}
                    <View className="flex flex-col gap-3" style={{ width: 320 }}> {/* Set fixed width */}
                      <View className="flex justify-center items-center flex-row w-full">
                        <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                          <Image
                            source={images.basic1}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                          />
                        </View>
                        <View className="flex justify-center flex-1 ml-3 gap-y-1">
                          <Text
                            className="font-psemibold text-sm text-white"
                            numberOfLines={1}>
                            Basic Exercise
                          </Text>
                          <Text
                            className="text-xs text-gray-100 font-pregular"
                            numberOfLines={1}>
                            Do Basic Exercise with a Video on the side!
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.push('basic')}
                        className="w-full h-60 rounded-xl relative flex justify-center items-center"
                      >
                        <Image
                          source={images.basic}
                          className="w-full h-full rounded-xl mt-3"
                          resizeMode="cover"
                        />
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
                            Party Games
                          </Text>
                          <Text
                            className="text-xs text-gray-100 font-pregular"
                            numberOfLines={1}>
                            Get into action with party excerise games!
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.push('partyGame')}
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
                  </View>
                </ScrollView>
              </View>
            </View>

            <View className="flex flex-wrap flex-row justify-between">
            </View>


            <View className="w-full mt-10">
              <Text className="text-xl text-white font-bold mb-5">Daily Challenges</Text>
              {challenges.map((challenge, index) => (
                <View
                  key={challenge.id}
                  className="bg-gray-800 p-4 rounded-lg mb-4 relative" // Add relative positioning
                >
                  {index === 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        left: 20,
                        right: 205,
                        top: '60%', // Adjust the position as needed
                        height: 4, // Thicker line
                        backgroundColor: 'white', // Color of the line
                        zIndex: 1, // Ensure it appears above the text
                      }}
                    />
                  )}
                  <Text
                    className="text-lg font-bold text-white"
                  >
                    {challenge.title}
                  </Text>
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
                  <Text className="text-lg text-secondary-200">{player.score} XP</Text>
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
