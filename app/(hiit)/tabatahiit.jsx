// this screen runs a tabata-style hiit workout
// each round is 20 seconds of work followed by 10 seconds rest
// user earns xp for every workout step (not rest)
// xp bar appears after workout steps and fades out after a few seconds
// users can tap exercise images to see a short description

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Modal,
  StyleSheet,
} from 'react-native';
import { Audio } from 'expo-av';
import { useXp } from '../(tabs)/XpContext';

const tabatahiit = () => {
  // current step in the workout
  const [currentStep, setCurrentStep] = useState(0);

  // countdown timer
  const [timeRemaining, setTimeRemaining] = useState(0);

  // is the timer running?
  const [isTimerActive, setIsTimerActive] = useState(false);

  // should the xp bar show?
  const [showXpBar, setShowXpBar] = useState(false);

  // is the description modal open?
  const [showModal, setShowModal] = useState(false);

  // xp animation and fade values
  const xpBarWidth = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // grab xp info from context
  const { addXp, xp, calculateLevel } = useXp();

  // all workout steps
  const steps = [
    {
      name: 'Jumping Jacks',
      duration: 20,
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/jumping-jacks-exercise-illustration.gif',
      description: 'Jump while spreading your legs and raising your arms overhead. Return to the starting position and repeat.',
    },
    {
      name: 'Rest',
      duration: 10,
      image: 'https://www.shutterstock.com/image-vector/woman-tired-resting-sit-after-260nw-2255199041.jpg',
      description: 'Take a short break to catch your breath and prepare for the next exercise.',
    },
    {
      name: 'Squats',
      duration: 20,
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/squat-exercise-illustration.gif',
      description: 'Lower your body by bending your knees and pushing your hips back. Keep your chest upright and return to the starting position.',
    },
    {
      name: 'Push-Ups',
      duration: 20,
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.gif',
      description: 'Lower your body until your chest nearly touches the floor. Push back up to the starting position while keeping your body straight.',
    },
    {
      name: 'Mountain Climbers',
      duration: 20,
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration-spotebi.gif',
      description: 'Start in a plank position and alternate bringing your knees toward your chest. Keep your core engaged and move quickly.',
    },
  ];

  // figure out xp fill percentage
  const calculateFillPercentage = (xp) => {
    const maxXp = 100;
    return ((xp % maxXp) / maxXp) * 100;
  };

  // start the timer and handle xp logic
  const startTimer = () => {
    setIsTimerActive(true);
    setTimeRemaining(steps[currentStep].duration);

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          // only award xp if not a rest step
          if (steps[currentStep].name !== 'Rest') {
            (async () => {
              try {
                const addedXp = 20;
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

          // move to next step or end
          if (currentStep < steps.length - 1) {
            setCurrentStep((prevIndex) => prevIndex + 1);
            setTimeRemaining(steps[currentStep + 1].duration);
            startTimer();
          } else {
            setIsTimerActive(false);
          }
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#161622', padding: 16 }}>
      {/* title */}
      <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Tabata HIIT
      </Text>

      {currentStep < steps.length ? (
        <View style={{ alignItems: 'center' }}>
          {/* tap image to open modal */}
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Image
              source={{ uri: steps[currentStep].image }}
              style={{ width: 300, height: 300, borderRadius: 12, marginBottom: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* exercise name */}
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
            {steps[currentStep].name}
          </Text>

          {/* countdown or start message */}
          {isTimerActive ? (
            <Text style={{ fontSize: 20, color: '#FF6347', marginBottom: 20 }}>
              Time Remaining: {timeRemaining}s
            </Text>
          ) : (
            <Text style={{ fontSize: 20, color: '#aaa', marginBottom: 20 }}>
              ready? press start to begin
            </Text>
          )}

          {/* start button */}
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
        // workout complete message
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
            great job! you finished the workout 🎉
          </Text>
        </View>
      )}

      {/* xp bar with animation */}
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

      {/* modal for exercise info */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{steps[currentStep].name}</Text>
            <Text style={styles.modalDescription}>{steps[currentStep].description}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// styles for modal and button
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E55837',
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#E55837',
    padding: 10,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default tabatahiit;
