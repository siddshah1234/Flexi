import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const YogaHomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Yoga Exercises</Text>
      <View style={styles.contentContainer}>
        {/* Beginner Yoga */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('BeginnerYoga')}
        >
          <ImageBackground
            source={{ uri: 'https://www.shape.com/thmb/VpFyNbpMYiZo4amlmpdtWZgut84=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Yoga-Poses-for-Beginners-GettyImages-961084648-b6270ad0ca174937a91b4b4d8e774974.jpg' }}
            style={styles.imageBackground}
          >
            <Text style={styles.cardText}>Beginner Yoga</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.description}>
          Start off with basic yoga. This is simple and easy meant for everyone! Just press start and follow the steps and images.
        </Text>
        <Text></Text>
        {/* Advanced Yoga */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('AdvancedYoga')}
        >
          <ImageBackground
            source={{ uri: 'https://vikasa.com/wp-content/uploads/2024/08/RAW09580-1024x631.jpg' }}
            style={styles.imageBackground}
          >
            <Text style={styles.cardText}>Advanced Yoga</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.description}>
          This is more advanced yoga. Make sure to practice and level up to prepare for these difficult poses! Just press start and follow the steps and images.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
    header: {
      fontSize: 32,
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5, // For Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 6,
  },
  description: {
    fontSize: 14,
    color: '#CDCDE0',
    marginTop: 10,
    marginHorizontal: 20,
    textAlign: 'center',
    lineHeight: 20, // Improved readability
  },
});

export default YogaHomeScreen;