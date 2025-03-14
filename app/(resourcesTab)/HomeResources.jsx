import React from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Linking, StyleSheet, ScrollView } from 'react-native';

const HomeResources = () => {
  const resources = [
    { title: 'Fitness Blender', url: 'https://www.fitnessblender.com/', image: 'https://d18zdz9g6n5za7.cloudfront.net/video/o_593_shoulder-sculpting-workout-with-kelli-and-daniel.jpg' },
    { title: 'Blogilates', url: 'https://www.blogilates.com/', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFCzGip_s5vB3J8Io3GLM7PhZrvGZTi60FrA&s' },
    { title: 'Nike Training Club', url: 'https://www.nike.com/ntc-app', image: 'https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/9405da78-079f-47fd-854d-ca53097f2dea/nike-training-club-app-home-workouts.jpg' },
    { title: 'CrossFit Online', url: 'https://www.crossfit.com/workout', image: 'https://www.atreq.com/cdn/shop/articles/Cross_fit_Training_2df2e098-2b67-4e03-8ec6-3a27ce4e240d.jpg?v=1588854724' },
    { title: 'Peloton App', url: 'https://www.onepeloton.com/app', image: 'https://images.ctfassets.net/6ilvqec50fal/ast-ifpevery-way-you-can-take-peloton-classes-from-iphone-to-app/3390c6e8e6823eedc97c07123623b4bb/every-way-app-blog_hed-2560x1440.jpeg' },
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

export default HomeResources;
