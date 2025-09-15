// this file defines the Exercise Jeopardy game
// it includes categories, questions, and exercises for incorrect answers
// players earn points and XP for correct answers

import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Modal,
    Image,
    Animated
} from 'react-native';

import { useXp } from '../(tabs)/XpContext';

const exercises = [
    {
        name: 'Jump Squats (x10)',
        image: 'https://www.spotebi.com/wp-content/uploads/2015/08/jump-squat-exercise-illustration.gif',
        description: 'Start in a squat position, jump explosively, and land softly back into a squat. Repeat for 10 reps.',
    },
    {
        name: 'Push-Ups (x10)',
        image: 'https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.gif',
        description: 'Lower your body until your chest nearly touches the floor. Push back up while keeping your body straight. Perform 10 reps.',
    },
    {
        name: 'Mountain Climbers (x20)',
        image: 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration-spotebi.gif',
        description: 'Start in a plank position and alternate bringing your knees toward your chest. Perform 20 reps.',
    },
    {
        name: 'V-Ups (x10)',
        image: 'https://www.spotebi.com/wp-content/uploads/2015/05/v-ups-exercise-illustration.gif',
        description: 'Lie on your back, lift your legs and upper body simultaneously, and reach for your toes. Perform 10 reps.',
    },
    {
        name: 'Plank Hold (30s)',
        image: 'https://www.spotebi.com/wp-content/uploads/2014/10/plank-exercise-illustration.gif',
        description: 'Hold a plank position with your body straight and your core engaged for 30 seconds.',
    },
];

const categories = [
    {
        name: 'HIIT',
        questions: [
            { question: 'What does HIIT stand for?', options: ['High-Intensity Interval Training', 'High Impact Interval Training', 'High Intensity Impact Training'], answer: 'High-Intensity Interval Training', points: 100 },
            { question: 'How long is a typical HIIT workout?', options: ['10-20 minutes', '20-30 minutes', '30-40 minutes'], answer: '20-30 minutes', points: 200 },
            { question: 'What is a common HIIT exercise?', options: ['Jumping Jacks', 'Yoga', 'Walking'], answer: 'Jumping Jacks', points: 300 },
            { question: 'What is the main benefit of HIIT?', options: ['Burns calories', 'Improves flexibility', 'Builds muscle'], answer: 'Burns calories', points: 400 },
            { question: 'What is the rest period in HIIT called?', options: ['Recovery', 'Cooldown', 'Break'], answer: 'Recovery', points: 500 },
        ],
    },
    {
        name: 'Basics',
        questions: [
            { question: 'What is the largest muscle in the body?', options: ['Glutes', 'Biceps', 'Quads'], answer: 'Glutes', points: 100 },
            { question: 'What muscle is used in push-ups?', options: ['Chest', 'Legs', 'Back'], answer: 'Chest', points: 200 },
            { question: 'What exercise strengthens your legs?', options: ['Squats', 'Push-Ups', 'Plank'], answer: 'Squats', points: 300 },
            { question: 'What is a plank good for?', options: ['Core strength', 'Leg strength', 'Flexibility'], answer: 'Core strength', points: 400 },
            { question: 'What is the term for stretching before exercise?', options: ['Warm-up', 'Cooldown', 'Recovery'], answer: 'Warm-up', points: 500 },
        ],
    },
    {
        name: 'Stretch',
        questions: [
            { question: 'What is the benefit of stretching?', options: ['Improves flexibility', 'Builds muscle', 'Burns calories'], answer: 'Improves flexibility', points: 100 },
            { question: 'What is a common stretch for hamstrings?', options: ['Hamstring stretch', 'Quad stretch', 'Calf stretch'], answer: 'Hamstring stretch', points: 200 },
            { question: 'What stretch targets the quads?', options: ['Quad stretch', 'Hamstring stretch', 'Glute stretch'], answer: 'Quad stretch', points: 300 },
            { question: 'What is the benefit of dynamic stretching?', options: ['Warms up muscles', 'Builds muscle', 'Burns calories'], answer: 'Warms up muscles', points: 400 },
            { question: 'What is the term for overstretching?', options: ['Strain', 'Sprain', 'Tear'], answer: 'Strain', points: 500 },
        ],
    },
    {
        name: 'Cardio',
        questions: [
            { question: 'What is a common cardio exercise?', options: ['Running', 'Squats', 'Push-Ups'], answer: 'Running', points: 100 },
            { question: 'What is the benefit of cardio?', options: ['Heart health', 'Builds muscle', 'Improves flexibility'], answer: 'Heart health', points: 200 },
            { question: 'What is a short burst of cardio called?', options: ['Sprint', 'Jog', 'Walk'], answer: 'Sprint', points: 300 },
            { question: 'What is jogging at a steady pace called?', options: ['Jogging', 'Running', 'Walking'], answer: 'Jogging', points: 400 },
            { question: 'What is the target heart rate zone for cardio?', options: ['50-85%', '30-50%', '70-90%'], answer: '50-85%', points: 500 },
        ],
    },
    {
        name: 'Food',
        questions: [
            { question: 'What nutrient builds muscle?', options: ['Protein', 'Carbs', 'Fat'], answer: 'Protein', points: 100 },
            { question: 'What is the primary source of energy?', options: ['Carbs', 'Protein', 'Fat'], answer: 'Carbs', points: 200 },
            { question: 'How much water should you drink daily?', options: ['8 cups', '6 cups', '10 cups'], answer: '8 cups', points: 300 },
            { question: 'What is a healthy snack?', options: ['Fruit', 'Chips', 'Candy'], answer: 'Fruit', points: 400 },
            { question: 'What is the term for eating small meals?', options: ['Grazing', 'Snacking', 'Binging'], answer: 'Grazing', points: 500 },
        ],
    },
];

