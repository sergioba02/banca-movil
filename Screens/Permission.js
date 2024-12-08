import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert,} from 'react-native';
import { CameraView } from 'expo-camera';
import { useUserData } from "../context/userDataProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScannerOverlay from './ScannerOverlay';

export default function CameraComponent({ navigation }) {

  const { userData, fetchInOrder } = useUserData();
  const cameraRef = useRef(null);
  const [scanned, setScanned] = useState(false);

  const ipComputadora = "192.168.1.67";

  const handleTransaction = async ({ data }) => {

    const qrData = JSON.parse(data);
    console.log('qr data: ',qrData);
    if (!scanned) {
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
            // orig_id: qrData.orig_id,
            orig_id: parseInt(qrData.orig_id),
            dest_id: userData.id,
            amount: parseInt(qrData.amount),
            concept: qrData.concept
          }),
        });

        if (response.status === 200) {
          fetchInOrder();
          Alert.alert(`Código QR detectado:`, data, [
            {
              text: 'Aceptar',
              onPress: navigation.replace("HomeScreen"),
            },
          ]);
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo conectar con el servidor');
        console.error(error);
      }
    }

  }

  return (
    <View style={styles.container}>
      <CameraView
        style={scanned ? StyleSheet.absoluteFillObject : styles.camera}
        ref={cameraRef}
        onBarcodeScanned={scanned ? undefined : handleTransaction}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
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

