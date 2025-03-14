import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Pedometer } from 'expo-sensors';

const MediumRun = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [steps, setSteps] = useState(0);
  const [distanceRan, setDistanceRan] = useState(0); // Distance in miles
  const [timeElapsed, setTimeElapsed] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false); // Track running state
  const [paceFeedback, setPaceFeedback] = useState('Just Right'); // Default pace feedback
  const targetPace = 8; // 8 minutes per mile (medium difficulty)

  useEffect(() => {
    const subscribe = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(String(isAvailable));

      if (isAvailable) {
        return Pedometer.watchStepCount((result) => {
          setSteps(result.steps);
          const distance = result.steps * 0.0004734848; // Average step to mile conversion
          setDistanceRan(distance);

          const currentPace = timeElapsed > 0 ? (timeElapsed / 60) / distance : targetPace;
          if (currentPace < targetPace - 1) {
            setPaceFeedback('Too Fast');
          } else if (currentPace > targetPace + 1) {
            setPaceFeedback('Too Slow');
          } else {
            setPaceFeedback('Just Right');
          }
        });
      }
    };

    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, [timeElapsed, distanceRan]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const startRun = () => {
    setIsRunning(true);
    setSteps(0); // Reset step count
    setDistanceRan(0); // Reset distance
    setTimeElapsed(0); // Reset time
  };

  const stopRun = () => {
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medium Run</Text>
      <Text style={styles.info}>
        Pedometer Available: {isPedometerAvailable}
      </Text>

      <View style={styles.stats}>
        <Text style={styles.statsText}>Steps: {steps}</Text>
        <Text style={styles.statsText}>
          Distance: {distanceRan.toFixed(2)} miles
        </Text>
        <Text style={styles.statsText}>
          Time Elapsed: {Math.floor(timeElapsed / 60)}:
          {timeElapsed % 60 < 10 ? '0' : ''}
          {timeElapsed % 60} minutes
        </Text>
        <Text style={styles.statsText}>Pace Feedback: {paceFeedback}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {!isRunning ? (
          <TouchableOpacity style={styles.button} onPress={startRun}>
            <Text style={styles.buttonText}>Start Run</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={stopRun}>
            <Text style={styles.buttonText}>Stop Run</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
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
  info: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 20,
  },
  stats: {
    backgroundColor: '#282828',
    padding: 16,
    borderRadius: 8,
    width: '90%',
    marginBottom: 20,
  },
  statsText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 16,
    borderRadius: 8,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MediumRun;
