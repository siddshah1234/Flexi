import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { WebView } from 'react-native-webview';

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

  const startWorkout = () => {
    setRunning(true);
    setTimeLeft(steps[stepIndex].duration);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          if (stepIndex < steps.length - 1) {
            setStepIndex(stepIndex + 1);
            setTimeout(() => startWorkout(), 1000);
          } else {
            setRunning(false);
          }
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
          style={{ flex: 1 }}
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
