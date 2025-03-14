import React from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Linking, StyleSheet, ScrollView } from 'react-native';

const OutdoorResources = () => {
  const resources = [
    { title: 'AllTrails', url: 'https://www.alltrails.com/', image: 'https://images.ctfassets.net/x5brbn1xcmsf/7JkuZ8JfFZDd7LmNLZCGkz/2e0a9f13eee5e152f9f6c98d562a6549/AllTrails_01.png?fm=webp&w=3840&q=70' },
    { title: 'Ride with GPS', url: 'https://ridewithgps.com/', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbwbZDUJ2T1hS15dSF9p9CtxbuSA5fTNx65w&s' },
    { title: 'REI Expert Advice', url: 'https://www.rei.com/learn/expert-advice/fitness.html', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcDrWOnH79QhWNfQvgLnrVlNVQhyddlf38Iw&s'},
    { title: 'MapMyRun', url: 'https://www.mapmyrun.com/', image: 'https://m.media-amazon.com/images/I/81Swq8CdWWL.png' },
    { title: 'Hiking Project', url: 'https://www.hikingproject.com/', image: 'https://hikingproject.com/assets/photos/hike/7018044_smallMed_1554830264.jpg?cache=1735971004' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {resources.map((resource, index) => (
        <TouchableOpacity
          key={index}
          style={styles.resourceBox}
          onPress={() => Linking.openURL(resource.url)}
        >
          <Image source={{ uri: resource.image }} style={styles.image} />
          <Text style={styles.resourceTitle}>{resource.title}</Text>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#161622', padding: 16 },
  header: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 20 },
  resourceBox: { marginBottom: 16, alignItems: 'center' },
  image: { width: '100%', height: 150, borderRadius: 12, marginBottom: 10 },
  resourceTitle: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
});

export default OutdoorResources;
