// this file is for the hard trivia screen
// it displays trivia questions with multiple-choice answers
// users earn xp for answering questions and see their progress with an xp bar
// wrong answers show the correct answer and assign a harder exercise
// the screen includes animations and a modal for exercise descriptions

import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Animated, Modal } from 'react-native';
import { useXp } from '../(tabs)/XpContext';

const triviahard = () => {
  // state for tracking the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // state for the selected answer
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // state to show the result of the current question
  const [showResult, setShowResult] = useState(false);
  // state to show the xp bar
  const [showXpBar, setShowXpBar] = useState(false);
  // state to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // animated values for xp bar and opacity
  const xpBarWidth = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // xp context for managing xp and levels
  const { addXp, xp, calculateLevel } = useXp();

  const questions = [
    {
      question: 'What’s the full name of the character Eleven in Stranger Things?',
      options: ['Jane Hopper', 'Jane Byers', 'Jane Ives', 'Jane Brenner'],
      correctAnswer: 'Jane Ives',
      exercise: 'Jump Squats',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/08/jump-squat-exercise-illustration.gif',
      easy: '25 Jump Squats',
      hard: '50 Jump Squats',
      description: 'Start in a squat position, jump explosively, and land softly back into a squat. Repeat for the specified number of reps.',
    },
    {
      question: 'Which film did Martin Scorsese win his first and only Oscar for Best Director?',
      options: ['Goodfellas', 'The Irishman', 'The Departed', 'Taxi Driver'],
      correctAnswer: 'The Departed',
      exercise: 'Push-Ups',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.gif',
      easy: '20 Push-Ups',
      hard: '40 Push-Ups',
      description: 'Start in a plank position with your hands shoulder-width apart. Lower your body until your chest nearly touches the floor, then push back up to the starting position.',
    },
    {
      question: 'Which 2000s pop star voiced a character in The Emoji Movie?',
      options: ['Britney Spears', 'Katy Perry', 'Avril Lavigne', 'Christina Aguilera'],
      correctAnswer: 'Katy Perry',
      exercise: 'Bicycle Crunches',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/bicycle-crunches-exercise-illustration.gif',
      easy: '25 Bicycle Crunches',
      hard: '50 Bicycle Crunches',
      description: 'Lie on your back with your hands behind your head. Alternate bringing your elbow to the opposite knee while extending the other leg.',
    },
    {
      question: 'What’s the name of the fictional metal in Avatar (2009) that humans are mining?',
      options: ['Unobtainium', 'Vibranium', 'Adamantium', 'Pandorium'],
      correctAnswer: 'Unobtainium',
      exercise: 'Mountain Climbers',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration-spotebi.gif',
      easy: '30 Mountain Climbers',
      hard: '60 Mountain Climbers',
      description: 'Start in a plank position and alternate bringing your knees toward your chest. Keep your core engaged and move quickly.',
    },
    {
      question: 'Which K-pop artist became the first to perform solo at Coachella?',
      options: ['CL', 'Jennie from BLACKPINK', 'Taeyang', 'IU'],
      correctAnswer: 'Jennie from BLACKPINK',
      exercise: 'Russian Twists',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/04/russian-twist-exercise-illustration.gif',
      easy: '30 Russian Twists',
      hard: '60 Russian Twists',
      description: 'Sit on the floor with your knees bent and feet lifted. Twist your torso side to side while keeping your core engaged.',
    },
    {
      question: 'In Breaking Bad, what does the acronym "RV" stand for?',
      options: ['Road Vehicle', 'Rolling Van', 'Recreational Vehicle', 'Remote Van'],
      correctAnswer: 'Recreational Vehicle',
      exercise: 'Burpees',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/burpees-exercise-illustration.gif',
      easy: '12 Burpees',
      hard: '24 Burpees',
      description: 'Start in a standing position, drop into a squat with your hands on the ground, kick your feet back into a plank, and jump back up.',
    },
    {
      question: 'What’s the name of the giant villain in Attack on Titan’s first season?',
      options: ['Armored Titan', 'Colossal Titan', 'Founding Titan', 'Beast Titan'],
      correctAnswer: 'Colossal Titan',
      exercise: 'Lunges',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/lunges-exercise-illustration.gif',
      easy: '20 Lunges',
      hard: '40 Lunges',
      description: 'Step forward with one leg and lower your body until both knees are bent at 90 degrees. Push back up to the starting position and switch legs.',
    },
    {
      question: 'Which actor played the Riddler in The Batman (2022)?',
      options: ['Jonah Hill', 'Paul Dano', 'Barry Keoghan', 'Jesse Eisenberg'],
      correctAnswer: 'Paul Dano',
      exercise: 'Inchworms',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/01/inchworm-exercise-illustration-spotebi.gif',
      easy: '10 Inchworms',
      hard: '20 Inchworms',
      description: 'Stand upright, bend forward to touch the ground, and walk your hands forward into a plank. Reverse the motion to return to standing.',
    },
    {
      question: 'Which Game of Thrones character holds the title “Breaker of Chains”?',
      options: ['Arya Stark', 'Jon Snow', 'Daenerys Targaryen', 'Cersei Lannister'],
      correctAnswer: 'Daenerys Targaryen',
      exercise: 'V-Ups',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/05/v-ups-exercise-illustration.gif',
      easy: '20 V-Ups',
      hard: '40 V-Ups',
      description: 'Lie on your back, lift your legs and upper body simultaneously, and reach for your toes. Lower back down and repeat.',
    },
    {
      question: 'Which band created the concept album American Idiot?',
      options: ['Blink-182', 'Green Day', 'My Chemical Romance', 'Paramore'],
      correctAnswer: 'Green Day',
      exercise: 'Tricep Dips',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/04/tricep-dips-exercise-illustration.gif',
      easy: '20 Tricep Dips',
      hard: '40 Tricep Dips',
      description: 'Sit on the edge of a chair with your hands gripping the edge. Lower your body by bending your elbows, then push back up to the starting position.',
    },
  ];

  // get the current question
  const current = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === current?.correctAnswer;

  // handle when a user selects an answer
  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    setShowResult(true);
  };

  // handle moving to the next question
  const handleNext = () => {
    const xpToAdd = 10; // xp to add for each question
    addXp(xpToAdd); // add xp to the user
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestionIndex((prev) => prev + 1);

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
      }).start(() => setShowXpBar(false)); // hide after fade-out
    }, 5000);
  };

  // calculate the xp bar fill percentage
  const calculateFillPercentage = (xp) => {
    const maxXp = 100; // example max xp value
    return ((xp % maxXp) / maxXp) * 100;
  };

  const { level } = calculateLevel(xp); // calculate level for the xp bar

  return (
    <SafeAreaView style={styles.container}>
      {currentQuestionIndex < questions.length ? (
        <View style={styles.content}>
          {/* question section */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{current.question}</Text>

            {/* show the correct answer if the user is wrong */}
            {showResult && !isCorrect && (
              <Text style={styles.wrongAnswerText}>
                Correct Answer: {current.correctAnswer}
              </Text>
            )}

            {current.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswer(option)}
                disabled={showResult}
                style={[
                  styles.optionButton,
                  selectedAnswer === option && { backgroundColor: '#E55837' },
                ]}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* result section */}
          {showResult && (
            <View style={styles.resultContainer}>
              <Text
                style={[
                  styles.resultText,
                  { color: isCorrect ? '#90ee90' : '#FF6347' },
                ]}
              >
                {isCorrect ? 'Correct! ✅' : 'Wrong ❌'}
              </Text>
              <Text style={styles.exerciseText}>
                Do this: {isCorrect ? current.easy : current.hard}
              </Text>
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Image
                  source={{ uri: current.image }}
                  style={styles.exerciseImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}

          {/* next button */}
          {!showXpBar && (
            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.endContainer}>
          <Text style={styles.endText}>All Done! Great job 💪</Text>
        </View>
      )}

      {/* xp bar and level */}
      {showXpBar && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 60,
            left: 16,
            right: 16,
            alignItems: 'center',
            opacity: fadeAnim, // bind opacity to fadeAnim
          }}
        >
          {/* level and xp */}
          <Text style={{ fontSize: 16, color: '#fff', marginBottom: 5 }}>
            Level: {calculateLevel(xp)} | XP: {xp}
          </Text>

          {/* xp bar */}
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

      {/* modal for exercise description */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade" // modal fades in and out
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{current.exercise}</Text>
            <Text style={styles.modalDescription}>{current.description}</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#161622',
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  questionContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  questionText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  wrongAnswerText: {
    fontSize: 16,
    color: '#ff0e0a', // red color for wrong answer
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    width: '90%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
  },
  resultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 5,
  },
  exerciseText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  exerciseImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 160,
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#E55837',
    padding: 14,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  endContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  endText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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

export default triviahard;