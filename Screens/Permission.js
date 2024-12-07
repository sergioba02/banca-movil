import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Alert, Linking } from 'react-native';
import { CameraView } from 'expo-camera';

export default function CameraComponent() {
  const cameraRef = useRef(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);

  const handleBarCodeScanned = ({ data }) => {
    if (!scanned) {
        setScanned(true);
        setQrData(data);
        Alert.alert(`Código QR detectado:`, data, [
            {
                text: 'Abrir',
                onPress: () => openLink(data),
            },
            {
                text: 'Cancelar',
                onPress: () => setScanned(false),
            }
        ]);
    }
  };

  const openLink = (url) => {
    Linking.openURL(url).catch(err => 
        console.error("Error al intentar abrir la URL", err)
    );
  };


  return (
    <View style={styles.container}>
        <CameraView 
            style={styles.camera}
            ref={cameraRef}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
                barcodeTypes: ['qr'],
            }}
        />
        <Text style={styles.text}>Enfoca el codigo QR</Text>
        {qrData && <Text style={styles.text}>Datos escaneados: {qrData}</Text>}
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
  text: {
    color: 'white',
    fontSize: 18,
    padding: 20,resizeMode: 'vertical',
  },
});

