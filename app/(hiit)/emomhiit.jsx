// this screen runs an emom hiit workout (every minute on the minute)
// each round is 60 seconds long, and the user does one exercise per round
// after each round, 30 xp is added and the level bar updates
// the user can tap the exercise image to see a short description in a popup
// once all rounds are done, the workout ends with a message

import React, { useState, useRef } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Animated, Modal, StyleSheet } from 'react-native';
import { useXp } from '../(tabs)/XpContext';

const emomhiit = () => {
  // track current step
  const [currentStep, setCurrentStep] = useState(0);

  // countdown time for each round
  const [timeRemaining, setTimeRemaining] = useState(60);

  // check if the timer is running
  const [isTimerActive, setIsTimerActive] = useState(false);

  // show xp bar after each round
  const [showXpBar, setShowXpBar] = useState(false);

  // control popup visibility
  const [showModal, setShowModal] = useState(false);

  // animated progress and fade for xp bar
  const xpBarWidth = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // get xp functions from context
  const { addXp, xp, calculateLevel } = useXp();

  // list of exercises to do in each round
  const steps = [
    {
      name: 'Burpees',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/burpees-exercise-illustration.gif',
      description: 'Start in a standing position, drop into a squat with your hands on the ground, kick your feet back into a plank, and jump back up.',
    },
    {
      name: 'Jump Lunges',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/02/jumping-lunges-exercise-illustration.gif',
      description: 'Start in a lunge position, jump up explosively, and switch legs mid-air before landing softly.',
    },
    {
      name: 'Push-Ups',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.gif',
      description: 'Lower your body until your chest nearly touches the floor. Push back up while keeping your body straight.',
    },
    {
      name: 'Bodyweight Squats',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/squat-exercise-illustration.gif',
      description: 'Stand with your feet shoulder-width apart, lower your body by bending your knees, and return to the starting position.',
    },
    {
      name: 'Mountain Climbers',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration-spotebi.gif',
      description: 'Start in a plank position and alternate bringing your knees toward your chest as quickly as possible.',
    },
    {
      name: 'Plank Hold',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/plank-exercise-illustration.gif',
      description: 'Hold a plank position with your body straight and your core engaged for the entire duration.',
    },
    {
      name: 'Jump Squats',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/08/jump-squat-exercise-illustration.gif',
      description: 'Start in a squat position, jump explosively, and land softly back into a squat.',
    },
    {
      name: 'V-Ups',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/05/v-ups-exercise-illustration.gif',
      description: 'Lie on your back, lift your legs and upper body simultaneously, and reach for your toes.',
    },
    {
      name: 'Side Plank (Switch Sides Halfway)',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/side-plank-exercise-illustration.gif',
      description: 'Hold a side plank position with your body straight and switch sides halfway through the duration.',
    },
    {
      name: 'Bulgarian Split Squats',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/05/bulgarian-split-squat-exercise-illustration-spotebi.gif',
      description: 'Place one foot on a bench behind you, lower your body into a lunge, and return to the starting position.',
    },
    {
      name: 'Diamond Push-Ups',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.gif',
      description: 'Form a diamond shape with your hands, lower your chest to your hands, and push back up.',
    },
  ];

  // calculates how full the xp bar should be
  const calculateFillPercentage = (xp) => {
    const maxXp = 100;
    return ((xp % maxXp) / maxXp) * 100;
  };

  // starts the timer and runs the xp logic when time hits 0
  const startTimer = () => {
    setIsTimerActive(true);
    setTimeRemaining(60);

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          // award xp at end of round
          (async () => {
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
          })();

          // move to next exercise or end workout
          if (currentStep < steps.length - 1) {
            setCurrentStep((prevIndex) => prevIndex + 1);
            setTimeRemaining(60);
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
      <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        EMOM HIIT
      </Text>

      {currentStep < steps.length ? (
        <View style={{ alignItems: 'center' }}>
          {/* show exercise image */}
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Image
              source={{ uri: steps[currentStep].image }}
              style={{ width: 300, height: 300, borderRadius: 12, marginBottom: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* show exercise name */}
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
            {steps[currentStep].name}
          </Text>

          {/* show timer countdown */}
          {isTimerActive ? (
            <Text style={{ fontSize: 20, color: '#FF6347', marginBottom: 20 }}>
              Time Remaining: {timeRemaining}s
            </Text>
          ) : (
            <Text style={{ fontSize: 20, color: '#aaa', marginBottom: 20 }}>
              Ready? Press Start to Begin
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
        // end message
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
            You Crushed All 15 Rounds! 💥🔥
          </Text>
        </View>
      )}

      {/* show xp bar */}
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

      {/* modal for showing exercise description */}
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

// styles for modal and buttons
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

export default emomhiit;
