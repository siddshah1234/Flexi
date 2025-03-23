import React from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Linking, StyleSheet, ScrollView } from 'react-native';

const HomeResources = () => {
  const resources = [
    { title: 'Fitness Blender', url: 'https://www.fitnessblender.com/', image: 'https://media.istockphoto.com/id/578306876/vector/busy-woman-workout-at-home-with-white-chair.jpg?s=612x612&w=0&k=20&c=NEeVqqJwIyThoTjtdUs7NJWiy2iivOPF6Atqvid7p-A=' },
    { title: 'Home Workout', url: 'https://play.google.com/store/apps/details?id=homeworkout.homeworkouts.noequipment&hl=en_US', image: 'https://www.freevector.com/uploads/vector/preview/54726/vecteezynew-yearresolutionillustrationik1021_generated.jpg' },
    { title: 'Nike Training Club', url: 'https://www.nike.com/ntc-app', image: 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_2401,c_limit/3b4d83fd-131a-43cc-bf8e-b1f754b5c2a6/nike-training-club-app-home-workouts.jpg' },
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
  header: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  resourceBox: { marginBottom: 16, alignItems: 'center' },
  image: { width: '90%', height: 120, borderRadius: 12, marginBottom: 10 }, // Reduced height
  resourceTitle: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
});

export default HomeResources;
