import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const homehiit = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>HIIT Circuits</Text>
      <View style={styles.contentContainer}>
        {/* Tabata HIIT */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('tabatahiit')}
        >
          <ImageBackground
            source={{ uri: 'https://www.42klickschiro.com/wp-content/uploads/2022/09/man-doing-high-intensity-interval-workout.jpg' }}
            style={styles.imageBackground}
          >
            <Text style={styles.cardText}>Tabata HIIT</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.description}>
          Push hard for 20 seconds, then rest for 10. Quick bursts anyone can try! Just press start and follow the timer.
        </Text>

        {/* EMOM HIIT */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('emomhiit')}
        >
          <ImageBackground
            source={{ uri: 'https://www.healthdigest.com/img/gallery/why-hiit-workouts-are-great-for-people-short-on-time/intro-1654287104.jpg' }}
            style={styles.imageBackground}
          >
            <Text style={styles.cardText}>EMOM (Every Minute on the Minute)</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.description}>
          Start a new move every minute. Finish fast, then chill! Easy to follow and great for burning energy.
        </Text>

        {/* AMRAP HIIT */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('ampraphiit')}
        >
          <ImageBackground
            source={{ uri: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/15812/gettyimages-1436388527.jpg' }}
            style={styles.imageBackground}
          >
            <Text style={styles.cardText}>AMRAP (As Many Rounds As Possible)</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.description}>
          Pick a few moves and repeat them nonstop! Go at your pace and see how many rounds you can do.
        </Text>

        {/* Ladder HIIT */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('ladderhiit')}
        >
          <ImageBackground
            source={{ uri: 'https://www.insidefitnessmag.com/cdn/shop/articles/the-fitness-industrys-obsession-with-hiit-949423.jpg?v=1704406545' }}
            style={styles.imageBackground}
          >
            <Text style={styles.cardText}>Ladder HIIT</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.description}>
          Start small and build up each round. It’s fun, simple, and gets harder as you go! Just follow along.
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
    fontSize: 24, // Reduced font size
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
    width: '85%', // Reduced width
    height: 100, // Reduced height
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 14, // Reduced font size
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 6,
    borderRadius: 4,
  },
  description: {
    fontSize: 10, // Reduced font size
    color: '#CDCDE0',
    textAlign: 'center',
    paddingHorizontal: 8,
    lineHeight: 14, // Adjusted for readability
  },
});

export default homehiit;