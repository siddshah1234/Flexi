// this screen runs a 15 minute amrap workout
// amrap = as many rounds as possible
// user cycles through 5 exercises over and over until timer ends
// each full round gives 30 xp
// xp bar shows after each round and then fades away
// tapping the image shows a description of the exercise

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Animated, Modal, StyleSheet } from 'react-native';
import { useXp } from '../(tabs)/XpContext';

const amraphiit = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [amrapTime, setAmrapTime] = useState(900); // 15 minutes
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showXpBar, setShowXpBar] = useState(false);
  const [isRoundDone, setIsRoundDone] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // xp bar animation values
  const xpBarWidth = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // xp functions from context
  const { addXp, xp, calculateLevel } = useXp();

  // exercises for the circuit
  const exercises = [
    {
      name: 'Jump Squats (x10)',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/08/jump-squat-exercise-illustration.gif',
      description: 'start in a squat position, jump explosively, and land softly back into a squat. repeat for 10 reps.',
    },
    {
      name: 'Push-Ups (x10)',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.gif',
      description: 'lower your body until your chest nearly touches the floor. push back up while keeping your body straight. perform 10 reps.',
    },
    {
      name: 'Mountain Climbers (x20)',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration-spotebi.gif',
      description: 'start in a plank position and alternate bringing your knees toward your chest. perform 20 reps.',
    },
    {
      name: 'V-Ups (x10)',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/05/v-ups-exercise-illustration.gif',
      description: 'lie on your back, lift your legs and upper body together, and reach for your toes. perform 10 reps.',
    },
    {
      name: 'Plank Hold (30s)',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/plank-exercise-illustration.gif',
      description: 'hold a plank position with your body straight and your core tight for 30 seconds.',
    },
  ];

  // figure out xp bar percent
  const calculateFillPercentage = (xp) => {
    const maxXp = 100;
    return ((xp % maxXp) / maxXp) * 100;
  };

  // give xp and animate bar
  const awardXp = async () => {
    try {
      const addedXp = 30;
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
  };

  // go to next exercise or finish round
  const nextExercise = () => {
    if (currentStep < exercises.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsRoundDone(true);
      awardXp();
    }
  };

  // reset to first exercise and keep going
  const keepGoing = () => {
    setCurrentStep(0);
    setIsRoundDone(false);
  };

  // stop the workout
  const endCircuit = () => {
    setAmrapTime(0);
    setIsTimerActive(false);
  };

  // countdown timer for amrap
  useEffect(() => {
    if (isTimerActive && amrapTime > 0) {
      const timer = setInterval(() => {
        setAmrapTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isTimerActive, amrapTime]);

  // convert time to mm:ss
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#161622', padding: 16 }}>
      {/* title */}
      <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        AMRAP HIIT (15 Min)
      </Text>

      {amrapTime > 0 ? (
        <View style={{ alignItems: 'center' }}>
          {/* timer */}
          <Text style={{ fontSize: 20, color: '#fff', marginBottom: 10 }}>
            Time Left: {formatTime(amrapTime)}
          </Text>

          {!isRoundDone ? (
            <>
              {/* exercise image */}
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Image
                  source={{ uri: exercises[currentStep].image }}
                  style={{ width: 300, height: 300, borderRadius: 12, marginBottom: 20 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* exercise name */}
              <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
                {exercises[currentStep].name}
              </Text>

              {/* start or next button */}
              {!isTimerActive ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#E55837',
                    padding: 16,
                    borderRadius: 8,
                    width: 200,
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                  onPress={() => setIsTimerActive(true)}
                >
                  <Text style={{ fontSize: 18, color: '#fff' }}>Start</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#E55837',
                    padding: 16,
                    borderRadius: 8,
                    width: 200,
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                  onPress={nextExercise}
                >
                  <Text style={{ fontSize: 18, color: '#fff' }}>Next Exercise</Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <>
              {/* round done actions */}
              <Text style={{ fontSize: 22, color: '#fff', fontWeight: 'bold', marginBottom: 20 }}>
                Round Complete!
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#32CD32',
                  padding: 16,
                  borderRadius: 8,
                  width: 200,
                  alignItems: 'center',
                  marginBottom: 10,
                }}
                onPress={keepGoing}
              >
                <Text style={{ fontSize: 18, color: '#fff' }}>Keep Going 🔁</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: '#FF3B30',
                  padding: 16,
                  borderRadius: 8,
                  width: 200,
                  alignItems: 'center',
                }}
                onPress={endCircuit}
              >
                <Text style={{ fontSize: 18, color: '#fff' }}>End Circuit 🛑</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ) : (
        // workout complete message
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
            You Crushed the AMRAP! 💥🔥
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

      {/* exercise description modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{exercises[currentStep].name}</Text>
            <Text style={styles.modalDescription}>{exercises[currentStep].description}</Text>
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

export default amraphiit;