const jepordy = () => {
    const [teams, setTeams] = useState([]);
    const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
    const [usedQuestions, setUsedQuestions] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [exerciseModal, setExerciseModal] = useState(false);
    const [questionModal, setQuestionModal] = useState(false);
    const [pointsModal, setPointsModal] = useState(false);
    const [alreadyAnsweredModal, setAlreadyAnsweredModal] = useState(false);
    const [currentExercise, setCurrentExercise] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentPoints, setCurrentPoints] = useState(0);
    const [showXpBar, setShowXpBar] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const xpBarWidth = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const { addXp, xp, calculateLevel } = useXp();

    const startGame = (numTeams) => {
        const newTeams = Array.from({ length: numTeams }, (_, i) => ({
            name: `Team ${i + 1}`,
            score: 0,
        }));
        setTeams(newTeams);
        setGameStarted(true);
    };

    const calculateFillPercentage = (xp) => {
        const maxXp = 100;
        return ((xp % maxXp) / maxXp) * 100;
    };

    // Handle question press
    const handleQuestionPress = (categoryIndex, questionIndex) => {
        // get the question and the category
        const questionKey = `${categoryIndex}-${questionIndex}`;
        // check if the question has already been answered
        if (usedQuestions.includes(questionKey)) {
            // if it has, show the already answered modal
            setAlreadyAnsweredModal(true);
            return;
        }

        const currentQuestion = categories[categoryIndex].questions[questionIndex];
        setCurrentQuestion({ ...currentQuestion, categoryIndex, questionIndex });
        setQuestionModal(true);
    };

    const handleAnswer = (option) => {
        const { answer, points, categoryIndex, questionIndex } = currentQuestion;

        if (option === answer) {
            setCurrentPoints(points);
            updateScore(currentTeamIndex, points);
            setPointsModal(true); // Show points modal before moving to the next team
            (async () => {
                try {
                    const addedXp = 10;
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
        } else {
            const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
            setCurrentExercise(randomExercise);
            setExerciseModal(true);
            nextTeam(); // Move to the next team immediately for incorrect answers
        }

        setUsedQuestions((prev) => [...prev, `${categoryIndex}-${questionIndex}`]);
        setQuestionModal(false);
    };

    const closePointsModal = () => {
        setPointsModal(false);
        nextTeam(); // Move to the next team only after the points modal is closed
    };

    const updateScore = (teamIndex, points) => {
        setTeams((prevTeams) =>
            prevTeams.map((team, index) =>
                index === teamIndex ? { ...team, score: team.score + points } : team
            )
        );
    };

    const nextTeam = () => {
        setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teams.length);
    };

    if (!gameStarted) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>Exercise Jeopardy</Text>
                <Text style={styles.subHeader}>Select the number of teams:</Text>
                {[2, 3, 4].map((num) => (
                    <TouchableOpacity
                        key={num}
                        style={styles.teamButton}
                        onPress={() => startGame(num)}
                    >
                        <Text style={styles.teamButtonText}>{num} Teams</Text>
                    </TouchableOpacity>
                ))}
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Exercise Jeopardy</Text>

            {/* Current Turn */}
            <Text style={styles.currentTurn}>
                It's {teams[currentTeamIndex]?.name}'s turn!
            </Text>
            <View style={{ height: 80 }} />
            {/* Teams */}
            <View style={styles.teamsContainer}>
                {teams.map((team, index) => (
                    <View key={index} style={styles.team}>
                        <Text style={styles.teamName}>{team.name}</Text>
                        <Text style={styles.teamScore}>Score: {team.score}</Text>
                    </View>
                ))}
            </View>

            {/* Jeopardy Grid */}
            <View style={styles.grid}>
                {categories.map((category, categoryIndex) => (
                    <View key={categoryIndex} style={styles.column}>
                        <Text style={styles.categoryName}>{category.name}</Text>
                        {category.questions.map((question, questionIndex) => (
                            <TouchableOpacity
                                key={questionIndex}
                                style={[
                                    styles.questionCard,
                                    usedQuestions.includes(`${categoryIndex}-${questionIndex}`) && styles.usedQuestion,
                                ]}
                                onPress={() => handleQuestionPress(categoryIndex, questionIndex)}
                            >
                                <Text style={styles.pointsText}>{question.points}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>

            {/* Question Modal */}
            {currentQuestion && (
                <Modal
                    visible={questionModal}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setQuestionModal(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Question</Text>
                            <Text style={styles.modalSubtitle}>{currentQuestion.question}</Text>
                            {currentQuestion.options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.optionButton}
                                    onPress={() => handleAnswer(option)}
                                >
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setQuestionModal(false)}
                            >
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

            {/* Points Modal */}
            <Modal
                visible={pointsModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setPointsModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Correct!</Text>
                        <Text style={styles.modalSubtitle}>
                            {teams[currentTeamIndex]?.name} earned {currentPoints} points!
                        </Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setPointsModal(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Exercise Modal */}
            {currentExercise && (
                <Modal
                    visible={exerciseModal}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setExerciseModal(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Incorrect!</Text>
                            <Text style={styles.modalSubtitle}>
                                Perform the following exercise:
                            </Text>
                            <Image
                                source={{ uri: currentExercise.image }}
                                style={styles.exerciseImage}
                                resizeMode="contain"
                            />
                            <Text style={styles.exerciseName}>{currentExercise.name}</Text>
                            <Text style={styles.exerciseDescription}>
                                {currentExercise.description}
                            </Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setExerciseModal(false)}
                            >
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

            {/* Already Answered Modal */}
            <Modal
                visible={alreadyAnsweredModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setAlreadyAnsweredModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Question Already Answered</Text>
                        <Text style={styles.modalSubtitle}>
                            Please select another question.
                        </Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setAlreadyAnsweredModal(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        </SafeAreaView>
    );
};

export default jepordy;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161622',
        padding: 16,
    },
    header: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 20,
        color: '#aaa',
        textAlign: 'center',
        marginBottom: 20,
    },
    currentTurn: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    teamButton: {
        backgroundColor: '#E55837',
        padding: 16,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    teamButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    teamsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    team: {
        alignItems: 'center',
    },
    teamName: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    teamScore: {
        fontSize: 16,
        color: '#FF6347',
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
        alignItems: 'center',
    },
    categoryName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    questionCard: {
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        width: '90%',
        alignItems: 'center',
    },
    usedQuestion: {
        backgroundColor: '#555',
    },
    pointsText: {
        fontSize: 16,
        color: '#E55837',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: '80%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E55837',
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    exerciseImage: {
        width: 150,
        height: 150,
        marginBottom: 10,
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    exerciseDescription: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#E55837',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
        width: '100%',
    },
    optionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#E55837',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});