import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  Alert
} from "react-native"
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from "../context/userDataProvider";

export default function QrCodeScreen({ navigation, route }) {

  const { fetchCodes } = useUserData();

  const { code, orig_id, amount, concept } = route.params;

  const ipComputadora = "192.168.1.70";

  const handleDeleteCode = async () => {

    const token = await AsyncStorage.getItem('token');

    if (!token) {
      Alert.alert('Error', 'No se encontró el token de autenticación');
      return;
    }

    try {
      console.log('codigo que se eliminará: ', code)
      const response = await fetch(`http://${ipComputadora}:3000/delete/${code}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        fetchCodes();
        Alert.alert('Aviso', "El código QR se eliminó correctamente", [
          { text: 'Aceptar', onPress: () => { navigation.replace("GenCodesScreen"); } },
        ]);
      } else if (response.status === 404) {
        console.log('Codigo QR no encontrado')
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Cantidad a Transferir:</Text>
      </View>
      <View style={styles.dataLabel}>
        <Text style={styles.dataLabel}>${amount}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Concepto de transferencia:</Text>
      </View>
      <View style={styles.dataLabel}>
        <Text style={styles.dataLabel}>{concept}</Text>
      </View>
      <View style={styles.qrContainer}>
        <QRCode
          value={JSON.stringify({ 'orig_id': orig_id, 'amount': amount, 'concept': concept })}
          size={200}
          color="black"
          backgroundColor="white"
        />
      </View>
      <TouchableOpacity
        style={styles.btnDelete}
        onPress={() => {
          handleDeleteCode();
        }}
      >
        <Text style={styles.textDelete}>Eliminar QR</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnClose}
        onPress={() => {
          navigation.pop()
        }}
      >
        <Text style={styles.textClose}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingTop: 100,

  },
  labelContainer: {
    width: Platform.select({
      android: '',
      ios: 364,
    }),
    height: Platform.select({
      android: '',
      ios: 42,
    }),
    marginBottom: Platform.select({
      android: 18,
      ios: 0,
    }),
    marginLeft: 26,

  },
  label: {
    fontSize: 20,
    color: '#000',
    fontFamily: "inter",
    fontWeight: 'bold'

  },

  dataLabel: {
    fontSize: 20,
    color: '#000',
    fontFamily: "inter",

    marginBottom: Platform.select({
      android: 10,
      ios: 10,

    }),
    alignSelf: 'flex-start',
    marginLeft: 26,
  },
  btnDelete: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.select({
      android: 362,
      ios: 362,
    }),
    height: 40,
    borderRadius: 28,
    backgroundColor: 'red',
    marginTop: Platform.select({
      android: 30,
      ios: -20,
    }),
    marginBottom: Platform.select({
      android: 30,
      ios: 40,
    }),
  },
  textDelete: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: "inter",
    fontWeight: "bold",
  },
  btnClose: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#5DADE2',
    width: Platform.select({
      android: 362,
      ios: 362,
    }),
    height: 40,
    borderRadius: 100,
    top: '100%',
  },
  textClose: {
    fontSize: 20,
    color: '#5DADE2',
    fontFamily: "inter",
    fontWeight: "bold",
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.select({
      android: 135,
      ios: 100,
    }),
    marginBottom: Platform.select({
      android: 135,
      ios: 180,
    }),
  },
})