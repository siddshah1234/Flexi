import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';

const WeightliftingStretches = () => {
  const [currentStretchIndex, setCurrentStretchIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // note for siddhant to look at his poe account for the stretches for weightlifting

  
  const stretches = [
    {
      name: 'Standing Arm Circles',
      duration: 30, // In seconds
      directions: 'Extend your arms out to the sides and make small circles, switching directions halfway.',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/arm-circles-exercise-illustration.gif',
    },
    {
      name: 'Overhead Triceps Stretch',
      duration: 30,
      directions: 'Bend one arm overhead and pull the elbow gently with your opposite hand. Switch arms.',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/triceps-stretch-exercise-illustration.gif',
    },
    {
      name: 'Cat-Cow Stretch',
      duration: 30,
      directions: 'On all fours, arch your back on an inhale, then round it on an exhale. Repeat slowly.',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/cat-back-stretch-exercise-illustration.gif',
    },
    {
      name: 'Hamstring Stretch',
      duration: 30,
      directions: 'Lie down with one leg extended and reach toward your foot. Switch legs after 30 seconds.',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/03/hamstring-stretch-exercise-illustration.gif',
    },
    {
      name: 'Hip Flexor Stretch',
      duration: 30,
      directions: 'Step into a lunge, keeping your back leg straight. Lean forward slightly. Switch sides.',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/03/hip-flexor-stretch-exercise-illustration.gif',
    },
    {
      name: 'Standing Side Stretch',
      duration: 15,
      directions: 'Reach one arm overhead and lean to the opposite side, stretching your side. Switch sides.',
      image: 'https://www.spotebi.com/wp-content/uploads/2016/02/standing-side-bend-exercise-illustration-spotebi.gif',
    },
    {
      name: 'Butterfly Stretch',
      duration: 30,
      directions: 'Sit with your feet together and knees out. Press your knees toward the floor gently as you lean forward.',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/03/butterfly-stretch-exercise-illustration.gif',
    },
    {
      name: 'Chest Stretch',
      duration: 30,
      directions: 'Sit with feet together, knees out, and gently press your knees toward the floor. Lean forward to stretch your chest.',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/06/chest-stretch-exercise-illustration.gif',
    },
    {
      name: 'Wrist Stretch',
      duration: 15,
      directions: 'Extend one arm with your palm facing up, and gently pull back your fingers with the opposite hand. Switch hands.',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/04/wrist-stretch-exercise-illustration.gif',
    },
  ];

  const startTimer = () => {
    setIsTimerActive(true);
    setTimeRemaining(stretches[currentStretchIndex].duration);

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimerActive(false);
          setCurrentStretchIndex((prevIndex) =>
            prevIndex < stretches.length - 1 ? prevIndex + 1 : prevIndex
          );
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#161622', padding: 16 }}>
      <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Weightlifting Stretches
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
            Great Job! You Completed the Routine 🎉
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default WeightliftingStretches;