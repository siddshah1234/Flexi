import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Animated, Modal } from 'react-native';
import { useXp } from '../(tabs)/XpContext';

const triviaeasy = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showXpBar, setShowXpBar] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const xpBarWidth = useRef(new Animated.Value(0)).current; // Animated value for XP bar width
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animated value for opacity
  const { addXp, xp, calculateLevel } = useXp();

  const questions = [
    {
      question: 'Which singer is known as the “Queen of Pop”?',
      options: ['Madonna', 'Beyoncé', 'Lady Gaga', 'Taylor Swift'],
      correctAnswer: 'Madonna',
      exercise: 'Jumping Jacks',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/jumping-jacks-exercise-illustration.gif',
      easy: '10 Jumping Jacks',
      hard: '20 Jumping Jacks',
      description: 'Stand upright with your legs together and arms at your sides. Jump while spreading your legs and raising your arms overhead, then return to the starting position.',
    },
    {
      question: 'What is the name of the fictional city where Batman lives?',
      options: ['Metropolis', 'Gotham City', 'Star City', 'Central City'],
      correctAnswer: 'Gotham City',
      exercise: 'Push-ups',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.gif',
      easy: '10 Push-ups',
      hard: '20 Push-ups',
      description: 'Start in a plank position with your hands shoulder-width apart. Lower your body until your chest nearly touches the floor, then push back up to the starting position.',
    },
    {
      question: 'Which movie features the quote “I am your father”?',
      options: ['The Matrix', 'Avengers: Endgame', 'Star Wars: The Empire Strikes Back', 'Harry Potter and the Sorcerer’s Stone'],
      correctAnswer: 'Star Wars: The Empire Strikes Back',
      exercise: 'Mountain Climbers',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration-spotebi.gif',
      easy: '15 Mountain Climbers',
      hard: '30 Mountain Climbers',
      description: 'Start in a plank position and alternate bringing your knees toward your chest. Keep your core engaged and move quickly.',
    },
    {
      question: 'Who plays Spider-Man in the MCU starting in 2016?',
      options: ['Andrew Garfield', 'Tobey Maguire', 'Tom Holland', 'Timothée Chalamet'],
      correctAnswer: 'Tom Holland',
      exercise: 'Squats',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/squat-exercise-illustration.gif',
      easy: '10 Squats',
      hard: '20 Squats',
      description: 'Stand with your feet shoulder-width apart. Lower your body by bending your knees and pushing your hips back, then return to the starting position.',
    },
    {
      question: 'What’s the name of the Netflix show about a girl with psychic powers and a shaved head?',
      options: ['Wednesday', 'Stranger Things', 'The Umbrella Academy', 'Riverdale'],
      correctAnswer: 'Stranger Things',
      exercise: 'Wall Sit',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/05/wall-sit-exercise-illustration.gif',
      easy: '20s Wall Sit',
      hard: '40s Wall Sit',
      description: 'Stand with your back against a wall and lower your body until your thighs are parallel to the floor. Hold this position while keeping your back flat against the wall.',
    },
    {
      question: 'Which artist painted the cover of Taylor Swift’s album Lover?',
      options: ['Banksy', 'Kelsey Montague', 'Shepard Fairey', 'Yayoi Kusama'],
      correctAnswer: 'Kelsey Montague',
      exercise: 'High Knees',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/high-knees-exercise-illustration.gif',
      easy: '10 High Knees (each leg)',
      hard: '20 High Knees (each leg)',
      description: 'Stand upright and jog in place while lifting your knees as high as possible. Keep your core engaged and move your arms in sync with your legs.',
    },
    {
      question: 'What popular game features a “Battle Bus”?',
      options: ['PUBG', 'Call of Duty', 'Fortnite', 'Apex Legends'],
      correctAnswer: 'Fortnite',
      exercise: 'Tricep Dips',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/04/tricep-dips-exercise-illustration-spotebi.gif',
      easy: '10 Tricep Dips',
      hard: '20 Tricep Dips',
      description: 'Sit on the edge of a chair with your hands gripping the edge. Lower your body by bending your elbows, then push back up to the starting position.',
    },
    {
      question: 'Who is the main character in the anime Naruto?',
      options: ['Sasuke', 'Naruto Uzumaki', 'Kakashi', 'Itachi'],
      correctAnswer: 'Naruto Uzumaki',
      exercise: 'Crunches',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/crunches-exercise-illustration.gif',
      easy: '10 Crunches',
      hard: '20 Crunches',
      description: 'Lie on your back with your knees bent and feet flat on the floor. Lift your upper body toward your knees, then lower back down.',
    },
    {
      question: 'Which social media platform is known for short dance and lip-sync videos?',
      options: ['Twitter', 'Instagram', 'TikTok', 'Snapchat'],
      correctAnswer: 'TikTok',
      exercise: 'Plank',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/plank-exercise-illustration.gif',
      easy: '20s Plank',
      hard: '40s Plank',
      description: 'Start in a push-up position with your forearms on the ground. Keep your body straight and hold the position for the specified time.',
    },
    {
      question: 'What is the name of the wizarding school in Harry Potter?',
      options: ['Ilvermorny', 'Durmstrang', 'Hogwarts', 'Beauxbatons'],
      correctAnswer: 'Hogwarts',
      exercise: 'Side Lunges',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/01/side-lunge-exercise-illustration.gif',
      easy: '10 Side Lunges',
      hard: '20 Side Lunges',
      description: 'Stand upright and step one leg to the side while keeping the other leg straight. Lower your body toward the bent leg, then return to the starting position.',
    },
    {
      question: 'Which 2023 movie stars Margot Robbie as a famous doll?',
      options: ['Barbie', 'Legally Blonde 3', 'Mean Girls', 'The Little Mermaid'],
      correctAnswer: 'Barbie',
      exercise: 'Calf Raises',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/05/calf-raises-exercise-illustration.gif',
      easy: '15 Calf Raises',
      hard: '30 Calf Raises',
      description: 'Stand upright with your feet shoulder-width apart. Raise your heels off the ground, then lower them back down.',
    },
    {
      question: 'What video game series includes characters like Mario, Luigi, and Bowser?',
      options: ['Sonic', 'Minecraft', 'Super Mario', 'Roblox'],
      correctAnswer: 'Super Mario',
      exercise: 'Arm Circles',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/arm-circles-exercise-illustration.gif',
      easy: '10 Arm Circles (each way)',
      hard: '20 Arm Circles (each way)',
      description: 'Extend your arms out to the sides at shoulder height. Rotate your arms in small circles forward and backward.',
    },
    {
      question: 'Who is the most-followed person on Instagram as of 2025?',
      options: ['Kylie Jenner', 'Cristiano Ronaldo', 'Taylor Swift', 'Selena Gomez'],
      correctAnswer: 'Cristiano Ronaldo',
      exercise: 'Toe Touches',
      image: 'https://www.spotebi.com/wp-content/uploads/2016/01/toe-touch-exercise-illustration-spotebi.gif',
      easy: '10 Toe Touches',
      hard: '20 Toe Touches',
      description: 'Lie on your back with your legs extended upward. Reach your hands toward your toes, then lower back down.',
    },
    {
      question: 'What K-pop group is known for songs like “Dynamite” and “Butter”?',
      options: ['BLACKPINK', 'BTS', 'EXO', 'TWICE'],
      correctAnswer: 'BTS',
      exercise: 'Side-to-Side Hops',
      image: 'https://www.spotebi.com/wp-content/uploads/2016/08/side-to-side-hops-exercise-illustration-spotebi.gif',
      easy: '15 Skaters',
      hard: '30 Skaters',
      description: 'Jump laterally from one foot to the other while swinging your arms. Land softly and repeat on the other side.',
    },
    {
      question: 'Which superhero has a vibranium shield?',
      options: ['Iron Man', 'Thor', 'Captain America', 'Black Panther'],
      correctAnswer: 'Captain America',
      exercise: 'Shoulder Taps',
      image: 'https://www.spotebi.com/wp-content/uploads/2016/03/plank-shoulder-tap-exercise-illustration-spotebi.gif',
      easy: '10 Shoulder Taps',
      hard: '20 Shoulder Taps',
      description: 'Start in a plank position and alternate tapping your shoulders with the opposite hand. Keep your core engaged to minimize hip movement.',
    },
    {
      question: 'What 2021 Disney movie features the magical Madrigal family?',
      options: ['Moana', 'Encanto', 'Coco', 'Luca'],
      correctAnswer: 'Encanto',
      exercise: 'March in Place',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/02/march-in-place-exercise-illustration.gif',
      easy: '15 Marches',
      hard: '30 Marches',
      description: 'Stand upright and march in place, lifting your knees high with each step. Swing your arms naturally as you march.',
    },
    {
      question: 'Who voices Groot in Guardians of the Galaxy?',
      options: ['Chris Pratt', 'Vin Diesel', 'Dwayne Johnson', 'Bradley Cooper'],
      correctAnswer: 'Vin Diesel',
      exercise: 'Lunges',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/lunges-exercise-illustration.gif',
      easy: '10 Lunges',
      hard: '20 Lunges',
      description: 'Step forward with one leg and lower your body until both knees are bent at 90 degrees. Push back up to the starting position and switch legs.',
    },
    {
      question: 'What Netflix show follows a chess prodigy named Beth Harmon?',
      options: ['Bridgerton', 'The Queen’s Gambit', 'Mindhunter', 'The Crown'],
      correctAnswer: 'The Queen’s Gambit',
      exercise: 'Slow Squats',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/squat-exercise-illustration.gif',
      easy: '10s Slow Squat',
      hard: '20s Slow Squat',
      description: 'Lower your body into a squat position slowly over a few seconds. Hold briefly at the bottom, then return to the starting position.',
    },
    {
      question: 'Which app uses a ghost logo?',
      options: ['Instagram', 'Snapchat', 'Discord', 'BeReal'],
      correctAnswer: 'Snapchat',
      exercise: 'Sit-Ups',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/sit-up-exercise-illustration.gif',
      easy: '10 Sit-Ups',
      hard: '20 Sit-Ups',
      description: 'Lie on your back with your knees bent and feet flat on the floor. Lift your upper body toward your knees, then lower back down.',
    },
    {
      question: 'What is the name of the villain in Avengers: Infinity War?',
      options: ['Loki', 'Ultron', 'Thanos', 'Kang'],
      correctAnswer: 'Thanos',
      exercise: 'Burpees',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/burpees-exercise-illustration.gif',
      easy: '10 Burpees',
      hard: '20 Burpees',
      description: 'Start in a standing position, drop into a squat with your hands on the ground, kick your feet back into a plank, and jump back up.',
    },
  ];

  const current = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === current?.correctAnswer;

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    setShowResult(true);
  };

  const handleNext = () => {
    const xpToAdd = 3; // XP to add for each question
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
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Image
                  source={{ uri: current.image }}
                  style={styles.exerciseImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
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

      {/* Modal for Exercise Description */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade" // Modal fades in and out
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

export default triviaeasy;