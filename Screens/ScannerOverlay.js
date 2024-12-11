import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ScannerOverlay = () => {

  const navigation = useNavigation();
  return (
    <View style={styles.overlay}>
      <Text style={styles.textFocus}>Enfoca en el QR</Text>

      <TouchableOpacity 
      style={styles.btnCancel}
      onPress={()=>{navigation.pop()}}
      >
        <Text style={styles.textCancel}>Cancelar</Text>
      </TouchableOpacity>

      <View style={styles.centerFrame} >
        <View style={styles.innerFrame} />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCancel: {
    alignItems: 'center',
    zIndex: 3,
    top: 770,
  },
  textFocus: {
    position: 'absolute',
    top: 100,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    zIndex: 3,
  },
  textCancel: {
    color: 'darkred',
    fontSize: 18,
    fontWeight: 'bold',
    zIndex: 3,
  },
  centerFrame: {
    width: 900,
    height: 900,
    borderColor: 'rgba(0, 0, 0, 0.7)',
    borderWidth: 300,
    borderRadius: 325,
    zIndex: 2,
  },
  innerFrame: {
    width: 300, 
    height: 300,
    backgroundColor: 'transparent',
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 4,
    zIndex: 1,
  },
});

export default ScannerOverlay;
