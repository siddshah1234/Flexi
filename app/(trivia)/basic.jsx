// this file is for the basic workout screen
// it includes a timer-based workout with exercises and rest periods
// users can also play a youtube video for guidance
// xp is awarded for completing exercises, and progress is shown with an xp bar
// the screen also includes animations for transitions and modals for exercise details

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
  Modal,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useXp } from '../(tabs)/XpContext';

const basic = () => {
  // state for tracking the current step in the workout
  const [currentStep, setCurrentStep] = useState(0);
  // state for the timer countdown
  const [timeRemaining, setTimeRemaining] = useState(0);
  // state to check if the timer is active
  const [isTimerActive, setIsTimerActive] = useState(false);
  // state for the youtube video url
  const [videoUrl, setVideoUrl] = useState('');
  // state for the selected youtube video id
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  // state to toggle visibility of the video input
  const [isHidden, setIsHidden] = useState(false);
  // state to show the xp bar
  const [showXpBar, setShowXpBar] = useState(false);
  // state to show the "next" button
  const [showNextButton, setShowNextButton] = useState(false);
  // state to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // animation values for transitions
  const animationValue = useRef(new Animated.Value(1)).current;
  const xpBarWidth = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const startButtonOpacity = useRef(new Animated.Value(1)).current;

  // xp context for managing xp and levels
  const { addXp, xp, calculateLevel } = useXp();

  // list of workout steps with exercises and rest periods
  const steps = [
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
  ];

  // function to extract the video id from a youtube url
  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // function to handle youtube video submission
  const handleVideoSubmit = () => {
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      setSelectedVideoId(videoId);
    } else {
      alert('invalid youtube url. please try again.');
    }
  };

  // function to clear the video url and id
  const clearVideo = () => {
    setVideoUrl('');
    setSelectedVideoId(null);
  };

  // function to toggle the visibility of the video input
  const toggleHide = () => {
    Animated.timing(animationValue, {
      toValue: isHidden ? 1 : 0, // 1 for visible, 0 for hidden
      duration: 300,
      useNativeDriver: false, // Use for height and opacity animations
    }).start(() => {
      setIsHidden(!isHidden);
    });
  };

  // function to start the timer for the current step
  const startTimer = () => {
    setIsTimerActive(true);
    setTimeRemaining(steps[currentStep].duration);

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          // award xp only on exercises, not rest
          if (steps[currentStep].name !== 'Rest') {
            const xpToAdd = 7; // xp to add for each exercise
            addXp(xpToAdd);

            // fade out start button
            Animated.timing(startButtonOpacity, {
              toValue: 0, // fully invisible
              duration: 500, // fade-out duration
              useNativeDriver: true,
            }).start();

            // show xp bar with animation
            setShowXpBar(true);

            // animate xp bar width
            Animated.timing(xpBarWidth, {
              toValue: calculateFillPercentage(xp + xpToAdd),
              duration: 1000, // animation duration
              useNativeDriver: false, // width animation requires `false`
            }).start();

            // fade in xp bar and text
            Animated.timing(fadeAnim, {
              toValue: 1, // fully visible
              duration: 500, // fade-in duration
              useNativeDriver: true,
            }).start();

            // hide xp bar after 5 seconds
            setTimeout(() => {
              // fade out xp bar and text
              Animated.timing(fadeAnim, {
                toValue: 0, // fully invisible
                duration: 500, // fade-out duration
                useNativeDriver: true,
              }).start(() => {
                setShowXpBar(false); // hide after fade-out

                // fade in start button
                Animated.timing(startButtonOpacity, {
                  toValue: 1, // fully visible
                  duration: 500, // fade-in duration
                  useNativeDriver: true,
                }).start();

                setShowNextButton(true); // show "next" button
              });
            }, 5000);
          } else {
            setShowNextButton(true); // show "next" button immediately for rest steps
          }

          setIsTimerActive(false);
        }
        return prev - 1;
      });
    }, 1000);
  };

  // function to calculate the xp bar fill percentage
  const calculateFillPercentage = (xp) => {
    const maxXp = 100; // example max xp value
    return ((xp % maxXp) / maxXp) * 100;
  };

  // function to handle moving to the next step
  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length); // move to the next step
    setTimeRemaining(steps[(currentStep + 1) % steps.length].duration); // reset the timer
    setShowNextButton(false); // hide the "next" button
    startTimer(); // start the timer for the next step
  };

  const { level } = calculateLevel(xp); // calculate level for the xp bar

  return (
    <SafeAreaView style={styles.container}>
      {/* modal for exercise description */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{steps[currentStep].name}</Text>
            <Text style={styles.modalDescription}>
              {steps[currentStep].description}
            </Text>
            <Image
              source={{ uri: steps[currentStep].image }}
              style={styles.modalImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* youtube url input and buttons */}
      <Animated.View
        style={[
          styles.inputContainer,
          {
            opacity: animationValue,
            height: animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 60], // adjust height for hiding
            }),
          },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Paste YouTube URL"
          placeholderTextColor="#000"
          value={videoUrl}
          onChangeText={setVideoUrl}
          onSubmitEditing={handleVideoSubmit}
        />
        {videoUrl.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearVideo}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.playButton} onPress={handleVideoSubmit}>
          <Text style={styles.playButtonText}>Play Video</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* youtube video player */}
      {selectedVideoId && (
        <Animated.View
          style={[
            styles.videoContainer,
            {
              opacity: animationValue,
              height: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 200], // adjust height for hiding
              }),
            },
          ]}
        >
          <WebView
            source={{ uri: `https://www.youtube.com/embed/${selectedVideoId}?playsinline=1` }}
            style={styles.webView}
            allowsFullscreenVideo={false}
            mediaPlaybackRequiresUserAction={false}
            allowsInlineMediaPlayback={true}
          />
        </Animated.View>
      )}

      {/* hide/show button */}
      <TouchableOpacity
        style={[styles.toggleButton, { marginTop: selectedVideoId ? 10 : 20 }]}
        onPress={toggleHide}
      >
        <Text style={styles.toggleButtonText}>
          {isHidden ? 'Show' : 'Hide'}
        </Text>
      </TouchableOpacity>

      {/* exercise section */}
      <View style={styles.exerciseContainer}>
        {currentStep < steps.length ? (
          <>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Image
                source={{ uri: steps[currentStep].image }}
                style={styles.exerciseImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.exerciseName}>{steps[currentStep].name}</Text>

            {isTimerActive ? (
              <Text style={styles.timerText}>
                Time Remaining: {timeRemaining}s
              </Text>
            ) : (
              !showNextButton && (
                <Animated.View style={{ opacity: startButtonOpacity }}>
                  <TouchableOpacity style={styles.startButton} onPress={startTimer}>
                    <Text style={styles.startButtonText}>Start</Text>
                  </TouchableOpacity>
                </Animated.View>
              )
            )}

            {showNextButton && (
              <TouchableOpacity style={styles.startButton} onPress={handleNext}>
                <Text style={styles.startButtonText}>Next</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Text style={styles.finishedText}>
            Great Job! You Finished the Workout 🎉
          </Text>
        )}
      </View>

      {/* xp bar and level */}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#AAAAA',
  },
  clearButton: {
    backgroundColor: '#E55837',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playButton: {
    backgroundColor: '#E55837',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  toggleButton: {
    backgroundColor: '#444',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 10,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  videoContainer: {
    marginBottom: 10,
    overflow: 'hidden',
  },
  webView: {
    flex: 1,
    borderRadius: 8,
  },
  exerciseContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  exerciseImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  exerciseName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timerText: {
    fontSize: 20,
    color: '#FF6347',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#E55837',
    padding: 16,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  finishedText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
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
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
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

export default basic;