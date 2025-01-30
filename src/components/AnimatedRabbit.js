import React, { useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet, View, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const AnimatedRabbit = ({ corner }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const [rotate, setRotate] = useState('225deg')

  useEffect(() => {
    let initialX, initialY, finalX, finalY, rotation;

    switch (corner) {
      case 'top-right':
        initialX = width;
        initialY = -height * 0.6;
        finalX = width * 0.45;
        finalY = -height * 0.4;
        rotation = '225deg'
        break;

      case 'top-left':
        initialX = -width * 0.3;
        initialY = -height * 0.2;
        finalX = width * 0.1;
        finalY = height * 0.05;
        rotation = '120deg'
        break;

      case 'bottom-right':
        initialX = width;
        initialY = height * 1.2;
        finalX = width * 0.45;
        finalY = height * 0.5;
        rotation = '-45deg'
        break;

      case 'bottom-left':
        initialX = -width * 1.2;
        initialY = height * 1.2;
        finalX = -width * 0.37;
        finalY = height * 0.55;
        rotation = '45deg'
        break;

      default:
        initialX = width;
        initialY = -height * 0.2;
        finalX = width * 0.75;
        finalY = height * 0.05;
        rotation = '225deg'
        break;
    }

    translateX.setValue(initialX);
    translateY.setValue(initialY);
    setRotate(rotation)

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: finalX,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: finalY,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [corner, translateX, translateY]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.rabbitContainer,
          {
            transform: [
              { translateX },
              { translateY },
              { rotate },
            ],
          },
        ]}
      >
        <Image
          source={require('../../assets/images/habbit.png')}
          style={styles.rabbitImage}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  rabbitContainer: {
    position: 'absolute',
    // zIndex: 1
  },
  rabbitImage: {
    width: width * 0.9,
    height: height * 0.9,
  },
});

export default AnimatedRabbit;
