import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import RNPickerSelect from 'react-native-picker-select';
import { useRouter } from 'expo-router'; // Correct navigation routing

const BeginnerRunSetup = () => {
  const router = useRouter(); // Navigation hook
  const [speed, setSpeed] = useState('');
  const [time, setTime] = useState('');
  const [music, setMusic] = useState('chill'); // Default music option
  const [calculatedPace, setCalculatedPace] = useState('0.00'); // Calculated mph

  // Handle speed input and convert to mph
  const handleSpeedChange = (value) => {
    setSpeed(value);
    const stepsPerMinute = parseFloat(value);
    if (!isNaN(stepsPerMinute)) {
      const mph = (stepsPerMinute * 2.5) / 5280 * 60; // Formula for steps to mph
      setCalculatedPace(mph.toFixed(2)); // Update the calculated pace
    } else {
      setCalculatedPace('0.00');
    }
  };

  // Save data to file and navigate to session page
  const handleSaveAndStart = async () => {
    if (!speed || !time) {
      alert('Please fill out all fields!');
      return;
    }

    const filePath = `${FileSystem.documentDirectory}info.txt`;
    const data = JSON.stringify({ speed, time, music });
    await FileSystem.writeAsStringAsync(filePath, data);
    router.push('BeginnerRunSession'); // Ensure correct routing
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Beginner Run Setup</Text>
      <Text style={styles.recommendation}>
        Recommended Speed: 90-110 steps per minute. Running Time: 20-30 minutes.
      </Text>

      {/* Speed Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Target Speed (Steps per Minute):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g., 100"
          placeholderTextColor="#aaa"
          value={speed}
          onChangeText={handleSpeedChange}
        />
        <Text style={styles.paceText}>
          Approximate Pace: {calculatedPace} mph
        </Text>
      </View>

      {/* Time Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Running Time (Minutes):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g., 25"
          placeholderTextColor="#aaa"
          value={time}
          onChangeText={setTime}
        />
      </View>

      {/* Music Dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Music Preference:</Text>
        <RNPickerSelect
          onValueChange={(value) => setMusic(value)}
          items={[
            { label: 'Chill', value: 'chill' },
            { label: 'Upbeat', value: 'upbeat' },
            { label: 'Energetic', value: 'energetic' },
            { label: 'No Music', value: 'none' },
          ]}
          style={{
            inputIOS: styles.picker,
            inputAndroid: styles.picker,
          }}
          value={music}
          placeholder={{ label: 'Select a Music Preference', value: null }}
        />
      </View>

      {/* Save and Start Button */}
      <TouchableOpacity style={styles.startButton} onPress={handleSaveAndStart}>
        <Text style={styles.startButtonText}>Save and Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    padding: 20,
    justifyContent: 'flex-start', // Align items at the top
  },
  header: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 0, // Reduced margin for closer positioning
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  recommendation: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 25,
    width: '90%', // Reduced width
    alignSelf: 'center', // Center the input container
  },
  label: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#282828',
    color: '#fff',
    fontSize: 16,
    padding: 15,
    borderRadius: 10,
    borderColor: '#1E90FF',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  picker: {
    backgroundColor: '#282828',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    borderColor: '#1E90FF',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  paceText: {
    marginTop: 8,
    fontSize: 16,
    color: '#1E90FF',
  },
  startButton: {
    backgroundColor: '#1E90FF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '90%', // Reduced button width
    alignSelf: 'center', // Center the button
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  startButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BeginnerRunSetup;