// this screen lets users choose between two types of stretching routines
// one is for running and the other is for weightlifting
// each option has an image card that you can click to go to the session
// there's also a short description under each card explaining what the stretch is for

import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const stretcheshome = () => {
    const router = useRouter(); // lets you navigate between pages

    return (
        <SafeAreaView style={styles.container}>
            {/* title of the page */}
            <Text style={styles.header}>Stretching Sessions</Text>

            {/* main area with stretch options */}
            <View style={styles.contentContainer}>
                {/* running stretches button */}
                <TouchableOpacity style={styles.card} onPress={() => router.push('RunningStretches')}>
                    <ImageBackground
                        source={{ uri: 'https://i.insider.com/5fecc6f9b7ab82001943ea53?width=700' }}
                        style={styles.imageBackground}
                    >
                        <Text style={styles.cardText}>Running Stretches</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <Text style={styles.description}>
                    loosen up your legs and hips with light stretches. perfect before or after a run to stay flexible and injury-free!
                </Text>

                {/* weightlifting stretches button */}
                <TouchableOpacity style={styles.card} onPress={() => router.push('WeightliftingStretches')}>
                    <ImageBackground
                        source={{ uri: 'https://www.planetfitness.com/sites/default/files/feature-image/manstretchingshoulders.jpg' }}
                        style={styles.imageBackground}
                    >
                        <Text style={styles.cardText}>Weightlifting Stretches</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <Text style={styles.description}>
                    relax your muscles after lifting heavy. these stretches help recover faster and improve flexibility over time!
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default stretcheshome;

// styles for the page layout and design
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161622',
        paddingHorizontal: 16,
        paddingTop: 10,
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '90%',
        height: 140,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        marginTop: 20,
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginBottom: 10,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        marginBottom: 80,
        width: '90%',
    },
});
