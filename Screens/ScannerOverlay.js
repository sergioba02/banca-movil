import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ScannerOverlay = () => {

  const navigation = useNavigation();
  return (
    <View style={styles.overlay}>
      {/* Texto de instrucciones arriba */}
      <Text style={styles.textFocus}>Enfoca en el QR</Text>

      <TouchableOpacity 
      style={styles.btnCancel}
      onPress={()=>{navigation.pop()}}
      >
        <Text style={styles.textCancel}>Cancelar</Text>
      </TouchableOpacity>

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
  btnCancel: {
    alignItems: 'center',
    zIndex: 3,
  },
  textFocus: {
    position: 'absolute',
    top: 100, // Distancia desde la parte superior de la pantalla
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    zIndex: 3, // Asegura que el texto esté por encima de los demás componentes
  },
  textCancel: {
    position: 'absolute',
    top: 455, // Distancia desde la parte superior de la pantalla
    color: 'darkred',
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
