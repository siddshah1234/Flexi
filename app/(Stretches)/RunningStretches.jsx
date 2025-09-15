// this screen shows a list of running-related stretches with a timer for each one
// the user can press start to begin the stretch, and it counts down based on the set time
// after each stretch ends, it gives the user xp points and shows an xp progress bar
// the xp bar fades in and out to show progress, and updates the user's level too
// once all stretches are done, it shows a congratulatory message

import React, { useState, useRef } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Animated, Modal } from 'react-native';
import { useXp } from '../(tabs)/XpContext';

const RunningStretches = () => {
  // keeps track of which stretch you're on
  const [currentStretchIndex, setCurrentStretchIndex] = useState(0);

  // how much time is left for the current stretch
  const [timeRemaining, setTimeRemaining] = useState(0);

  // whether the timer is currently running
  const [isTimerActive, setIsTimerActive] = useState(false);

  // whether to show the xp bar
  const [showXpBar, setShowXpBar] = useState(false);

  // for showing extra info in a popup (currently unused)
  const [showModal, setShowModal] = useState(false);

  // controls how wide the xp bar fills up
  const xpBarWidth = useRef(new Animated.Value(0)).current;

  // controls how visible the xp bar is
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // gets xp functions from the shared context
  const { addXp, xp, calculateLevel } = useXp();

  // list of all the stretches with their info
  const stretches = [
    {
      name: 'Leg Swings',
      duration: 30,
      directions: 'Hold onto a wall and swing one leg forward and backward. Then, switch legs. Keep movements controlled.',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/03/forward-leg-swings-exercise-illustration.gif',
    },
    {
      name: 'Standing Quad Stretch',
      duration: 30,
      directions: 'Stand on one leg, grab your ankle, and pull your heel toward your glutes. Keep knees together. Switch legs.',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/03/quad-stretch-exercise-illustration.gif',
    },
    {
      name: 'Calf Stretch',
      duration: 45,
      directions: 'Stand with one foot forward, the other back, and press your back heel into the ground. Switch legs.',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/03/calf-stretch-exercise-illustration.gif',
    },
    {
      name: 'Lying Hamstring Stretch',
      duration: 30,
      directions: 'Lie on your back, extend one leg, and pull it toward you with both hands. Switch legs.',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/03/hamstring-stretch-exercise-illustration.gif',
    },
    {
      name: 'Glute Stretch',
      duration: 30,
      directions: 'Lie on your back, cross one ankle over the opposite knee, and gently press the top knee away. Switch legs.',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/04/glute-stretch-exercise-illustration.gif',
    },
  ];

  // starts the countdown for the current stretch
  const startTimer = () => {
    setIsTimerActive(true);
    setTimeRemaining(stretches[currentStretchIndex].duration);

    // calculates how full the xp bar should be
    const calculateFillPercentage = (xp) => {
      const maxXp = 100;
      return ((xp % maxXp) / maxXp) * 100;
    };

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimerActive(false);

          // go to the next stretch if there are any left
          setCurrentStretchIndex((prevIndex) =>
            prevIndex < stretches.length - 1 ? prevIndex + 1 : prevIndex
          );

          // give xp when the stretch is done
          (async () => {
            try {
              const addedXp = 10;
              const updatedXp = await addXp(addedXp);

              // show and animate the xp bar
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

              // hide the xp bar after 5 seconds
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
      <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Running Stretches
      </Text>

      {/* if we still have stretches to do, show the current one */}
      {currentStretchIndex < stretches.length ? (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: stretches[currentStretchIndex].image }}
            style={{ width: 300, height: 300, borderRadius: 12, marginBottom: 20 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
            {stretches[currentStretchIndex].name}
          </Text>
          <Text style={{ fontSize: 16, color: '#aaa', textAlign: 'center', marginBottom: 20, marginHorizontal: 20 }}>
            {stretches[currentStretchIndex].directions}
          </Text>

          {/* show the countdown or a message to start */}
          <Text style={{ fontSize: 20, color: isTimerActive ? '#FF6347' : '#aaa', marginBottom: 20 }}>
            {isTimerActive ? `Time Remaining: ${timeRemaining}s` : 'Ready? Press Start to Begin'}
          </Text>

          {/* start button only shows if timer is off */}
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
        // all done message
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
            Great Job! You Completed the Routine 🎉
          </Text>
        </View>
      )}

      {/* xp bar that shows up when xp is gained */}
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

export default RunningStretches;
