// this file is for the medium trivia screen
// it displays trivia questions with multiple-choice answers
// users earn xp for answering questions and see their progress with an xp bar
// wrong answers show the correct answer and assign a harder exercise
// the screen includes animations and a modal for exercise descriptions

import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Animated, Modal } from 'react-native';
import { useXp } from '../(tabs)/XpContext';

const triviamedium = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showXpBar, setShowXpBar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const xpBarWidth = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { addXp, xp, calculateLevel } = useXp();

  const questions = [
    {
      question: 'What artist released the surprise album Folklore in 2020?',
      options: ['Billie Eilish', 'Taylor Swift', 'Ariana Grande', 'Halsey'],
      correctAnswer: 'Taylor Swift',
      exercise: 'Jump Squats',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/08/jump-squat-exercise-illustration.gif',
      easy: '10 Jump Squats',
      hard: '20 Jump Squats',
      description: 'Start in a squat position, jump explosively, and land softly back into a squat. Repeat for the specified number of reps.',
    },
    {
      question: 'Who directed the movie Oppenheimer (2023)?',
      options: ['Quentin Tarantino', 'James Cameron', 'Christopher Nolan', 'Ridley Scott'],
      correctAnswer: 'Christopher Nolan',
      exercise: 'Superman Hold',
      image: 'https://www.spotebi.com/wp-content/uploads/2016/02/superman-exercise-illustration-spotebi.gif',
      easy: '20s Superman Hold',
      hard: '40s Superman Hold',
      description: 'Lie face down with your arms and legs extended. Lift your arms, chest, and legs off the ground and hold the position.',
    },
    {
      question: 'What is the name of Rihanna’s beauty brand?',
      options: ['Riri Beauty', 'Savage Beauty', 'Fenty Beauty', 'Shine by Rihanna'],
      correctAnswer: 'Fenty Beauty',
      exercise: 'Bicycle Crunches',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/bicycle-crunches-exercise-illustration.gif',
      easy: '10 Bicycle Crunches (each side)',
      hard: '20 Bicycle Crunches (each side)',
      description: 'Lie on your back with your hands behind your head. Alternate bringing your elbow to the opposite knee while extending the other leg.',
    },
    {
      question: 'Which actor plays both Deadpool and voiced Pikachu in Detective Pikachu?',
      options: ['Chris Pratt', 'Ryan Reynolds', 'Paul Rudd', 'Hugh Jackman'],
      correctAnswer: 'Ryan Reynolds',
      exercise: 'Mountain Climbers',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration-spotebi.gif',
      easy: '15 Mountain Climbers',
      hard: '30 Mountain Climbers',
      description: 'Start in a plank position and alternate bringing your knees toward your chest. Keep your core engaged and move quickly.',
    },
    {
      question: 'What 2022 Netflix series became the platform’s most-watched English-language show in its first week?',
      options: ['Wednesday', 'You', 'Stranger Things 4', 'Squid Game'],
      correctAnswer: 'Wednesday',
      exercise: 'Russian Twists',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/04/russian-twist-exercise-illustration.gif',
      easy: '20 Russian Twists',
      hard: '40 Russian Twists',
      description: 'Sit on the floor with your knees bent and feet lifted. Twist your torso side to side while keeping your core engaged.',
    },
    {
      question: 'Which rapper holds the record for the most Grammy wins of all time?',
      options: ['Kanye West', 'Eminem', 'Jay-Z', 'Beyoncé'],
      correctAnswer: 'Beyoncé',
      exercise: 'Burpees',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/burpees-exercise-illustration.gif',
      easy: '10 Burpees',
      hard: '20 Burpees',
      description: 'Start in a standing position, drop into a squat with your hands on the ground, kick your feet back into a plank, and jump back up.',
    },
    {
      question: 'Who starred as Elvis Presley in the 2022 biopic Elvis?',
      options: ['Harry Styles', 'Austin Butler', 'Timothée Chalamet', 'Ansel Elgort'],
      correctAnswer: 'Austin Butler',
      exercise: 'Lunges',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/lunges-exercise-illustration.gif',
      easy: '10 Lunges',
      hard: '20 Lunges',
      description: 'Step forward with one leg and lower your body until both knees are bent at 90 degrees. Push back up to the starting position and switch legs.',
    },
    {
      question: 'What animated series features characters named Peter Griffin and Glenn Quagmire?',
      options: ['Futurama', 'Family Guy', 'Rick and Morty', 'Solar Opposites'],
      correctAnswer: 'Family Guy',
      exercise: 'Inchworms',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/01/inchworm-exercise-illustration-spotebi.gif',
      easy: '5 Inchworms',
      hard: '10 Inchworms',
      description: 'Stand upright, bend forward to touch the ground, and walk your hands forward into a plank. Reverse the motion to return to standing.',
    },
    {
      question: 'In what year did Stranger Things first premiere on Netflix?',
      options: ['2014', '2015', '2016', '2017'],
      correctAnswer: '2016',
      exercise: 'V-Ups',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/05/v-ups-exercise-illustration.gif',
      easy: '10 V-Ups',
      hard: '20 V-Ups',
      description: 'Lie on your back, lift your legs and upper body simultaneously, and reach for your toes. Lower back down and repeat.',
    },
    {
      question: 'Which singer made history as the first male to appear solo on the cover of Vogue magazine?',
      options: ['Justin Bieber', 'Harry Styles', 'Zayn Malik', 'Shawn Mendes'],
      correctAnswer: 'Harry Styles',
      exercise: 'Tricep Dips',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/04/tricep-dips-exercise-illustration-spotebi.gif',
      easy: '10 Tricep Dips',
      hard: '20 Tricep Dips',
      description: 'Sit on the edge of a chair with your hands gripping the edge. Lower your body by bending your elbows, then push back up to the starting position.',
    },
  ];

  const current = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === current?.correctAnswer;

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    setShowResult(true);
  };

  const handleNext = () => {
    const xpToAdd = 5; // XP to add for each question
    addXp(xpToAdd);
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestionIndex((prev) => prev + 1);

    setShowXpBar(true);

    Animated.timing(xpBarWidth, {
      toValue: calculateFillPercentage(xp + xpToAdd),
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
  };

  const calculateFillPercentage = (xp) => {
    const maxXp = 100;
    return ((xp % maxXp) / maxXp) * 100;
  };

  const { level } = calculateLevel(xp);

  return (
    <SafeAreaView style={styles.container}>
      {currentQuestionIndex < questions.length ? (
        <View style={styles.content}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{current.question}</Text>

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

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
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
    color: '#ff0e0a',
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

export default triviamedium;