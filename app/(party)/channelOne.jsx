// this screen runs a video call + workout combo for channel one
// users can see others and do the circuit workout at the same time
// each workout step gives 15 xp
// the xp bar shows up after each step and fades away

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useXp } from '../(tabs)/XpContext';

// list of all exercises and rests in the circuit
const steps = [
  {
    name: 'Jumping Jacks',
    duration: 20,
    image: 'https://www.spotebi.com/wp-content/uploads/2014/10/jumping-jacks-exercise-illustration.gif',
    description: 'stand tall and jump while spreading your arms and legs, then return to start.',
  },
  {
    name: 'Rest',
    duration: 10,
    image: 'https://www.shutterstock.com/image-vector/woman-tired-resting-sit-after-260nw-2255199041.jpg',
    description: 'take a short break to recover before the next exercise.',
  },
  {
    name: 'Squats',
    duration: 20,
    image: 'https://www.spotebi.com/wp-content/uploads/2014/10/squat-exercise-illustration.gif',
    description: 'lower your body by bending your knees and pushing your hips back, then stand back up.',
  },
  {
    name: 'Rest',
    duration: 10,
    image: 'https://www.shutterstock.com/image-vector/woman-tired-resting-sit-after-260nw-2255199041.jpg',
    description: 'take a short break to recover before the next exercise.',
  },
  {
    name: 'Push-Ups',
    duration: 20,
    image: 'https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.gif',
    description: 'lower your chest to the floor then push back up. keep your body straight.',
  },
  {
    name: 'Rest',
    duration: 10,
    image: 'https://www.shutterstock.com/image-vector/woman-tired-resting-sit-after-260nw-2255199041.jpg',
    description: 'take a short break to recover before the next exercise.',
  },
  {
    name: 'Mountain Climbers',
    duration: 20,
    image: 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration-spotebi.gif',
    description: 'in plank position, move your knees toward your chest one at a time, fast.',
  },
  {
    name: 'Rest',
    duration: 10,
    image: 'https://www.shutterstock.com/image-vector/woman-tired-resting-sit-after-260nw-2255199041.jpg',
    description: 'take a short break to recover before the next exercise.',
  },
];

const channelOne = () => {
  // current step in the workout
  const [stepIndex, setStepIndex] = useState(0);
  // countdown timer
  const [timeLeft, setTimeLeft] = useState(0);
  // if timer is active
  const [running, setRunning] = useState(false);
  // to keep track of the timer
  const intervalRef = useRef(null);
  // xp bar visibility
  const [showXpBar, setShowXpBar] = useState(false);
  // modal visibility
  const [showModal, setShowModal] = useState(false);
  // xp system functions
  const xpBarWidth = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { addXp, xp, calculateLevel } = useXp();

  // starts the timer and gives xp
  const startWorkout = () => {
    setRunning(true);
    setTimeLeft(steps[stepIndex].duration);

    const calculateFillPercentage = (xp) => {
      const maxXp = 100;
      return ((xp % maxXp) / maxXp) * 100;
    };

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);

          // move to next step or end workout
          if (stepIndex < steps.length - 1) {
            setStepIndex((prevIndex) => prevIndex + 1);
            setTimeLeft(steps[stepIndex + 1].duration);
            startWorkout();
          } else {
            setRunning(false);
          }

          // add xp when step is done
          (async () => {
            try {
              const addedXp = 15;
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
    <SafeAreaView style={styles.container}>
      {/* video call section */}
      <View style={styles.videoContainer}>
        {/* WebView to run the video call */}
        <WebView
          source={{ uri: 'https://flexi.daily.co/channelOne' }}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          style={styles.webView}
        />
      </View>

      {/* workout section */}
      <View style={styles.workoutContainer}>
        {stepIndex < steps.length ? (
          <>
            {/* current step image */}
            <Image
              source={{ uri: steps[stepIndex].image }}
              style={styles.exerciseImage}
              resizeMode="contain"
            />
            {/* exercise name and info */}
            <Text style={styles.name}>{steps[stepIndex].name}</Text>
            <Text style={styles.description}>{steps[stepIndex].description}</Text>
            <Text style={styles.timer}>
              {running ? `Time Left: ${timeLeft}s` : 'Ready to start?'}
            </Text>
            {/* start button only if workout not running */}
            {!running && (
              <TouchableOpacity style={styles.button} onPress={startWorkout}>
                <Text style={styles.buttonText}>Start Workout</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Text style={styles.name}>🎉 You finished the circuit!</Text>
        )}
      </View>

      {/* xp bar that shows up after a step */}
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

export default channelOne;

// styles for layout and design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000',
    maxHeight: 300,
  },
  webView: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  workoutContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  exerciseImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 12,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  timer: {
    fontSize: 18,
    color: '#FF6347',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#E55837',
    padding: 14,
    borderRadius: 8,
    width: 180,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
