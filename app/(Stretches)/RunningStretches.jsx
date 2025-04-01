import React, { useState, useRef } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Animated, Modal } from 'react-native';
import { useXp } from '../(tabs)/XpContext';

const RunningStretches = () => {
  const [currentStretchIndex, setCurrentStretchIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showXpBar, setShowXpBar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const xpBarWidth = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { addXp, xp, calculateLevel } = useXp();

  const stretches = [
    {
      name: 'Leg Swings',
      duration: 30, // In seconds
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
          setCurrentStretchIndex((prevIndex) =>
            prevIndex < stretches.length - 1 ? prevIndex + 1 : prevIndex
          );
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
      <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Running Stretches
      </Text>

      {currentStretchIndex < stretches.length ? (
        <View style={{ alignItems: 'center' }}>
          {/* Stretch Image */}
          <Image
            source={{ uri: stretches[currentStretchIndex].image }}
            style={{ width: 300, height: 300, borderRadius: 12, marginBottom: 20 }}
            resizeMode="contain"
          />

          {/* Stretch Name */}
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
            {stretches[currentStretchIndex].name}
          </Text>

          {/* Stretch Directions */}
          <Text style={{ fontSize: 16, color: '#aaa', textAlign: 'center', marginBottom: 20, marginHorizontal: 20 }}>
            {stretches[currentStretchIndex].directions}
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
            Great Job! You Completed the Routine 🎉
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

export default RunningStretches;