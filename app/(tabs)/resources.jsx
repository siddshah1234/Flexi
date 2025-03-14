import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const Resources = () => {
  const categories = [
    {
      id: '1',
      title: 'Yoga and Mindfulness',
      description: 'Explore yoga poses, mindfulness exercises, and meditation resources to relax and rejuvenate.',
      image: 'https://www.everydayyoga.com/cdn/shop/articles/yoga_1024x1024.jpg?v=1703853908',
      navigateTo: 'YogaResources',
    },
    {
      id: '2',
      title: 'Outdoor Activities',
      description: 'Find nearby trails, biking paths, and outdoor adventures to stay active and explore nature.',
      image: 'https://www.strong4life.com/-/media/Strong4Life/Pages/Activity/Articles/6-Fun-and-Easy-Outdoor-Activities-for-Kids/SLP17_MIX_4y_Family_riding_bikes_0444.jpg',
      navigateTo: 'OutdoorResources',
    },
    {
      id: '3',
      title: 'Home and Online Fitness',
      description: 'Access workout programs, virtual classes, and fitness challenges for all levels at home.',
      image: 'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/12/457969-MR-MARKET-CLONE-8-of-the-best-online-workout-programs-to-do-at-hom-1296x728-Header-cedd88-1024x574.jpg?w=1155&h=1528',
      navigateTo: 'HomeResources',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryBox}
            onPress={() => router.push(category.navigateTo)}
          >
            <ImageBackground
              source={{ uri: category.image }}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    padding: 16,
  },
  header: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  categories: {
    flex: 1,
    justifyContent: 'space-around',
  },
  categoryBox: {
    height: '30%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 12,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 8,
  },
  categoryTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default Resources;
