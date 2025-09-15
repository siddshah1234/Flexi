// this file defines a MusicContext provider
// it manages background music playback and provides control over track selection

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

// Create the MusicContext
const MusicContext = createContext();

// MusicProvider component to wrap your app and provide the context
export const MusicProvider = ({ children }) => {
  const [selectedTrack, setSelectedTrack] = useState(null); // Default is no music
  const [sound, setSound] = useState(null); // State to manage the audio object

  // Function to play music
  const playMusic = async (track) => {
    try {
      // Stop and unload any currently playing sound
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }

      // If no track is selected, exit early
      if (!track) return;

      // Load and play the new track
      const { sound: newSound } = await Audio.Sound.createAsync(
        getTrackUri(track),
        { shouldPlay: true, isLooping: true }
      );
      setSound(newSound);
    } catch (error) {
      console.error('Error playing music:', error);
    }
  };

  // Function to get the URI of the track
  const getTrackUri = (track) => {
    switch (track) {
      case 'chill':
        return require('../assets/music/chill.mp3');
      case 'pop':
        return require('../assets/music/pop.mp3');
      case 'rock':
        return require('../assets/music/rock.mp3');
      default:
        return null;
    }
  };

  // Effect to play music when the selected track changes
  useEffect(() => {
    playMusic(selectedTrack);

    return () => {
      // Cleanup the sound when the component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [selectedTrack]);

  return (
    <MusicContext.Provider value={{ selectedTrack, setSelectedTrack }}>
      {children}
    </MusicContext.Provider>
  );
};

// Custom hook to use the MusicContext
export const useMusic = () => useContext(MusicContext);