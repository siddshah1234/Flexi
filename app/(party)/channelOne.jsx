import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useXp } from '../(tabs)/XpContext';

const steps = [
  {
    name: 'Jumping Jacks',
    duration: 20,
    image: 'https://www.spotebi.com/wp-content/uploads/2014/10/jumping-jacks-exercise-illustration.gif',
    description: 'Stand upright with your legs together and arms at your sides. Jump while spreading your legs and raising your arms overhead, then return to the starting position.',
  },
  {
    name: 'Rest',
    duration: 10,
    image: 'https://www.shutterstock.com/image-vector/woman-tired-resting-sit-after-260nw-2255199041.jpg',
    description: 'Take a short break to recover before the next exercise.',
  },
  {
    name: 'Squats',
    duration: 20,
    image: 'https://www.spotebi.com/wp-content/uploads/2014/10/squat-exercise-illustration.gif',
    description: 'Stand with your feet shoulder-width apart. Lower your body by bending your knees and pushing your hips back, then return to the starting position.',
  },
  {
    name: 'Rest',
    duration: 10,
    image: 'https://www.shutterstock.com/image-vector/woman-tired-resting-sit-after-260nw-2255199041.jpg',
    description: 'Take a short break to recover before the next exercise.',
  },
  {
    name: 'Push-Ups',
    duration: 20,
    image: 'https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.gif',
    description: 'Start in a plank position with your hands shoulder-width apart. Lower your body until your chest nearly touches the floor, then push back up to the starting position.',
  },
  {
    name: 'Rest',
    duration: 10,
    image: 'https://www.shutterstock.com/image-vector/woman-tired-resting-sit-after-260nw-2255199041.jpg',
    description: 'Take a short break to recover before the next exercise.',
  },
  {
    name: 'Mountain Climbers',
    duration: 20,
    image: 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration-spotebi.gif',
    description: 'Start in a plank position and alternate bringing your knees toward your chest. Keep your core engaged and move quickly.',
  },
  {
    name: 'Rest',
    duration: 10,
    image: 'https://www.shutterstock.com/image-vector/woman-tired-resting-sit-after-260nw-2255199041.jpg',
    description: 'Take a short break to recover before the next exercise.',
  },
];

const channelOne = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const [showXpBar, setShowXpBar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const xpBarWidth = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { addXp, xp, calculateLevel } = useXp();

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

          if (stepIndex < steps.length - 1) {
            setStepIndex((prevIndex) => prevIndex + 1); // Move to the next step
            setTimeLeft(steps[stepIndex + 1].duration); // Set the time for the next step
            startWorkout(); // Restart the workout for the next step
          } else {
            setRunning(false); // End the workout
          }
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
      {/* Video Call */}
      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: 'https://flexi.daily.co/channelOne' }}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          style={styles.webView}
        />
      </View>

      {/* Workout Section */}
      <View style={styles.workoutContainer}>
        {stepIndex < steps.length ? (
          <>
            <Image
              source={{ uri: steps[stepIndex].image }}
              style={styles.exerciseImage}
              resizeMode="contain"
            />
            <Text style={styles.name}>{steps[stepIndex].name}</Text>
            <Text style={styles.description}>{steps[stepIndex].description}</Text>
            <Text style={styles.timer}>
              {running ? `Time Left: ${timeLeft}s` : 'Ready to start?'}
            </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000',
    maxHeight: 300, // Limit the height of the video container
  },
  webView: {
    flex: 1,
    borderRadius: 10, // Add rounded corners to the WebView
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