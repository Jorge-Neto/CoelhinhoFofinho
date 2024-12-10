import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import LayoutWithFooter from '../layouts/LayoutWithFooter';

const screenWidth = Dimensions.get('window').width;

const DrawingScreen = () => {
  const carousels = [
    {
      title: 'Desenhos de Música',
      items: [
        { id: 1, duration: '2:55', title: 'Borboletinha / Bolofofos', image: require('../../assets/images/screens/drawnings/desenho-musica-1.png') },
        { id: 2, duration: '3:19', title: 'Dança Maluca / Bolofofos', image: require('../../assets/images/screens/drawnings/desenho-musica-2.png') },
        { id: 3, duration: '3:19', title: 'Música Água de Coco / Bolofofos', image: require('../../assets/images/screens/drawnings/desenho-musica-3.png') },
      ],
    },
    {
      title: 'Desenhos de Animais',
      items: [
        { id: 4, duration: '2:55', title: 'Ao resgate dos Supercães', image: require('../../assets/images/screens/drawnings/desenho-animais-1.png') },
        { id: 5, duration: '3:19', title: 'Patrulha Canina / Melhores Momentos', image: require('../../assets/images/screens/drawnings/desenho-animais-2.png') },
        { id: 6, duration: '3:19', title: 'Peppa Pig', image: require('../../assets/images/screens/drawnings/desenho-animais-3.png') },
      ],
    },
    {
      title: 'Desenhos de Aventuras',
      items: [
        { id: 7, duration: '2:55', title: 'Dora / Enigmas e Jogos', image: require('../../assets/images/screens/drawnings/desenho-dora-1.png') },
        { id: 8, duration: '3:19', title: 'Dora Aventureira / Melhores Amigos', image: require('../../assets/images/screens/drawnings/desenho-dora-2.png') },
        { id: 9, duration: '3:19', title: 'Dora / As Aventuras dos Bebês', image: require('../../assets/images/screens/drawnings/desenho-dora-3.png') },
      ],
    },
  ];

  return (
    <LayoutWithFooter activeTab={'Drawing'}>
      <ScrollView style={styles.container}>
        {carousels.map((carousel, index) => (
          <View key={index + carousel.title} style={styles.carouselContainer}>
            <Text style={styles.carouselTitle}>{carousel.title}</Text>
            <ScrollView horizontal style={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
              {carousel.items.map((item) => (
                <TouchableOpacity key={item.id} style={styles.item}>
                  <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.itemImage} />
                    <View style={styles.timeContainer}>
                      <Text style={styles.timeText}>{item.duration}</Text>
                    </View>
                  </View>
                  <Text style={styles.itemText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </LayoutWithFooter>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    color: '#000000',
  },
  carouselContainer: {
    marginBottom: 18,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: 'semibold',
    marginBottom: 7,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  scrollContainer: {
    backgroundColor: '#77C6C4',
    paddingTop: 18,
    paddingBottom: 19,
    paddingHorizontal: 12,
  },
  item: {
    width: screenWidth * 0.6,
    backgroundColor: '#434343',
    marginRight: 17.5,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,

  },
  timeContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#505050',
    borderRadius: 3,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
  timeText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: 'bold',
  },
  itemText: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    fontSize: 11,
    fontWeight: 'semibold',
    color: '#FDFDFD',
    textAlign: 'center'
  },
});

export default DrawingScreen;
