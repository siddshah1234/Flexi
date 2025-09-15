// this screen lets you join group fitness activities
// you can either do a workout call or play a fitness game

import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const stretcheshome = () => {
    const router = useRouter(); // lets you go to different screens

    return (
        <SafeAreaView style={styles.container}>
            {/* page title */}
            <Text style={styles.header}>Group Activities</Text>

            <View style={styles.contentContainer}>
                {/* group workout button */}
                <TouchableOpacity style={styles.card} onPress={() => router.push('channelOne')}>
                    <ImageBackground
                        source={{ uri: 'https://blog.nasm.org/hubfs/nasm_ttedig_nd15_groupft_1208x808.jpg' }}
                        style={styles.imageBackground}
                    >
                        <Text style={styles.cardText}>Group Exercise</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <Text style={styles.description}>
                    join a call with your friends and exercise together! this helps you stay motivated and makes workouts more fun.
                </Text>

                {/* jeopardy game button */}
                <TouchableOpacity style={styles.card} onPress={() => router.push('jepordy')}>
                    <ImageBackground
                        source={{ uri: 'https://img.freepik.com/free-vector/quiz-game-stage-interior-design-background-competition-with-questions-television-trivia-show-three-stands-with-microphones-spotlight-screens-with-questions_575670-1939.jpg' }}
                        style={styles.imageBackground}
                    >
                        <Text style={styles.cardText}>Jeopardy</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <Text style={styles.description}>
                    play a game of jeopardy with your friends! it's a fun way to test your knowledge and stay active at the same time.
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default stretcheshome;

// styles for layout and design
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161622',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    header: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        height: 120,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 16,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 8,
        borderRadius: 6,
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        color: '#CDCDE0',
        textAlign: 'center',
        paddingHorizontal: 16,
        lineHeight: 20,
        marginBottom: 20,
    },
});
