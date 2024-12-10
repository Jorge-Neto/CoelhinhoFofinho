import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import LayoutWithFooter from '../layouts/LayoutWithFooter';

const screenWidth = Dimensions.get('window').width;

const LearningScreen = () => {
  const carousels = [
    {
      title: 'DESCOBRINDO AS CORES',
      items: [
        { id: 1, duration: '2:55', title: 'Arco-íris Mágico: Conhecendo as Cores do Céu!', image: require('../../assets/images/screens/learn/descobrindo-cores-1.png') },
        { id: 2, duration: '3:19', title: 'Vamos Pintar: Vermelho, Amarelo e Azul!', image: require('../../assets/images/screens/learn/descobrindo-cores-2.png') },
        { id: 3, duration: '3:19', title: 'Qual é a Cor? Brincando com Cores!', image: require('../../assets/images/screens/learn/descobrindo-cores-3.png') },
      ],
    },
    {
      title: 'ANIMAIS DA FAZENDA',
      items: [
        { id: 4, duration: '2:55', title: 'Muuuuu! A Vaca e Seus Amigos!', image: require('../../assets/images/screens/learn/animais-fazenda-1.png') },
        { id: 5, duration: '3:19', title: 'Oink Oink! Conheça o Porquinho da Fazenda', image: require('../../assets/images/screens/learn/animais-fazenda-2.png') },
        { id: 6, duration: '3:19', title: 'Quem Faz Có Có Ri Có? O Galo e a Fazenda!', image: require('../../assets/images/screens/learn/animais-fazenda-3.png') },
      ],
    },
    {
      title: 'BRINCANDO COM FORMAS E TAMANHOS',
      items: [
        { id: 7, duration: '2:55', title: 'Pequeno ou Grande? Brincando com Tamanhos!', image: require('../../assets/images/screens/learn/formas-tamanhos-1.png') },
        { id: 8, duration: '3:19', title: 'Circulo, Quadrado, Triângulo: Quem Está Aqui?', image: require('../../assets/images/screens/learn/formas-tamanhos-2.png') },
        { id: 9, duration: '3:19', title: 'Formas Divertidas: Encontre o Par!', image: require('../../assets/images/screens/learn/formas-tamanhos-3.png') },
      ],
    },
    {
      title: 'CANTANDO OS NÚMEROS',
      items: [
        { id: 10, duration: '2:55', title: 'Contando até 10 com Música e Diversão!', image: require('../../assets/images/screens/learn/cantando-numeros-1.png') },
        { id: 11, duration: '3:19', title: '1, 2, 3! Vamos Contar Juntos!', image: require('../../assets/images/screens/learn/cantando-numeros-2.png') },
        { id: 12, duration: '3:19', title: 'Quantos Bichinhos? Vamos Contar!', image: require('../../assets/images/screens/learn/cantando-numeros-3.png') },
      ],
    },
  ];

  return (
    <LayoutWithFooter activeTab={'Learning'}>
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

export default LearningScreen;
