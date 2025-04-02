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
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const [showXpBar, setShowXpBar] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const animationValue = useRef(new Animated.Value(1)).current; // Animation value for opacity and height
  const xpBarWidth = useRef(new Animated.Value(0)).current; // Animated value for XP bar width
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animated value for XP bar opacity
  const startButtonOpacity = useRef(new Animated.Value(1)).current; // Animated value for Start button opacity
  const { addXp, xp, calculateLevel } = useXp();

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

  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleVideoSubmit = () => {
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      setSelectedVideoId(videoId);
    } else {
      alert('Invalid YouTube URL. Please try again.');
    }
  };

  const clearVideo = () => {
    setVideoUrl('');
    setSelectedVideoId(null);
  };

  const toggleHide = () => {
    Animated.timing(animationValue, {
      toValue: isHidden ? 1 : 0, // 1 for visible, 0 for hidden
      duration: 300,
      useNativeDriver: false, // Use for height and opacity animations
    }).start(() => {
      setIsHidden(!isHidden);
    });
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
            const xpToAdd = 7; // XP to add for each exercise
            addXp(xpToAdd);

            // Fade out Start button
            Animated.timing(startButtonOpacity, {
              toValue: 0, // Fully invisible
              duration: 500, // Fade-out duration
              useNativeDriver: true,
            }).start();

            // Show XP bar with animation
            setShowXpBar(true);

            // Animate XP bar width
            Animated.timing(xpBarWidth, {
              toValue: calculateFillPercentage(xp + xpToAdd),
              duration: 1000, // Animation duration
              useNativeDriver: false, // Width animation requires `false`
            }).start();

            // Fade in XP bar and text
            Animated.timing(fadeAnim, {
              toValue: 1, // Fully visible
              duration: 500, // Fade-in duration
              useNativeDriver: true,
            }).start();

            // Hide XP bar after 5 seconds
            setTimeout(() => {
              // Fade out XP bar and text
              Animated.timing(fadeAnim, {
                toValue: 0, // Fully invisible
                duration: 500, // Fade-out duration
                useNativeDriver: true,
              }).start(() => {
                setShowXpBar(false); // Hide after fade-out

                // Fade in Start button
                Animated.timing(startButtonOpacity, {
                  toValue: 1, // Fully visible
                  duration: 500, // Fade-in duration
                  useNativeDriver: true,
                }).start();

                setShowNextButton(true); // Show "Next" button
              });
            }, 5000);
          } else {
            setShowNextButton(true); // Show "Next" button immediately for rest steps
          }

          setIsTimerActive(false);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const calculateFillPercentage = (xp) => {
    const maxXp = 100; // Example max XP value
    return ((xp % maxXp) / maxXp) * 100;
  };

  const handleNext = () => {
    // Move to the next step
    setCurrentStep((prev) => (prev + 1) % steps.length);

    // Reset the timer
    const nextStepDuration = steps[(currentStep + 1) % steps.length].duration;
    setTimeRemaining(nextStepDuration);

    // Hide the "Next" button
    setShowNextButton(false);

    // Automatically start the timer for the next step
    setIsTimerActive(true);

    // Start the timer for the next step
    startTimer();
  };

  const { level } = calculateLevel(xp); // Calculate level for the XP bar

  return (
    <SafeAreaView style={styles.container}>
      {/* Modal for Exercise Description */}
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

      {/* YouTube URL Input and Buttons */}
      <Animated.View
        style={[
          styles.inputContainer,
          {
            opacity: animationValue,
            height: animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 60], // Adjust height for hiding
            }),
          },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Paste YouTube URL"
          placeholderTextColor="#000" // Set placeholder text color to black
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

      {/* YouTube Video Player */}
      {selectedVideoId && (
        <Animated.View
          style={[
            styles.videoContainer,
            {
              opacity: animationValue,
              height: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 200], // Adjust height for hiding
              }),
            },
          ]}
        >
          <WebView
            source={{ uri: `https://www.youtube.com/embed/${selectedVideoId}?playsinline=1` }}
            style={styles.webView}
            allowsFullscreenVideo={false} // Prevent fullscreen
            mediaPlaybackRequiresUserAction={false} // Prevent autoplay
            allowsInlineMediaPlayback={true} // Allow inline playback
          />
        </Animated.View>
      )}

      {/* Hide/Show Button */}
      <TouchableOpacity
        style={[styles.toggleButton, { marginTop: selectedVideoId ? 10 : 20 }]}
        onPress={toggleHide}
      >
        <Text style={styles.toggleButtonText}>
          {isHidden ? 'Show' : 'Hide'}
        </Text>
      </TouchableOpacity>

      {/* Exercise Section */}
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

      {/* XP Bar and Level */}
      {showXpBar && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 60,
            left: 16,
            right: 16,
            alignItems: 'center',
            opacity: fadeAnim, // Bind opacity to fadeAnim
          }}
        >
          {/* Level and XP */}
          <Text style={{ fontSize: 16, color: '#fff', marginBottom: 5 }}>
            Level: {calculateLevel(xp)} | XP: {xp}
          </Text>

          {/* XP Bar */}
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
    overflow: 'hidden', // Ensure hidden elements are clipped
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
    overflow: 'hidden', // Ensure hidden elements are clipped
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