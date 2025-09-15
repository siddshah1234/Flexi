// this screen shows links to yoga apps and websites with images

import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ScrollView
} from 'react-native';

const YogaResources = () => {
  // list of yoga resources with names, links, and pictures
  const resources = [
    {
      title: 'Pocket Yoga',
      url: 'https://pocketyoga.com/',
      image: 'https://www.pocketyoga.com/images/py-share.png'
    },
    {
      title: 'Headspace',
      url: 'https://www.headspace.com/',
      image: 'https://healthcenter.uga.edu/wp-content/uploads/sites/19/2022/09/headspace-1.jpg'
    },
    {
      title: 'DoYogaWithMe',
      url: 'https://www.doyogawithme.com/',
      image: 'https://as2.ftcdn.net/v2/jpg/05/93/83/57/1000_F_593835799_t3nXk0uibR2ncYtiWyZOpfqWYFQQDjyc.jpg'
    },
    {
      title: 'Calm',
      url: 'https://www.calm.com/',
      image: 'https://img.freepik.com/premium-photo/virtual-yoga-class-vector-flat-style-scene-illustration_1029473-98986.jpg'
    },
    {
      title: 'Down Dog App',
      url: 'https://www.downdogapp.com/',
      image: 'https://thumbs.dreamstime.com/b/cartoon-woman-doing-yoga-her-dog-watching-ai-328046511.jpg'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* list each resource inside a scroll view */}
      <ScrollView>
        {resources.map((resource, index) => (
          <TouchableOpacity
            key={index}
            style={styles.resourceBox}
            onPress={() => Linking.openURL(resource.url)} // open the link
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
  container: {
    flex: 1,
    backgroundColor: '#161622',
    padding: 16,
  },
  resourceBox: {
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  resourceTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default YogaResources;
