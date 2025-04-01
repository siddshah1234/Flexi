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
        {/* Tabata HIIT */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('ladderhiit')} // Navigate without stopping music
        >
          <ImageBackground
            source={{ uri: 'data:image/jpeg;base64,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' }}
            style={styles.imageBackground}
          >
            <Text style={styles.cardText}>Ladder HIIT</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.description}>
          Start with a couple of reps then add one more each round. Keep going until you can't anymore! It's a fun way to challenge yourself.
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