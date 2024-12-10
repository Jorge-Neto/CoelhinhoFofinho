import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import LayoutWithFooter from '../layouts/LayoutWithFooter';

const screenWidth = Dimensions.get('window').width;

const StudyScreen = () => {
  const carousels = [
    {
      title: 'PRIMEIROS PASSOS NO MUNDO DOS NÚMEROS',
      items: [
        { id: 1, duration: '2:55', title: 'Contando com Brinquedos: Um, Dois, Três ...', image: require('../../assets/images/screens/study/primeiros-passos-1.png') },
        { id: 2, duration: '3:19', title: 'Números e Bichinhos: Aprenda Brincando!', image: require('../../assets/images/screens/study/primeiros-passos-2.png') },
        { id: 3, duration: '3:19', title: 'A Festa dos Números: Quem Chega Primeiro?', image: require('../../assets/images/screens/study/primeiros-passos-3.png') },
      ],
    },
    {
      title: 'CONHECENDO O ALFABETO',
      items: [
        { id: 4, duration: '2:55', title: 'Letras e Sons: O que Começa com B?', image: require('../../assets/images/screens/study/conhecendo-alfabeto-1.png') },
        { id: 5, duration: '3:19', title: 'ABC Divertido: Cantando o Alfabeto!', image: require('../../assets/images/screens/study/conhecendo-alfabeto-2.png') },
        { id: 6, duration: '3:19', title: 'A é de Abelha: Vamos Aprender as Letras!', image: require('../../assets/images/screens/study/conhecendo-alfabeto-3.png') },
      ],
    },
    {
      title: 'BRINCANDO DE ESTUDAR',
      items: [
        { id: 7, duration: '2:55', title: 'Quem Mora Aqui? Aprendendo sobre Animais!', image: require('../../assets/images/screens/study/brincando-estudar-1.png') },
        { id: 8, duration: '3:19', title: 'Descubra o Que Está Escondido: Adivinha o Objeto!', image: require('../../assets/images/screens/study/brincando-estudar-2.png') },
        { id: 9, duration: '3:19', title: 'Hora de Estudar Cores e Formas Brincando!', image: require('../../assets/images/screens/study/brincando-estudar-3.png') },
      ],
    },
    {
      title: 'HORA DE LER E OUVIR',
      items: [
        { id: 10, duration: '2:55', title: 'Leia e Brinque: Aprenda com os Contos!', image: require('../../assets/images/screens/study/ler-ouvir-1.png') },
        { id: 11, duration: '3:19', title: 'Contando Histórias: O Que Vem Depois?', image: require('../../assets/images/screens/study/ler-ouvir-2.png') },
        { id: 12, duration: '3:19', title: 'Qual é a Palavra? Adivinha e Aprenda!', image: require('../../assets/images/screens/study/ler-ouvir-3.png') },
      ],
    },
  ];

  return (
    <LayoutWithFooter activeTab={'Study'}>
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

export default StudyScreen;
