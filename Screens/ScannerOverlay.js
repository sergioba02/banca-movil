import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScannerOverlay = () => {
  return (
    <View style={styles.overlay}>
      {/* Texto de instrucciones arriba */}
      <Text style={styles.text}>Enfoca en el QR</Text>

      {/* Marco transparente */}
      <View style={styles.centerFrame} />

      {/* Cubre las áreas superior, izquierda, derecha y inferior */}
      <View style={[styles.cover, styles.topCover]} />
      <View style={[styles.cover, styles.leftCover]} />
      <View style={[styles.cover, styles.rightCover]} />
      <View style={[styles.cover, styles.bottomCover]} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    top: 100, // Distancia desde la parte superior de la pantalla
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    zIndex: 3, // Asegura que el texto esté por encima de los demás componentes
  },
  centerFrame: {
    width: 250, // Ancho del marco
    height: 250, // Alto del marco
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 20,
    zIndex: 2, // Asegura que el marco esté por encima de los overlays
  },
  cover: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Oscurece las áreas externas
  },
  topCover: {
    top: 0,
    left: 0,
    right: 0,
    height: '35%', // Área superior
  },
  bottomCover: {
    bottom: 0,
    left: 0,
    right: 0,
    height: '35%', // Área inferior
  },
  leftCover: {
    top: '35%',
    bottom: '35%',
    left: 0,
    width: '15%', // Área izquierda
  },
  rightCover: {
    top: '35%',
    bottom: '35%',
    right: 0,
    width: '15%', // Área derecha
  },
});

export default ScannerOverlay;
