import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Pedometer } from 'expo-sensors';

const AdvancedRunningCircuit = () => {
  const [elapsedTime, setElapsedTime] = useState(0); // Time in seconds
  const [distanceRan, setDistanceRan] = useState(0); // Distance in miles
  const [currentSpeed, setCurrentSpeed] = useState(0); // Live steps per minute
  const [stepCount, setStepCount] = useState(0); // Total steps
  const [isRunning, setIsRunning] = useState(false); // Circuit state
  const [paceFeedback, setPaceFeedback] = useState('Just Right'); // Feedback on pace
  const [pedometerSubscription, setPedometerSubscription] = useState(null); // Pedometer subscription

  const targetSpeed = 120; // Target steps per minute
  const totalTime = 30 * 60; // 30 minutes in seconds
  const totalDistance = ((targetSpeed * 2.5) / 5280) * (totalTime / 60); // Approximate distance in miles

  // Start Pedometer
  const startPedometer = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      const totalSteps = result.steps;
      const elapsedMinutes = elapsedTime / 60;

      // Calculate live steps per minute and distance
      const liveSpeed = (totalSteps / elapsedMinutes).toFixed(2);
      const calculatedDistance = (totalSteps * 2.5) / 5280;

      setCurrentSpeed(liveSpeed);
      setStepCount(totalSteps);
      setDistanceRan(calculatedDistance);

      // Update pace feedback
      if (liveSpeed < targetSpeed * 0.9) {
        setPaceFeedback('Too Slow');
      } else if (liveSpeed > targetSpeed * 1.1) {
        setPaceFeedback('Too Fast');
      } else {
        setPaceFeedback('Just Right');
      }
    });

    setPedometerSubscription(subscription);
  };

  // Stop Pedometer
  const stopPedometer = () => {
    if (pedometerSubscription) {
      pedometerSubscription.remove();
      setPedometerSubscription(null);
    }
  };

  // Handle run start
  const startRun = () => {
    setIsRunning(true);
    startPedometer();

    // Start timer
    const timer = setInterval(() => {
      setElapsedTime((prev) => {
        if (prev >= totalTime) {
          clearInterval(timer);
          stopRun();
          alert('Advanced Circuit Complete! Amazing work!');
        }
        return prev + 1;
      });
    }, 1000);
  };

  // Handle run stop
  const stopRun = () => {
    setIsRunning(false);
    stopPedometer();
  };

  useEffect(() => {
    return () => {
      stopPedometer(); // Ensure pedometer subscription is stopped on unmount
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{isRunning ? 'Advanced Circuit Active' : 'Circuit Paused'}</Text>

      {/* Pace Feedback */}
      <Text style={[styles.feedback, getFeedbackStyle(paceFeedback)]}>{paceFeedback}</Text>

      {/* Circuit Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statText}>
          Time: {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')} / 30:00 mins
        </Text>
        <Text style={styles.statText}>
          Distance: {distanceRan.toFixed(2)} / {totalDistance.toFixed(2)} miles
        </Text>
        <Text style={styles.statText}>
          Current Speed: {currentSpeed.toFixed(2)} steps/min
        </Text>
        <Text style={styles.statText}>
          Target Speed: {targetSpeed} steps/min
        </Text>
      </View>

      {/* Start/Stop Buttons */}
      <View style={styles.buttonContainer}>
        {!isRunning ? (
          <TouchableOpacity style={styles.startButton} onPress={startRun}>
            <Text style={styles.buttonText}>Start Circuit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.stopButton} onPress={stopRun}>
            <Text style={styles.buttonText}>Stop Circuit</Text>
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

export default AdvancedRunningCircuit;
