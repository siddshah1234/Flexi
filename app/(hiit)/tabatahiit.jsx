import React, { useState, useRef } from 'react';
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
import { useXp } from '../(tabs)/XpContext';

const tabatahiit = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showXpBar, setShowXpBar] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const xpBarWidth = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { addXp, xp, calculateLevel } = useXp();

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

  const calculateFillPercentage = (xp) => {
    const maxXp = 100;
    return ((xp % maxXp) / maxXp) * 100;
  };

  const startTimer = () => {
    setIsTimerActive(true);
    setTimeRemaining(steps[currentStep].duration);

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          // Award XP only on exercises, not rest
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
      <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Tabata HIIT
      </Text>

      {currentStep < steps.length ? (
        <View style={{ alignItems: 'center' }}>
          {/* Exercise Image */}
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Image
              source={{ uri: steps[currentStep].image }}
              style={{ width: 300, height: 300, borderRadius: 12, marginBottom: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Exercise Name */}
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
            {steps[currentStep].name}
          </Text>

          {/* Timer */}
          {isTimerActive ? (
            <Text style={{ fontSize: 20, color: '#FF6347', marginBottom: 20 }}>
              Time Remaining: {timeRemaining}s
            </Text>
          ) : (
            <Text style={{ fontSize: 20, color: '#aaa', marginBottom: 20 }}>
              Ready? Press Start to Begin
            </Text>
          )}

          {/* Start Button */}
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
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
            Great Job! You Finished the Workout 🎉
          </Text>
        </View>
      )}

      {/* XP Bar */}
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

      {/* Modal for Exercise Description */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade" // Modal fades in and out
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