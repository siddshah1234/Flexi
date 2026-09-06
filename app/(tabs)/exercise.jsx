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
import { getAccount, getCurrentUser, updateUser, getLeaderboard } from '../../lib/appwrite';
import { getTodaysChallenges } from '../../constants/challenges';
import { useNavigation } from '@react-navigation/native';
import { Redirect, router } from "expo-router";
import { useXp } from '../(tabs)/XpContext';
import { useFocusEffect } from '@react-navigation/native';
import { useMusic } from '../../context/MusicContext';

const exercise = () => {
  const [refreshing, setRefreshing] = useState(false); // refresh control state
  const [user, setUser] = useState(null); // user name
  const { addXp, xp } = useXp(); // xp context
  const navigation = useNavigation();
  const { selectedTrack, setSelectedTrack } = useMusic(); // stop music on screen load
  const [todaysChallenges, setTodaysChallenges] = useState([]);
  const [completedChallengeIds, setCompletedChallengeIds] = useState(new Set());
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  // stop music when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setSelectedTrack(null);
    }, [])
  );


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

  // get user name, leaderboard, and today's challenges from appwrite
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const Account = await getAccount();
        const userDocument = await getCurrentUser();
        setUser(Account.name);
        setCurrentUserId(userDocument?.$id ?? null);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    const fetchLiveData = async () => {
      const lb = await getLeaderboard();
      setLeaderboard(lb);
      setTodaysChallenges(getTodaysChallenges());
    };
    fetchUserData();
    fetchLiveData();
  }, []);

  // XP saves are handled by XpContext.addXp — no duplicate write needed here

  const handleCompleteChallenge = async (challenge) => {
    if (completedChallengeIds.has(challenge.id)) return;
    setCompletedChallengeIds((prev) => new Set([...prev, challenge.id]));
    await addXp(challenge.xpReward);
  };

  // pull to refresh -> refreshes leaderboard (challenges are local, already set)
  const onRefresh = async () => {
    setRefreshing(true);
    const lb = await getLeaderboard();
    setLeaderboard(lb);
    setRefreshing(false);
  };


  return (
    <SafeAreaView className="bg-primary h-full">
      {/* XP bar lives outside FlatList so it re-renders immediately when xp changes */}
      <View className="px-4 pt-6 pb-2">
        <View className="flex justify-between items-start flex-row mb-4">
          <View>
            <Text className="font-pmedium text-lg text-gray-100">Welcome back!</Text>
            <Text className="top-4 text-4xl font-psemibold text-white">{user}</Text>
          </View>
          <View className="mt-8">
            <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
          </View>
        </View>
        <Quote />
        <View className="w-full pt-5 pb-2">
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
      </View>

      <FlatList
        data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={() => null}
        ListHeaderComponent={() => (
          <View className="flex px-4 space-y-6">

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
                <View className="flex flex-col gap-3" style={{ width: 320 }}>
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
                    <View className="flex flex-col gap-3" style={{ width: 320 }}>
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
                    <View className="flex flex-col gap-3" style={{ width: 320 }}>
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
                    <View className="flex flex-col gap-3" style={{ width: 320 }}>
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
                    <View className="flex flex-col gap-3" style={{ width: 320 }}>
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

            {/* daily challenges from appwrite */}
            <View className="w-full mt-10">
              <Text className="text-xl text-white font-bold mb-5">Daily Challenges</Text>
              {todaysChallenges.length === 0 ? (
                <Text className="text-gray-400 text-sm">No challenges today. Check back tomorrow!</Text>
              ) : (
                todaysChallenges.map((challenge) => {
                  const done = completedChallengeIds.has(challenge.id);
                  return (
                    <View key={challenge.id} className="bg-gray-800 p-4 rounded-lg mb-4" style={{ opacity: done ? 0.6 : 1 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <Text className="text-base font-bold text-white" style={{ flex: 1, marginRight: 8 }}>{challenge.title}</Text>
                        <View style={{ backgroundColor: '#E55837', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 }}>
                          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>+{challenge.xpReward} XP</Text>
                        </View>
                      </View>
                      <Text className="text-sm text-gray-400 mb-3">{challenge.description}</Text>
                      {done ? (
                        <Text style={{ color: '#4CAF50', fontWeight: 'bold' }}>✅ Completed</Text>
                      ) : (
                        <TouchableOpacity
                          onPress={() => handleCompleteChallenge(challenge)}
                          style={{ backgroundColor: '#E55837', borderRadius: 8, paddingVertical: 8, alignItems: 'center' }}
                        >
                          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Complete</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })
              )}
            </View>

            {/* leaderboard */}
            <View className="w-full mt-10 mb-10">
              <Text className="text-xl text-white font-bold mb-5">🏆 Leaderboard</Text>
              {leaderboard.length === 0 ? (
                <Text className="text-gray-400 text-sm">No users yet.</Text>
              ) : (
                leaderboard.map((u, index) => {
                  const medals = ['🥇', '🥈', '🥉'];
                  const isMe = u.$id === currentUserId;
                  return (
                    <View
                      key={u.$id}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#1E1E2D',
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 10,
                        borderWidth: isMe ? 1.5 : 0,
                        borderColor: isMe ? '#E55837' : 'transparent',
                      }}
                    >
                      <Text style={{ width: 36, fontSize: 18, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
                        {index < 3 ? medals[index] : `#${index + 1}`}
                      </Text>
                      <Image
                        source={{ uri: u.avatar }}
                        style={{ width: 38, height: 38, borderRadius: 19, marginHorizontal: 12, backgroundColor: '#333' }}
                      />
                      <Text style={{ flex: 1, fontSize: 15, color: '#fff', fontWeight: '500' }} numberOfLines={1}>
                        {u.username}{isMe ? ' (you)' : ''}
                      </Text>
                      <Text style={{ fontSize: 13, color: '#E55837', fontWeight: 'bold' }}>{u.xp} XP</Text>
                    </View>
                  );
                })
              )}
            </View>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default exercise;
