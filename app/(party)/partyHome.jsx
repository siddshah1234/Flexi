import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const partyHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎉 Join a Party Channel</Text>
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.channelButton}
          onPress={() => router.push('channelOne')}
        >
          <Text style={styles.channelText}>Channel One</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.channelButton}
          onPress={() => router.push('channelTwo')}
        >
          <Text style={styles.channelText}>Channel Two</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.channelButton}
          onPress={() => router.push('channelThree')}
        >
          <Text style={styles.channelText}>Channel Three</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.channelButton}
          onPress={() => router.push('channelFour')}
        >
          <Text style={styles.channelText}>Channel Four</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.channelButton}
          onPress={() => router.push('channelFive')}
        >
          <Text style={styles.channelText}>Channel Five</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.channelButton}
          onPress={() => router.push('channelSix')}
        >
          <Text style={styles.channelText}>Channel Six</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.channelButton}
          onPress={() => router.push('channelSeven')}
        >
          <Text style={styles.channelText}>Channel Seven</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.channelButton}
          onPress={() => router.push('channelEight')}
        >
          <Text style={styles.channelText}>Channel Eight</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default partyHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  channelButton: {
    width: 120,
    height: 80,
    backgroundColor: '#E55837',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    padding: 10,
  },
  channelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});
