import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';

const BeginnerYoga = () => {
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

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

  const startTimer = () => {
    setIsTimerActive(true);
    setTimeRemaining(poses[currentPoseIndex].duration);

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimerActive(false);
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
          {/* Pose Image */}
          <Image
            source={{ uri: poses[currentPoseIndex].image }}
            style={{ width: 300, height: 300, borderRadius: 12, marginBottom: 20 }}
            resizeMode="contain"
          />

          {/* Pose Name */}
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
            {poses[currentPoseIndex].name}
          </Text>

          {/* Pose Directions */}
          <Text style={{ fontSize: 16, color: '#aaa', textAlign: 'center', marginBottom: 20, marginHorizontal: 20 }}>
            {poses[currentPoseIndex].directions}
          </Text>

          {/* Timer */}
          {isTimerActive ? (
            <Text style={{ fontSize: 20, color: '#FF6347', marginBottom: 20 }}>
              Time Remaining: {timeRemaining}s
            </Text>
          ) : (
            <Text style={{ fontSize: 20, color: '#aaa', marginBottom: 20 }}>
              Ready? Press Start to Begin
            </Text>
          )}

          {/* Start Button */}
          {!isTimerActive && (
            <TouchableOpacity
              style={{
                backgroundColor: '#1E90FF',
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
    </SafeAreaView>
  );
};

export default BeginnerYoga;
