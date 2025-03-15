import React from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Linking, StyleSheet, ScrollView } from 'react-native';

const OutdoorResources = () => {
  const resources = [
    { title: 'AllTrails', url: 'https://www.alltrails.com/', image: 'https://images.ctfassets.net/x5brbn1xcmsf/7JkuZ8JfFZDd7LmNLZCGkz/2e0a9f13eee5e152f9f6c98d562a6549/AllTrails_01.png?fm=webp&w=3840&q=70' },
    { title: 'Ride with GPS', url: 'https://ridewithgps.com/', image: 'https://thumbs.dreamstime.com/b/cyclist-riding-mountain-bike-downhill-adventure-landscape-vibrant-colors-sunset-mountains-pine-trees-scenic-view-vector-338945383.jpg' },
    { title: 'REI Expert Advice', url: 'https://www.rei.com/learn/expehttps://i.etsystatic.com/19543171/r/il/2f7d70/5714048075/il_570xN.5714048075_rdyx.jpgrt-advice/fitness.html', image: 'https://www.rei.com/dam/beach_checklist_hero_lg.jpg?t=ea16by9lg' },
    { title: 'MapMyRun', url: 'https://www.mapmyrun.com/', image: 'https://thumbs.dreamstime.com/b/hiking-map-forest-trail-running-cycling-path-orienteering-game-lush-landscape-hills-trees-ecological-environment-176769868.jpg' },
    { title: 'Hiking Project', url: 'https://www.hikingproject.com/', image: 'https://media.istockphoto.com/id/824846042/vector/man-woman-children-family-hikers-traveling-trekking-with-backpacks-in-mountains-forest.jpg?s=612x612&w=0&k=20&c=SvI8MUgKQmlkL-Q3L2nKre3sKLn7F9Dx6ZDlHQmlFTs=' },
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
  header: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  resourceBox: { marginBottom: 16, alignItems: 'center' },
  image: { width: '90%', height: 120, borderRadius: 12, marginBottom: 10 }, // Reduced height
  resourceTitle: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
});

export default OutdoorResources;
