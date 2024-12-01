import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import LayoutWithFooter from '../layouts/LayoutWithFooter';

const screenWidth = Dimensions.get('window').width;

const DrawingScreen = () => {
  const carousels = [
    {
      title: 'Desenhos de Música',
      items: [
        { id: 1, title: 'Borboletinha / Bolofofos', image: require('../../assets/images/screens/drawnings/desenho-musica-1.png') },
        { id: 2, title: 'Dança Maluca / Bolofofos', image: require('../../assets/images/screens/drawnings/desenho-musica-2.png') },
        { id: 3, title: 'Música Água de Coco / Bolofofos', image: require('../../assets/images/screens/drawnings/desenho-musica-3.png') },
      ],
    },
    {
      title: 'Desenhos de Animais',
      items: [
        { id: 4, title: 'Ao resgate dos Supercães', image: require('../../assets/images/screens/drawnings/desenho-animais-1.png') },
        { id: 5, title: 'Patrulha Canina / Melhores Momentos', image: require('../../assets/images/screens/drawnings/desenho-animais-2.png') },
        { id: 6, title: 'Peppa Pig', image: require('../../assets/images/screens/drawnings/desenho-animais-3.png') },
      ],
    },
    {
      title: 'Desenhos de Aventuras',
      items: [
        { id: 7, title: 'Dora / Enigmas e Jogos', image: require('../../assets/images/screens/drawnings/desenho-dora-1.png') },
        { id: 8, title: 'Dora Aventureira / Melhores Amigos', image: require('../../assets/images/screens/drawnings/desenho-dora-2.png') },
        { id: 9, title: 'Dora / As Aventuras dos Bebês', image: require('../../assets/images/screens/drawnings/desenho-dora-3.png') },
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
                <View key={item.id} style={styles.item}>
                  <Image source={item.image} style={styles.itemImage} />
                  <Text style={styles.itemText}>{item.title}</Text>
                </View>
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
    fontWeight: 600,
    marginBottom: 7,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  scrollContainer: {
    backgroundColor: '#77C6C4',
    paddingTop: 18,
    paddingBottom: 19,
    paddingHorizontal: 12
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
  itemImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  itemText: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    fontSize: 11,
    fontWeight: 600,
    color: '#FDFDFD',
    textAlign: 'center'
  },
});

export default DrawingScreen;
