import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useMusic } from '../../context/MusicContext'; // Adjust the path based on your file structure

const homehiit = () => {
  const { selectedTrack, setSelectedTrack } = useMusic(); // Access both selectedTrack and setSelectedTrack
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>HIIT Circuits</Text>

      {/* 🎵 Music Selection Buttons */}
      <View style={styles.musicRow}>
        {['chill', 'pop', 'rock'].map((track) => (
          <TouchableOpacity
            key={track}
            style={[
              styles.musicButton,
              selectedTrack === track && styles.musicButtonSelected,
            ]}
            onPress={() => setSelectedTrack(track)} // Set the selected track
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{track.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}

        {/* No Music Button */}
        <TouchableOpacity
          style={[
            styles.musicButton,
            selectedTrack === null && styles.musicButtonSelected,
          ]}
          onPress={() => setSelectedTrack(null)} // Stop music
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>NO MUSIC</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {/* Tabata HIIT */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('tabatahiit')} // Navigate without stopping music
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
          onPress={() => router.push('emomhiit')} // Navigate without stopping music
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
          onPress={() => router.push('amraphiit')} // Navigate without stopping music
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
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  musicRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  musicButton: {
    backgroundColor: '#444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  musicButtonSelected: {
    backgroundColor: '#E55837',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
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
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 6,
    borderRadius: 4,
  },
  description: {
    fontSize: 10,
    color: '#CDCDE0',
    textAlign: 'center',
    paddingHorizontal: 8,
    lineHeight: 14,
  },
});

export default homehiit;