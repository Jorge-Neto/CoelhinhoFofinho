import LayoutWithFooter from '../layouts/LayoutWithFooter';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

const NewGameScreen = ({ navigation }) => {
  const [color, setColor] = useState('#000000'); // Cor do traço
  const [brushSize, setBrushSize] = useState(5); // Tamanho do traço

  const canvasRef = useRef(null); // Referência para o canvas

  // Funções para limpar ou salvar o desenho
  const clearCanvas = () => {
    canvasRef.current.clear(); // Limpa o canvas
  };

  const saveDrawing = () => {
    canvasRef.current.save('png', true, 'MyDrawing', 'MyDrawing.png'); // Salva o desenho
  };

  useEffect(() => {
    fetchUserData();
  }, [navigation]);

  return (
    <LayoutWithFooter activeTab={'Game'}>
      <View style={styles.container}>
        <Text style={styles.title}>Desenhe algo!</Text>
        <SketchCanvas
          ref={canvasRef} // Definindo a referência corretamente
          style={styles.canvas}
          strokeColor={color}
          strokeWidth={brushSize}
          backgroundColor={'#ffffff'}
        />

        <View style={styles.controls}>
          <Button title="Limpar" onPress={clearCanvas} />
          <Button title="Salvar" onPress={saveDrawing} />
        </View>

        <View style={styles.controls}>
          <Button title="Mudar Cor" onPress={() => setColor(color === '#000000' ? '#FF0000' : '#000000')} />
          <Button title="Ajustar Tamanho" onPress={() => setBrushSize(brushSize === 5 ? 10 : 5)} />
        </View>
      </View>
    </LayoutWithFooter>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  canvas: {
    width: '100%',
    height: '60%',
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 10,
  },
});


export default NewGameScreen;
