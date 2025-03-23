import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Animated } from 'react-native';
import { useXp } from '../(tabs)/XpContext';

const triviahard = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showXpBar, setShowXpBar] = useState(false);
  const xpBarWidth = useRef(new Animated.Value(0)).current; // Animated value for XP bar width
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animated value for opacity
  const { addXp, xp, calculateLevel } = useXp();

  const questions = [
    {
      question: 'What’s the full name of the character Eleven in Stranger Things?',
      options: ['Jane Hopper', 'Jane Byers', 'Jane Ives', 'Jane Brenner'],
      correctAnswer: 'Jane Ives',
      exercise: 'Jump Squats',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/08/jump-squat-exercise-illustration.jpg',
      easy: '25 Jump Squats',
      hard: '50 Jump Squats',
    },
    {
      question: 'Which film did Martin Scorsese win his first and only Oscar for Best Director?',
      options: ['Goodfellas', 'The Irishman', 'The Departed', 'Taxi Driver'],
      correctAnswer: 'The Departed',
      exercise: 'Push-Ups',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.jpg',
      easy: '20 Push-Ups',
      hard: '40 Push-Ups',
    },
    {
      question: 'Which 2000s pop star voiced a character in The Emoji Movie?',
      options: ['Britney Spears', 'Katy Perry', 'Avril Lavigne', 'Christina Aguilera'],
      correctAnswer: 'Katy Perry',
      exercise: 'Bicycle Crunches',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/bicycle-crunches-exercise-illustration.jpg',
      easy: '25 Bicycle Crunches',
      hard: '50 Bicycle Crunches',
    },
    {
      question: 'What’s the name of the fictional metal in Avatar (2009) that humans are mining?',
      options: ['Unobtainium', 'Vibranium', 'Adamantium', 'Pandorium'],
      correctAnswer: 'Unobtainium',
      exercise: 'Mountain Climbers',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration.jpg',
      easy: '30 Mountain Climbers',
      hard: '60 Mountain Climbers',
    },
    {
      question: 'Which K-pop artist became the first to perform solo at Coachella?',
      options: ['CL', 'Jennie from BLACKPINK', 'Taeyang', 'IU'],
      correctAnswer: 'Jennie from BLACKPINK',
      exercise: 'Russian Twists',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/04/russian-twist-exercise-illustration.jpg',
      easy: '30 Russian Twists',
      hard: '60 Russian Twists',
    },
    {
      question: 'In Breaking Bad, what does the acronym "RV" stand for?',
      options: ['Road Vehicle', 'Rolling Van', 'Recreational Vehicle', 'Remote Van'],
      correctAnswer: 'Recreational Vehicle',
      exercise: 'Burpees',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/burpees-exercise-illustration.jpg',
      easy: '12 Burpees',
      hard: '24 Burpees',
    },
    {
      question: 'What’s the name of the giant villain in Attack on Titan’s first season?',
      options: ['Armored Titan', 'Colossal Titan', 'Founding Titan', 'Beast Titan'],
      correctAnswer: 'Colossal Titan',
      exercise: 'Lunges',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/lunges-exercise-illustration.jpg',
      easy: '20 Lunges',
      hard: '40 Lunges',
    },
    {
      question: 'Which actor played the Riddler in The Batman (2022)?',
      options: ['Jonah Hill', 'Paul Dano', 'Barry Keoghan', 'Jesse Eisenberg'],
      correctAnswer: 'Paul Dano',
      exercise: 'Inchworms',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/01/inchworm-exercise-illustration.jpg',
      easy: '10 Inchworms',
      hard: '20 Inchworms',
    },
    {
      question: 'Which Game of Thrones character holds the title “Breaker of Chains”?',
      options: ['Arya Stark', 'Jon Snow', 'Daenerys Targaryen', 'Cersei Lannister'],
      correctAnswer: 'Daenerys Targaryen',
      exercise: 'V-Ups',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/05/v-ups-exercise-illustration.jpg',
      easy: '20 V-Ups',
      hard: '40 V-Ups',
    },
    {
      question: 'Which band created the concept album American Idiot?',
      options: ['Blink-182', 'Green Day', 'My Chemical Romance', 'Paramore'],
      correctAnswer: 'Green Day',
      exercise: 'Tricep Dips',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/04/tricep-dips-exercise-illustration.jpg',
      easy: '20 Tricep Dips',
      hard: '40 Tricep Dips',
    },
    {
      question: 'What is the name of the AI character voiced by Scarlett Johansson in Her?',
      options: ['Ava', 'Samantha', 'Ella', 'Nova'],
      correctAnswer: 'Samantha',
      exercise: 'Toe Touches',
      image: 'https://www.spotebi.com/wp-content/uploads/2016/01/toe-touch-exercise-illustration.jpg',
      easy: '25 Toe Touches',
      hard: '50 Toe Touches',
    },
    {
      question: 'In The Mandalorian, what is Grogu’s nickname?',
      options: ['Baby Yoda', 'Lil Jedi', 'Force Kid', 'Greenling'],
      correctAnswer: 'Baby Yoda',
      exercise: 'High Knees',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/high-knees-exercise-illustration.jpg',
      easy: '30 High Knees',
      hard: '60 High Knees',
    },
    {
      question: 'Which artist released a 10-minute version of a song that sparked major online debate in 2021?',
      options: ['Lana Del Rey', 'Taylor Swift', 'Billie Eilish', 'Doja Cat'],
      correctAnswer: 'Taylor Swift',
      exercise: 'Curtsy Lunges',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/01/curtsy-lunge-exercise-illustration.jpg',
      easy: '20 Curtsy Lunges',
      hard: '40 Curtsy Lunges',
    },
    {
      question: 'What’s the name of the giant blue cat-like creatures in Avatar?',
      options: ['Na\'vi', 'Navi', 'Neytiris', 'Pandorians'],
      correctAnswer: 'Na\'vi',
      exercise: 'Leg Raises',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/straight-leg-raise-exercise-illustration.jpg',
      easy: '20 Leg Raises',
      hard: '40 Leg Raises',
    },
    {
      question: 'Which singer starred in A Star is Born (2018)?',
      options: ['Ariana Grande', 'Lady Gaga', 'Miley Cyrus', 'Adele'],
      correctAnswer: 'Lady Gaga',
      exercise: 'Arm Circles',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/arm-circles-exercise-illustration.jpg',
      easy: '30 Arm Circles (each way)',
      hard: '60 Arm Circles (each way)',
    },
    {
      question: 'Who was the villain in Black Panther: Wakanda Forever (2022)?',
      options: ['Namor', 'Killmonger', 'Klaw', 'Doom'],
      correctAnswer: 'Namor',
      exercise: 'Heel Touches',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/alternate-heel-touchers-exercise-illustration.jpg',
      easy: '30 Heel Touches',
      hard: '60 Heel Touches',
    },
    {
      question: 'Which show is set in the fictional country of Genovia?',
      options: ['The Princess Diaries', 'The Crown', 'Bridgerton', 'Gossip Girl'],
      correctAnswer: 'The Princess Diaries',
      exercise: 'Jog in Place',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/run-in-place-exercise-illustration.jpg',
      easy: '60s Jog in Place',
      hard: '90s Jog in Place',
    },
    {
      question: 'Who directed Everything Everywhere All At Once (2022)?',
      options: ['Greta Gerwig', 'The Daniels', 'Jordan Peele', 'Chloe Zhao'],
      correctAnswer: 'The Daniels',
      exercise: 'Pistol Squats',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/05/pistol-squat-exercise-illustration.jpg',
      easy: '6 Pistol Squats (each leg)',
      hard: '12 Pistol Squats (each leg)',
    },
    {
      question: 'What 2014 music video became the first to hit 1 billion views on YouTube?',
      options: ['Gangnam Style', 'Baby', 'Dark Horse', 'Blank Space'],
      correctAnswer: 'Blank Space',
      exercise: 'Plank Hold',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/plank-exercise-illustration.jpg',
      easy: '40s Plank',
      hard: '70s Plank',
    },
    {
      question: 'Which anime character is known for the quote: “Power comes in response to a need, not a desire”?',
      options: ['Naruto Uzumaki', 'Goku', 'Eren Yeager', 'Light Yagami'],
      correctAnswer: 'Goku',
      exercise: 'Shoulder Taps',
      image: 'https://www.spotebi.com/wp-content/uploads/2016/03/plank-shoulder-tap-exercise-illustration-spotebi.jpg',
      easy: '25 Shoulder Taps',
      hard: '50 Shoulder Taps',
    },
  ];

  const current = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === current?.correctAnswer;
  
    const handleAnswer = (option) => {
      setSelectedAnswer(option);
      setShowResult(true);
    };
  
    const handleNext = () => {
      const xpToAdd = 10; // XP to add for each question
      addXp(xpToAdd); // Add XP to the user
      setSelectedAnswer(null);
      setShowResult(false);
      setCurrentQuestionIndex((prev) => prev + 1);
  
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
        }).start(() => setShowXpBar(false)); // Hide after fade-out
      }, 5000);
    };
  
    const calculateFillPercentage = (xp) => {
      const maxXp = 100; // Example max XP value
      return ((xp % maxXp) / maxXp) * 100;
    };
  
    const { level } = calculateLevel(xp); // Calculate level for the XP bar
  
    return (
      <SafeAreaView style={styles.container}>
        {currentQuestionIndex < questions.length ? (
          <View style={styles.content}>
            {/* Question Section */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{current.question}</Text>
  
              {/* Show the correct answer if the user is wrong */}
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
  
            {/* Result Section */}
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
                <Image
                  source={{ uri: current.image }}
                  style={styles.exerciseImage}
                  resizeMode="contain"
                />
              </View>
            )}
  
            {/* Next Button */}
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
    correctAnswerText: {
      fontSize: 16,
      color: '#90ee90', // Light green color for correct answer
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    wrongAnswerText: {
      fontSize: 16,
      color: '#ff0e0a', // Red color for wrong answer
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
  });
  
  export default triviahard;