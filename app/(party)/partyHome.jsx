import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const stretcheshome = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Group Activities</Text>

            <View style={styles.contentContainer}>
                {/* Running Stretches */}
                <TouchableOpacity style={styles.card} onPress={() => router.push('allChannel')}>
                    <ImageBackground
                        source={{ uri: 'https://blog.nasm.org/hubfs/nasm_ttedig_nd15_groupft_1208x808.jpg' }}
                        style={styles.imageBackground}
                    >
                        <Text style={styles.cardText}>Group Exercise</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <Text style={styles.description}>
                    Join a call with your friends and exercise together! With this, you can easily stay motivated and have fun while working out.
                </Text>

                {/* Weightlifting Stretches */}
                <TouchableOpacity style={styles.card} onPress={() => router.push('jepordy')}>
                    <ImageBackground
                        source={{ uri: 'https://img.freepik.com/free-vector/quiz-game-stage-interior-design-background-competition-with-questions-television-trivia-show-three-stands-with-microphones-spotlight-screens-with-questions_575670-1939.jpg' }}
                        style={styles.imageBackground}
                    >
                        <Text style={styles.cardText}>Jeopardy</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <Text style={styles.description}>
                    Play a game of Jeopardy with your friends! This is a great way to test your knowledge, have fun, and exercise all at the same time.
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default stretcheshome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161622',
        paddingHorizontal: 16, // Add padding to the left and right
        paddingTop: 20,
    },
    header: {
        fontSize: 28, // Make the header larger
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20, // Add more space below the header
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    card: {
        width: '100%', // Make the card take full width
        height: 120, // Increase the height for better visuals
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 16, // Add spacing between cards
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 16, // Increase font size for better readability
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Make the background slightly darker
        padding: 8,
        borderRadius: 6,
        textAlign: 'center',
    },
    description: {
        fontSize: 14, // Increase font size for better readability
        color: '#CDCDE0',
        textAlign: 'center',
        paddingHorizontal: 16, // Add padding to the left and right
        lineHeight: 20, // Increase line height for better spacing
        marginBottom: 20, // Add spacing below the description
    },
});