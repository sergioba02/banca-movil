import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { CameraView } from 'expo-camera';
import { useUserData } from "../context/userDataProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScannerOverlay from './ScannerOverlay';

export default function CameraScreen({ navigation, route }) {

  const { userData, fetchInOrder } = useUserData();
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);
  const qrLock = useRef(false);
  const { qr_codes } = route.params;
  console.log('qr_codes: ', qr_codes)

  const ipComputadora = "192.168.1.67";

  const refreshData = () => {
    fetchInOrder();
  }

  const handleTransaction = async (qrData) => {
    qrLock.current = true;
    setScanned(true);

    try {

      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert('Error', 'No se encontró el token de autenticación');
        return;
      }
      const response = await fetch(`http://${ipComputadora}:3000/createTransaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          orig_id: parseInt(qrData.orig_id),
          dest_id: userData.id,
          amount: parseFloat(qrData.amount),
          concept: qrData.concept,
          qr_code: 'hola',
        }),
      });

      if (response.status === 200) {
        refreshData();
        Alert.alert('Aviso', 'Transacción exitosa', [
          {
            text: 'Aceptar',
            onPress: () => {
              qrLock.current = false;
              navigation.replace("HomeScreen")
            },
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
      console.error(error);
    } 
  }


return (
  <View style={styles.container}>
    <CameraView
      style={scanned ? StyleSheet.absoluteFillObject : styles.camera}
      ref={cameraRef}
      onBarcodeScanned={(event) => {
        if (event.data && !qrLock.current) {
          try {
            const qrData = JSON.parse(event.data);
            console.log('QR Data:', qrData);
            handleTransaction(qrData);
          } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Código QR no válido');
          }
        }
      }}
    />
    <ScannerOverlay />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

