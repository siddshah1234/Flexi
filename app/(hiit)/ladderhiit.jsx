// this screen runs a ladder-style hiit workout
// exercises get longer, then shorter again (like a ladder)
// user does 3 different moves with breaks in between
// after each work step (not rest), user earns 20 xp
// xp bar shows progress and fades out after a few seconds
// user can tap on the exercise image to see instructions

import React, { useState, useRef } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Animated, Modal, StyleSheet } from 'react-native';
import { useXp } from '../(tabs)/XpContext';

const ladderhiit = () => {
  // keep track of what step the user is on
  const [currentStep, setCurrentStep] = useState(0);

  // timer for each round
  const [timeRemaining, setTimeRemaining] = useState(0);

  // is the timer running?
  const [isTimerActive, setIsTimerActive] = useState(false);

  // show xp bar when a step is complete
  const [showXpBar, setShowXpBar] = useState(false);

  // control if the exercise description is showing
  const [showModal, setShowModal] = useState(false);

  // xp bar and fade animation values
  const xpBarWidth = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // get xp functions from context
  const { addXp, xp, calculateLevel } = useXp();

  // list of exercises
  const EXERCISES = [
    {
      name: 'Jump Squats',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/08/jump-squat-exercise-illustration.gif',
      description: 'Start in a squat position and jump explosively. Land softly back into a squat and repeat.',
    },
    {
      name: 'Push-Ups',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.gif',
      description: 'Lower your body until your chest nearly touches the floor. Push back up while keeping your body straight.',
    },
    {
      name: 'Bicycle Crunches',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/bicycle-crunches-exercise-illustration.gif',
      description: 'Lie on your back and alternate bringing your elbow to the opposite knee in a pedaling motion.',
    },
  ];

  // rest image
  const REST_IMAGE = 'https://www.shutterstock.com/image-vector/woman-tired-resting-sit-after-260nw-2255199041.jpg';

  // time (in seconds) for each rep level
  const repDurations = [15, 25, 35, 45, 35, 25, 15];

  // generate all steps (each move + rest)
  const steps = [];
  repDurations.forEach((duration) => {
    EXERCISES.forEach((ex) => {
      steps.push({ name: ex.name, duration: duration, image: ex.image, description: ex.description });
    });
    steps.push({ name: 'Rest', duration: 30, image: REST_IMAGE, description: 'Take a short break to recover before the next set.' });
  });

  // figure out what percent of xp bar to fill
  const calculateFillPercentage = (xp) => {
    const maxXp = 100;
    return ((xp % maxXp) / maxXp) * 100;
  };

  // start the timer for the current step
  const startTimer = () => {
    setIsTimerActive(true);
    setTimeRemaining(steps[currentStep].duration);

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          // only give xp if it’s not a rest step
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

          // move to the next step or end the workout
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
      {/* screen title */}
      <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Ladder HIIT
      </Text>

      {currentStep < steps.length ? (
        <View style={{ alignItems: 'center' }}>
          {/* exercise image (tap to see description) */}
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

          {/* timer or message */}
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
        // end screen message
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
            awesome work! you crushed the ladder 💪🔥
          </Text>
        </View>
      )}

      {/* xp bar */}
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

      {/* modal for showing step description */}
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

// modal styles
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

export default ladderhiit;
