import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const triviahome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Trivia Game</Text>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('triviaeasy')}
        >
          <ImageBackground
            source={{ uri: 'https://media.istockphoto.com/id/925839916/photo/beautiful-man-looking-suprised-and-bewildered-isolated-on-blue.jpg?s=612x612&w=0&k=20&c=JO72opXwKETt9puzxkw1_P1r-pd9hEtkfTNmd207D_U=' }}
            style={styles.imageBackground}
          >
            <Text style={styles.cardText}>Easy Trivia</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.description}>
          Start easy! Answer correctly and get a light workout. Get it wrong, and you'll have to work a little harder!
        </Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('triviamedium')}
        >
          <ImageBackground
            source={{ uri: 'https://miro.medium.com/v2/resize:fit:1400/1*aN8Q10jLmr_1-mQ0qN5QeA.jpeg' }}
            style={styles.imageBackground}
          >
            <Text style={styles.cardText}>Medium Trivia</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.description}>
          The challenge increases! Right answers keep it manageable, but wrong answers mean tougher exercises. Stay sharp!
        </Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('triviahard')}
        >
          <ImageBackground
            source={{ uri: 'https://www.psychologs.com/wp-content/uploads/2023/12/signs-of-intelligent-people.png' }}
            style={styles.imageBackground}
          >
            <Text style={styles.cardText}>Hard Trivia</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.description}>
          Only for the strong! Correct answers push you, but mistakes mean intense workouts. Are you up for it?
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    fontSize: 28, // Reduced font size to fit
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-evenly', // Distribute items evenly
    alignItems: 'center',
  },
  card: {
    width: '90%', // Reduced width to fit
    height: 120, // Reduced height to fit
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5, // Android shadow
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
    fontSize: 18, // Reduced font size to fit
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 6,
  },
  description: {
    fontSize: 12, // Reduced font size to fit
    color: '#CDCDE0',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 16, // Adjusted for readability
  },
});

export default triviahome;