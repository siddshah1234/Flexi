// this file defines the Advanced Yoga screen
// it guides users through advanced yoga poses with timers and XP rewards
// users earn XP for completing poses, and progress is visualized with an animated XP bar

import React, { useState, useRef } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { useXp } from '../(tabs)/XpContext';

const AdvancedYoga = () => {
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showXpBar, setShowXpBar] = useState(false);
  const xpBarWidth = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { addXp, xp, calculateLevel } = useXp();

  const poses = [
    {
      name: 'Crow Pose',
      duration: 45, // In seconds
      directions: 'Balance on your hands with knees resting on your upper arms. Keep your core engaged and focus on stability.',
      image: 'https://pocketyoga.com/assets/images/full/Crow.png',
    },
    {
      name: 'Headstand',
      duration: 60,
      directions: 'Invert your body by balancing on your head and forearms. Keep your core engaged and legs straight. Use a wall for support if needed.',
      image: 'https://pocketyoga.com/assets/images/full/HeadstandSupported.png',
    },
    {
      name: 'Wheel Pose',
      duration: 45,
      directions: 'Lie on your back, place your hands by your ears, and lift your body into a backbend. Straighten your arms and legs.',
      image: 'https://pocketyoga.com/assets/images/full/Wheel.png',
    },
    {
      name: 'Side Plank Pose',
      duration: 60,
      directions: 'Balance on one arm and the side of one foot while keeping your body straight. Switch sides after 30 seconds.',
      image: 'https://pocketyoga.com/assets/images/full/PlankSide_R.png',
    },
    {
      name: 'King Pigeon Pose',
      duration: 60,
      directions: 'Sit in a lunge position, extend one leg behind, and bend your back to grasp your foot. Stretch deeply into your hip and back.',
      image: 'https://pocketyoga.com/assets/images/full/PigeonKing_L.png',
    },
    {
      name: 'Peacock Pose',
      duration: 45,
      directions: 'Balance your torso on your bent elbows while keeping your body straight and parallel to the ground.',
      image: 'https://pocketyoga.com/assets/images/full/Peacock.png',
    },
    {
      name: 'Bound Angle Forward Bend',
      duration: 60,
      directions: 'Sit with your feet pressed together and knees dropped to the sides. Lean forward to deepen the stretch.',
      image: 'https://pocketyoga.com/assets/images/full/BoundAngleForward.png',
    },
    {
      name: 'Firefly Pose',
      duration: 60,
      directions: 'Balance on your hands with your legs extended straight out to the sides. Keep your core strong and focus on stability.',
      image: 'https://pocketyoga.com/assets/images/full/Firefly.png',
    },
    {
      name: 'Savasana (Corpse Pose)',
      duration: 120,
      directions: 'Lie on your back, relax completely, and focus on your breathing.',
      image: 'https://pocketyoga.com/assets/images/full/Corpse.png',
    },
  ];

  const calculateFillPercentage = (xp) => {
    const maxXp = 100;
    return ((xp % maxXp) / maxXp) * 100;
  };

  const startTimer = () => {
    setIsTimerActive(true);
    setTimeRemaining(poses[currentPoseIndex].duration);

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimerActive(false);

          (async () => {
            try {
              const addedXp = 35;
              const updatedXp = await addXp(addedXp);

              setShowXpBar(true);

              Animated.timing(xpBarWidth, {
                toValue: calculateFillPercentage(updatedXp),
                duration: 1000,
                useNativeDriver: false,
              }).start();

              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
              }).start();

              setTimeout(() => {
                Animated.timing(fadeAnim, {
                  toValue: 0,
                  duration: 500,
                  useNativeDriver: true,
                }).start(() => setShowXpBar(false));
              }, 5000);
            } catch (error) {
              console.error('Error adding XP:', error);
            }
          })();

          setCurrentPoseIndex((prevIndex) =>
            prevIndex < poses.length - 1 ? prevIndex + 1 : prevIndex
          );
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#161622', padding: 16 }}>
      <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Advanced Yoga
      </Text>

      {currentPoseIndex < poses.length ? (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: poses[currentPoseIndex].image }}
            style={{ width: 300, height: 300, borderRadius: 12, marginBottom: 20 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
            {poses[currentPoseIndex].name}
          </Text>
          <Text style={{ fontSize: 16, color: '#aaa', textAlign: 'center', marginBottom: 20, marginHorizontal: 20 }}>
            {poses[currentPoseIndex].directions}
          </Text>
          {isTimerActive ? (
            <Text style={{ fontSize: 20, color: '#FF6347', marginBottom: 20 }}>
              Time Remaining: {timeRemaining}s
            </Text>
          ) : (
            <Text style={{ fontSize: 20, color: '#aaa', marginBottom: 20 }}>
              Ready? Press Start to Begin
            </Text>
          )}
          {!isTimerActive && (
            <TouchableOpacity
              style={{
                backgroundColor: '#E55837',
                padding: 16,
                borderRadius: 8,
                width: 200,
                alignItems: 'center',
              }}
              onPress={startTimer}
            >
              <Text style={{ fontSize: 18, color: '#fff' }}>Start</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
            Great Job! You Completed the Session 🎉
          </Text>
        </View>
      )}

      {showXpBar && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 60,
            left: 16,
            right: 16,
            alignItems: 'center',
            opacity: fadeAnim,
          }}
        >
          <Text style={{ fontSize: 16, color: '#fff', marginBottom: 5 }}>
            Level: {calculateLevel(xp)} | XP: {xp}
          </Text>

          <View
            style={{
              height: 20,
              backgroundColor: '#444',
              borderRadius: 10,
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <Animated.View
              style={{
                height: '100%',
                backgroundColor: '#E55837',
                width: xpBarWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
              }}
            />
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default AdvancedYoga;