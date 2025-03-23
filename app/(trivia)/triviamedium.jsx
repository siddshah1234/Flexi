import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Animated } from 'react-native';
import { useXp } from '../(tabs)/XpContext';

const triviamedium = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showXpBar, setShowXpBar] = useState(false);
  const xpBarWidth = useRef(new Animated.Value(0)).current; // Animated value for XP bar width
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animated value for opacity
  const { addXp, xp, calculateLevel } = useXp();

  const questions = [
    {
      question: 'What artist released the surprise album Folklore in 2020?',
      options: ['Billie Eilish', 'Taylor Swift', 'Ariana Grande', 'Halsey'],
      correctAnswer: 'Taylor Swift',
      exercise: 'Jump Squats',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/08/jump-squat-exercise-illustration.jpg',
      easy: '10 Jump Squats',
      hard: '20 Jump Squats',
    },
    {
      question: 'Who directed the movie Oppenheimer (2023)?',
      options: ['Quentin Tarantino', 'James Cameron', 'Christopher Nolan', 'Ridley Scott'],
      correctAnswer: 'Christopher Nolan',
      exercise: 'Superman Hold',
      image: 'https://www.spotebi.com/wp-content/uploads/2016/02/superman-exercise-illustration-spotebi.jpg',
      easy: '20s Superman Hold',
      hard: '40s Superman Hold',
    },
    {
      question: 'What is the name of Rihanna’s beauty brand?',
      options: ['Riri Beauty', 'Savage Beauty', 'Fenty Beauty', 'Shine by Rihanna'],
      correctAnswer: 'Fenty Beauty',
      exercise: 'Bicycle Crunches',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/bicycle-crunches-exercise-illustration.jpg',
      easy: '10 Bicycle Crunches (each side)',
      hard: '20 Bicycle Crunches (each side)',
    },
    {
      question: 'Which actor plays both Deadpool and voiced Pikachu in Detective Pikachu?',
      options: ['Chris Pratt', 'Ryan Reynolds', 'Paul Rudd', 'Hugh Jackman'],
      correctAnswer: 'Ryan Reynolds',
      exercise: 'Mountain Climbers',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration.jpg',
      easy: '15 Mountain Climbers',
      hard: '30 Mountain Climbers',
    },
    {
      question: 'What 2022 Netflix series became the platform’s most-watched English-language show in its first week?',
      options: ['Wednesday', 'You', 'Stranger Things 4', 'Squid Game'],
      correctAnswer: 'Wednesday',
      exercise: 'Russian Twists',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/04/russian-twist-exercise-illustration.jpg',
      easy: '20 Russian Twists',
      hard: '40 Russian Twists',
    },
    {
      question: 'Which rapper holds the record for the most Grammy wins of all time?',
      options: ['Kanye West', 'Eminem', 'Jay-Z', 'Beyoncé'],
      correctAnswer: 'Beyoncé',
      exercise: 'Burpees',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/burpees-exercise-illustration.jpg',
      easy: '10 Burpees',
      hard: '20 Burpees',
    },
    {
      question: 'Who starred as Elvis Presley in the 2022 biopic Elvis?',
      options: ['Harry Styles', 'Austin Butler', 'Timothée Chalamet', 'Ansel Elgort'],
      correctAnswer: 'Austin Butler',
      exercise: 'Lunges',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/lunges-exercise-illustration.jpg',
      easy: '10 Lunges',
      hard: '20 Lunges',
    },
    {
      question: 'What animated series features characters named Peter Griffin and Glenn Quagmire?',
      options: ['Futurama', 'Family Guy', 'Rick and Morty', 'Solar Opposites'],
      correctAnswer: 'Family Guy',
      exercise: 'Inchworms',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/01/inchworm-exercise-illustration.jpg',
      easy: '5 Inchworms',
      hard: '10 Inchworms',
    },
    {
      question: 'In what year did Stranger Things first premiere on Netflix?',
      options: ['2014', '2015', '2016', '2017'],
      correctAnswer: '2016',
      exercise: 'V-Ups',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/05/v-ups-exercise-illustration.jpg',
      easy: '10 V-Ups',
      hard: '20 V-Ups',
    },
    {
      question: 'Which singer made history as the first male to appear solo on the cover of Vogue magazine?',
      options: ['Justin Bieber', 'Harry Styles', 'Zayn Malik', 'Shawn Mendes'],
      correctAnswer: 'Harry Styles',
      exercise: 'Tricep Dips',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/04/tricep-dips-exercise-illustration.jpg',
      easy: '10 Tricep Dips',
      hard: '20 Tricep Dips',
    },
    {
      question: 'What movie features the fictional tech company “Weyland Corp”?',
      options: ['Blade Runner', 'Alien', 'Dune', 'Terminator'],
      correctAnswer: 'Alien',
      exercise: 'Toe Touches',
      image: 'https://www.spotebi.com/wp-content/uploads/2016/01/toe-touch-exercise-illustration.jpg',
      easy: '15 Toe Touches',
      hard: '30 Toe Touches',
    },
    {
      question: 'Which music festival was the focus of the Netflix documentary Fyre?',
      options: ['Coachella', 'Burning Man', 'Fyre Festival', 'Lollapalooza'],
      correctAnswer: 'Fyre Festival',
      exercise: 'High Knees',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/high-knees-exercise-illustration.jpg',
      easy: '20 High Knees',
      hard: '40 High Knees',
    },
    {
      question: 'What is the full name of Zendaya’s character in Euphoria?',
      options: ['Rue Bennett', 'Jules Vaughn', 'Lexi Howard', 'Kat Hernandez'],
      correctAnswer: 'Rue Bennett',
      exercise: 'Curtsy Lunges',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/01/curtsy-lunge-exercise-illustration.jpg',
      easy: '10 Curtsy Lunges',
      hard: '20 Curtsy Lunges',
    },
    {
      question: 'Which video game holds the record for highest-grossing entertainment product?',
      options: ['Fortnite', 'Minecraft', 'Grand Theft Auto V', 'Call of Duty'],
      correctAnswer: 'Grand Theft Auto V',
      exercise: 'Leg Raises',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/straight-leg-raise-exercise-illustration.jpg',
      easy: '10 Leg Raises',
      hard: '20 Leg Raises',
    },
    {
      question: 'What TV show is set in Hawkins, Indiana?',
      options: ['The Umbrella Academy', 'Stranger Things', 'Riverdale', 'Locke & Key'],
      correctAnswer: 'Stranger Things',
      exercise: 'Arm Circles',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/arm-circles-exercise-illustration.jpg',
      easy: '15 Arm Circles (each direction)',
      hard: '30 Arm Circles (each direction)',
    },
    {
      question: 'What singer played “Bubble” in Valerian and the City of a Thousand Planets?',
      options: ['Lady Gaga', 'Doja Cat', 'Rihanna', 'Nicki Minaj'],
      correctAnswer: 'Rihanna',
      exercise: 'Heel Touches',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/alternate-heel-touchers-exercise-illustration.jpg',
      easy: '20 Heel Touches',
      hard: '40 Heel Touches',
    },
    {
      question: 'Which actor voiced Lego Batman and BoJack Horseman?',
      options: ['Will Ferrell', 'Jason Bateman', 'Will Arnett', 'Seth Rogen'],
      correctAnswer: 'Will Arnett',
      exercise: 'Jog in Place',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/run-in-place-exercise-illustration.jpg',
      easy: '30s Jog in Place',
      hard: '60s Jog in Place',
    },
    {
      question: 'What 2017 horror film is the highest-grossing R-rated horror movie?',
      options: ['Hereditary', 'The Conjuring', 'It', 'Us'],
      correctAnswer: 'It',
      exercise: 'Pistol Squats',
      image: 'https://www.spotebi.com/wp-content/uploads/2015/05/pistol-squat-exercise-illustration.jpg',
      easy: '6 Pistol Squats (each leg)',
      hard: '12 Pistol Squats (each leg)',
    },
    {
      question: 'What movie features the sport Quidditch?',
      options: ['The Hunger Games', 'Harry Potter', 'Divergent', 'Twilight'],
      correctAnswer: 'Harry Potter',
      exercise: 'Plank',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/plank-exercise-illustration.jpg',
      easy: '30s Plank',
      hard: '60s Plank',
    },
    {
      question: 'Which K-pop group released “Kill This Love”?',
      options: ['Red Velvet', 'BLACKPINK', 'ITZY', 'TWICE'],
      correctAnswer: 'BLACKPINK',
      exercise: 'Mountain Climbers',
      image: 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration.jpg',
      easy: '20 Mountain Climbers',
      hard: '40 Mountain Climbers',
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
 
 export default triviamedium;