// this screen is a stretching routine made for after weightlifting
// it walks the user through each stretch one by one with a countdown timer
// users earn xp after finishing each stretch and see their level progress on a bar
// when the user presses start, the timer begins and goes to the next stretch after time is up
// the routine ends with a congratulation message and total xp earned

import React, { useState, useRef } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Animated, Modal } from 'react-native';
import { useXp } from '../(tabs)/XpContext';

const WeightliftingStretches = () => {
  // state for which stretch we're on
  const [currentStretchIndex, setCurrentStretchIndex] = useState(0);
  // state for how many seconds are left
  const [timeRemaining, setTimeRemaining] = useState(0);
  // state for whether the timer is running
  const [isTimerActive, setIsTimerActive] = useState(false);
  // state for showing xp bar animation
  const [showXpBar, setShowXpBar] = useState(false);
  // modal state (not used but ready if needed)
  const [showModal, setShowModal] = useState(false);

  // used for xp bar animation
  const xpBarWidth = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // getting xp functions from context
  const { addXp, xp, calculateLevel } = useXp();

  // all the stretches in the routine
  const stretches = [
    {
      name: 'Standing Arm Circles',
      duration: 30,
      directions: 'extend your arms out to the sides and make small circles, switching directions halfway.',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/arm-circles-exercise-illustration.gif',
    },
    {
      name: 'Overhead Triceps Stretch',
      duration: 30,
      directions: 'bend one arm overhead and pull the elbow gently with your opposite hand. switch arms.',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/triceps-stretch-exercise-illustration.gif',
    },
    {
      name: 'Cat-Cow Stretch',
      duration: 30,
      directions: 'on all fours, arch your back on an inhale, then round it on an exhale. repeat slowly.',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/cat-back-stretch-exercise-illustration.gif',
    },
    {
      name: 'Hamstring Stretch',
      duration: 30,
      directions: 'lie down with one leg extended and reach toward your foot. switch legs after 30 seconds.',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/03/hamstring-stretch-exercise-illustration.gif',
    },
    {
      name: 'Hip Flexor Stretch',
      duration: 30,
      directions: 'step into a lunge, keeping your back leg straight. lean forward slightly. switch sides.',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/03/hip-flexor-stretch-exercise-illustration.gif',
    },
    {
      name: 'Standing Side Stretch',
      duration: 15,
      directions: 'reach one arm overhead and lean to the opposite side. switch sides.',
      image: 'https://www.spotebi.com/wp-content/uploads/2016/02/standing-side-bend-exercise-illustration-spotebi.gif',
    },
    {
      name: 'Butterfly Stretch',
      duration: 30,
      directions: 'sit with your feet together and knees out. press your knees toward the floor gently.',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/03/butterfly-stretch-exercise-illustration.gif',
    },
    {
      name: 'Chest Stretch',
      duration: 30,
      directions: 'sit with feet together, knees out, and lean forward to stretch your chest.',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/06/chest-stretch-exercise-illustration.gif',
    },
    {
      name: 'Wrist Stretch',
      duration: 15,
      directions: 'extend one arm, palm up, and gently pull your fingers back with your other hand. switch hands.',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/04/wrist-stretch-exercise-illustration.gif',
    },
  ];

  // function to start the timer and handle what happens after a stretch
  const startTimer = () => {
    setIsTimerActive(true);
    setTimeRemaining(stretches[currentStretchIndex].duration);

    const calculateFillPercentage = (xp) => {
      const maxXp = 100;
      return ((xp % maxXp) / maxXp) * 100;
    };

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimerActive(false);

          // go to next stretch if there's another one
          setCurrentStretchIndex((prevIndex) =>
            prevIndex < stretches.length - 1 ? prevIndex + 1 : prevIndex
          );

          // give xp and animate bar
          (async () => {
            try {
              const addedXp = 10;
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
        }

        return prev - 1;
      });
    }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#161622', padding: 16 }}>
      {/* title */}
      <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Weightlifting Stretches
      </Text>

      {/* stretch in progress */}
      {currentStretchIndex < stretches.length ? (
        <View style={{ alignItems: 'center' }}>
          {/* stretch image */}
          <Image
            source={{ uri: stretches[currentStretchIndex].image }}
            style={{ width: 300, height: 300, borderRadius: 12, marginBottom: 20 }}
            resizeMode="contain"
          />

          {/* stretch name and directions */}
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
            {stretches[currentStretchIndex].name}
          </Text>
          <Text style={{ fontSize: 16, color: '#aaa', textAlign: 'center', marginBottom: 20, marginHorizontal: 20 }}>
            {stretches[currentStretchIndex].directions}
          </Text>

          {/* countdown timer */}
          <Text style={{ fontSize: 20, color: isTimerActive ? '#FF6347' : '#aaa', marginBottom: 20 }}>
            {isTimerActive ? `Time Remaining: ${timeRemaining}s` : 'Ready? Press Start to Begin'}
          </Text>

          {/* start button */}
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
        // finished all stretches
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
            Great Job! You Completed the Routine 🎉
          </Text>
        </View>
      )}

      {/* animated xp bar */}
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

export default WeightliftingStretches;
