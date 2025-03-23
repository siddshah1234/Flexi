import React, { useState, useRef } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { useXp } from '../(tabs)/XpContext';

const BeginnerYoga = () => {
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showXpBar, setShowXpBar] = useState(false);
  const xpBarWidth = useRef(new Animated.Value(0)).current; // Animated value for XP bar width
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animated value for opacity
  const { addXp, xp, calculateLevel } = useXp();

  const poses = [
    {
      name: 'Mountain Pose',
      duration: 30, // In seconds
      directions: 'Stand tall with feet together, shoulders relaxed, and arms at your side. Take deep breaths and focus on your posture.',
      image: 'https://pocketyoga.com/assets/images/full/MountainArmsSide.png',
    },
    {
      name: 'Child’s Pose',
      duration: 45,
      directions: 'Sit back on your heels, stretch your arms forward, and rest your forehead on the ground. Breathe deeply and relax.',
      image: 'https://pocketyoga.com/assets/images/full/ChildTraditional.png',
    },
    {
      name: 'Cat-Cow Pose',
      duration: 60,
      directions: 'Alternate between Cat Pose (arch your back and tuck your chin) and Cow Pose (drop your belly and lift your head). Breathe with each movement.',
      image: 'https://pocketyoga.com/assets/images/full/Cat.png', // Use Cow Pose as alternate
    },
    {
      name: 'Downward Dog',
      duration: 60,
      directions: 'Start on all fours, then lift your hips toward the ceiling to form an inverted V. Keep your arms straight and your heels reaching toward the ground.',
      image: 'https://pocketyoga.com/assets/images/full/DownwardDog.png',
    },
    {
      name: 'Cobra Pose',
      duration: 45,
      directions: 'Lie face down, place your hands under your shoulders, and lift your chest while keeping your elbows slightly bent. Relax your shoulders and breathe deeply.',
      image: 'https://pocketyoga.com/assets/images/full/CobraFull.png',
    },
    {
      name: 'Seated Forward Bend',
      duration: 60,
      directions: 'Sit with your legs extended and reach forward to touch your toes. Keep your back straight and stretch gently.',
      image: 'https://pocketyoga.com/assets/images/full/SeatedForwardBend.png',
    },
    {
      name: 'Butterfly Pose',
      duration: 60,
      directions: 'Sit with your knees bent and soles of your feet pressed together. Hold your feet and let your knees drop gently to the sides.',
      image: 'https://pocketyoga.com/assets/images/full/Butterfly.png',
    },
    {
      name: 'Bridge Pose',
      duration: 60,
      directions: 'Lie on your back, bend your knees, and lift your hips while keeping your feet flat on the ground. Squeeze your glutes and hold.',
      image: 'https://pocketyoga.com/assets/images/full/Bridge.png',
    },
    {
      name: 'Corpse Pose',
      duration: 120,
      directions: 'Lie on your back with arms at your sides. Close your eyes, relax your body, and focus on your breathing.',
      image: 'https://pocketyoga.com/assets/images/full/Corpse.png',
    },
  ];

  const calculateFillPercentage = (xp) => {
    const maxXp = 100; // Example max XP value
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

          // Add XP when the timer hits 0
          (async () => {
            try {
              const addedXp = 20; // XP to add
              const updatedXp = await addXp(addedXp); // Add XP to the user
              console.log(`XP added successfully! New XP: ${updatedXp}`);

              // Show XP bar with animation
              setShowXpBar(true);

              // Animate XP bar width
              Animated.timing(xpBarWidth, {
                toValue: calculateFillPercentage(updatedXp),
                duration: 1000, // Animation duration
                useNativeDriver: false, // Width animation requires `false`
              }).start();

              // Fade in XP bar and text
              Animated.timing(fadeAnim, {
                toValue: 1, // Fully visible
                duration: 500, // Fade-in duration
                useNativeDriver: true,
              }).start();

              // Hide XP bar after 5 seconds
              setTimeout(() => {
                // Fade out XP bar and text
                Animated.timing(fadeAnim, {
                  toValue: 0, // Fully invisible
                  duration: 500, // Fade-out duration
                  useNativeDriver: true,
                }).start(() => setShowXpBar(false)); // Hide after fade-out
              }, 5000);
            } catch (error) {
              console.error('Error adding XP:', error);
            }
          })();

          // Move to the next pose
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
        Beginner Yoga
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

      {/* XP Bar and Level */}
      {showXpBar && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 60,
            left: 16,
            right: 16,
            alignItems: 'center',
            opacity: fadeAnim, // Bind opacity to fadeAnim
          }}
        >
          {/* Level and XP */}
          <Text style={{ fontSize: 16, color: '#fff', marginBottom: 5 }}>
            Level: {calculateLevel(xp)} | XP: {xp}
          </Text>

          {/* XP Bar */}
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

export default BeginnerYoga;