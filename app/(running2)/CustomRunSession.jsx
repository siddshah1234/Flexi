import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Pedometer } from 'expo-sensors';

const CustomRunSession = () => {
  const [presetSpeed, setPresetSpeed] = useState(0); // Preset speed (steps/minute)
  const [time, setTime] = useState(0); // Total time in minutes
  const [music, setMusic] = useState(''); // Music preference
  const [elapsedTime, setElapsedTime] = useState(0); // Elapsed time in seconds
  const [distanceRan, setDistanceRan] = useState(0); // Distance ran in miles
  const [currentSpeed, setCurrentSpeed] = useState(0); // Current steps/minute
  const [isRunning, setIsRunning] = useState(false); // Running state
  const [paceFeedback, setPaceFeedback] = useState('Just Right'); // Feedback on pace
  const [stepCount, setStepCount] = useState(0); // Total step count
  const [pedometerSubscription, setPedometerSubscription] = useState(null); // Pedometer subscription
  const [isTracking, setIsTracking] = useState(false); // Step tracking state

  const filePath = `${FileSystem.documentDirectory}info.txt`;

  // Load settings from the file
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const fileExists = await FileSystem.getInfoAsync(filePath);
        if (fileExists.exists) {
          const data = await FileSystem.readAsStringAsync(filePath);
          const { speed, time, music } = JSON.parse(data);

          setPresetSpeed(parseFloat(speed));
          setTime(parseFloat(time));
          setMusic(music);

          // Delete the file after loading
          await FileSystem.deleteAsync(filePath);
        } else {
          alert('No run settings found!');
        }
      } catch (error) {
        console.error('Error reading file:', error);
      }
    };

    loadSettings();

    // Cleanup timer and pedometer subscription on unmount
    return () => {
      if (pedometerSubscription) pedometerSubscription.remove();
    };
  }, []);

  const startRun = () => {
    if (isRunning) return;

    setIsRunning(true);
    setIsTracking(true); // Start tracking steps
    const startTime = Date.now();
    let stepsAtLastInterval = 0;

    // Start pedometer
    const subscription = Pedometer.watchStepCount((result) => {
      const totalSteps = result.steps;
      const elapsedMinutes = (Date.now() - startTime) / (1000 * 60);

      // Update step count and distance
      setStepCount(totalSteps);
      const updatedDistance = (totalSteps * 2.5) / 5280; // Steps to miles
      setDistanceRan(updatedDistance);

      // Calculate current speed in steps per minute
      const stepsThisInterval = totalSteps - stepsAtLastInterval;
      const currentStepsPerMinute = (stepsThisInterval / elapsedMinutes) * 60;
      setCurrentSpeed(currentStepsPerMinute);

      // Update feedback based on current speed
      if (currentStepsPerMinute < presetSpeed * 0.9) {
        setPaceFeedback('Too Slow');
      } else if (currentStepsPerMinute > presetSpeed * 1.1) {
        setPaceFeedback('Too Fast');
      } else {
        setPaceFeedback('Just Right');
      }

      stepsAtLastInterval = totalSteps;
    });
    setPedometerSubscription(subscription);

    // Start timer
    const timer = setInterval(() => {
      setElapsedTime((prev) => {
        const updatedTime = prev + 1;

        // Stop the run when total time is reached
        if (updatedTime >= time * 60) {
          clearInterval(timer);
          stopRun();
          alert('Run Complete! Great job!');
        }

        return updatedTime;
      });
    }, 1000);
  };

  const stopRun = () => {
    setIsRunning(false);
    setIsTracking(false); // Stop tracking steps
    if (pedometerSubscription) {
      pedometerSubscription.remove();
      setPedometerSubscription(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{isRunning ? 'Run Active' : 'Run Paused'}</Text>

      {/* Feedback */}
      <Text style={[styles.feedback, getFeedbackStyle(paceFeedback)]}>{paceFeedback}</Text>

      {/* Run Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statText}>
          Time: {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')} / {time} mins
        </Text>
        <Text style={styles.statText}>
          Distance: {distanceRan.toFixed(2)} miles
        </Text>
        <Text style={styles.statText}>
          Current Speed: {currentSpeed.toFixed(2)} steps/min
        </Text>
        <Text style={styles.statText}>
          Preset Speed: {presetSpeed} steps/min
        </Text>
        <Text style={styles.statText}>Music: {music || 'None'}</Text>
        <Text style={styles.statText}>Steps Walked: {stepCount}</Text>
      </View>

      {/* Start/Stop Buttons */}
      <View style={styles.buttonContainer}>
        {!isRunning ? (
          <TouchableOpacity style={styles.startButton} onPress={startRun}>
            <Text style={styles.buttonText}>Start Run</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.stopButton} onPress={stopRun}>
            <Text style={styles.buttonText}>Stop Run</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const getFeedbackStyle = (feedback) => {
  switch (feedback) {
    case 'Too Slow':
      return { color: '#FF6347' }; // Red
    case 'Too Fast':
      return { color: '#FFA500' }; // Orange
    case 'Just Right':
      return { color: '#32CD32' }; // Green
    default:
      return { color: '#fff' }; // Default white
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  feedback: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  statText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  startButton: {
    backgroundColor: '#1E90FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '40%',
  },
  stopButton: {
    backgroundColor: '#FF6347',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '40%',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomRunSession;