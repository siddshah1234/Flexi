// this screen is the home page for all the hiit workouts
// it lets the user pick a background music track
// user can tap a workout card to go to that specific hiit circuit
// music keeps playing when switching screens
// each workout has a description under its card

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useMusic } from '../../context/MusicContext';

const homehiit = () => {
  // get and set the selected music track
  const { selectedTrack, setSelectedTrack } = useMusic();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* screen title */}
      <Text style={styles.header}>HIIT Circuits</Text>

      {/* music selection buttons */}
      <View style={styles.musicRow}>
        {['chill', 'pop', 'rock'].map((track) => (
          <TouchableOpacity
            key={track}
            style={[
              styles.musicButton,
              selectedTrack === track && styles.musicButtonSelected,
            ]}
            onPress={() => setSelectedTrack(track)}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{track.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}

        {/* no music option */}
        <TouchableOpacity
          style={[
            styles.musicButton,
            selectedTrack === null && styles.musicButtonSelected,
          ]}
          onPress={() => setSelectedTrack(null)}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>NO MUSIC</Text>
        </TouchableOpacity>
      </View>

      {/* workout cards */}
      <View style={styles.contentContainer}>
        {/* tabata workout card */}
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
          push hard for 20 seconds, then rest for 10. quick bursts anyone can try! just press start and follow the timer.
        </Text>

        {/* emom workout card */}
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
          start a new move every minute. finish fast, then chill! easy to follow and great for burning energy.
        </Text>

        {/* amrap workout card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('amraphiit')}
        >
          <ImageBackground
            source={{ uri: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/15812/gettyimages-1436388527.jpg' }}
            style={styles.imageBackground}
          >
            <Text style={styles.cardText}>AMRAP (As Many Rounds As Possible)</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.description}>
          pick a few moves and repeat them nonstop! go at your pace and see how many rounds you can do.
        </Text>

        {/* ladder workout card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('ladderhiit')}
        >
          <ImageBackground
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH2HoYzX1P7QPZI8eQZD33kZfvyRH8Nd2KVQ&s' }} // base64 image
            style={styles.imageBackground}
          >
            <Text style={styles.cardText}>Ladder HIIT</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.description}>
          start with a couple of reps then add one more each round. keep going until you can't anymore! it's a fun way to challenge yourself.
        </Text>
      </View>
    </SafeAreaView>
  );
};

// styles for layout and design
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
