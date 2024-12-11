import { useState } from "react"
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Alert
} from "react-native"
import QRCode from 'react-native-qrcode-svg';
import { useUserData } from "../context/userDataProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {

  const ipComputadora = "192.168.1.67";

  const { userData, fetchUserData } = useUserData();

  const [amount, setAmount] = useState('');
  const [concept, setConcept] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [code, setCode] = useState('');
  const [lastCode, setLastCode] = useState('');

  const newCode = `${concept}${amount}`;

  const handleSaveCode = async (data) => {

    const token = await AsyncStorage.getItem('token');

    if (!token) {
      Alert.alert('Error', 'No se encontró el token de autenticación');
      return;
    }else if(lastCode === newCode){
      Alert.alert('Aviso', "El código ya ha sido generado", [
        { text: 'Aceptar' },
      ]);
      return;
    }

    try {
      setCode(newCode)
      console.log('codigo que se asignará: ', newCode)
      const response = await fetch(`http://${ipComputadora}:3000/saveCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: newCode,
          data: data,
          status: 'active',
        }),
      });

      if (response.status === 200) {
        setLastCode(newCode)
        console.log('Codigo guardado correctamente')
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
      console.error(error);
    }
  }

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
        console.log('Codigo eliminado correctamente')
        Alert.alert('Aviso', "El código QR se eliminó correctamente", [
          { text: 'Aceptar' },
        ]);
      }else if (response.status === 404){
        console.log('Codigo QR no encontrado')
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
      console.error(error);
    }
  }

  const handleTransfer = () => {
    if (parseFloat(amount) > parseFloat(userData.balance)) {
      setAmount('');
      setConcept('');
      Alert.alert('Saldo insuficiente', 'El monto es superior a su saldo actual', [
        { text: 'Aceptar' },
      ]);
      return;
    }
    const jsonString = JSON.stringify({ 'orig_id': userData.id, 'amount': amount, 'concept': concept })
    console.log('Generar QR: ', jsonString);
    if (!amount && !concept) {
      Alert.alert('Error', "El campo 'Cantidad a transferir' está vacío", [
        { text: 'Aceptar' },
      ]);
    } else if (!amount) {
      Alert.alert('Error', "El campo 'Cantidad a transferir' está vacío", [
        { text: 'Aceptar' },
      ]);
    } else if (!concept) {
      Alert.alert('Error', "El campo 'Cantidad a transferir' está vacío", [
        { text: 'Aceptar' },
      ]);
    } else {
      setQrValue(jsonString);
      handleSaveCode(jsonString);

    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.inputLabelContainer}>
          <Text style={styles.inputLabel}>Cantidad a Transferir</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            value={amount}
            placeholder={'$0.00'}
            placeholderTextColor='#747474'
            keyboardType="decimal-pad"
            onChangeText={setAmount}
          />
        </View>
        <View style={styles.inputLabelContainer}>
          <Text style={styles.inputLabel}>Concepto de transferencia</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            value={concept}
            placeholder={'Concepto'}
            placeholderTextColor='#747474'
            onChangeText={setConcept}
            maxLength={25}
          />
        </View>
        <View style={styles.btnsContainer}>
          <TouchableOpacity
            style={styles.btnTransfer}
            onPress={() => {
              Keyboard.dismiss();
              handleTransfer();
            }}
          >
            <Text style={styles.textTransfer}>Generar QR</Text>
          </TouchableOpacity>

          <View style={styles.qrContainer}>
            {qrValue && (
              <QRCode
                value={qrValue}
                size={200}
                color="black"
                backgroundColor="white"
              />
            )}
          </View>
          {qrValue && (
            <TouchableOpacity
              style={styles.btnDelete}
              onPress={() => {
                setQrValue(null);
                setAmount('');
                setConcept('');
                handleDeleteCode();
              }}
            >
              <Text style={styles.textDelete}>Eliminar QR</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.btnClose}
            onPress={() => {
              setQrValue(null);
                setAmount('');
                setConcept('');
                fetchUserData();
                navigation.pop()
            }}
          >
            <Text style={styles.textClose}>Cerrar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingTop: 100,

  },
  inputContainer: {
    marginTop: Platform.select({
      android: 77,
      ios: 80,
    }),
    marginBottom: Platform.select({
      android: 150,
      ios: 145,
    }),
    alignItems: 'center'
  },
  inputLabelContainer: {
    width: Platform.select({
      android: '',
      ios: 'auto',
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
    alignSelf: 'flex-start',
  },
  inputLabel: {
    fontSize: 20,
    color: '#000',
    fontFamily: "inter",
    fontWeight: 'bold'

  },

  textInputContainer: {
    marginBottom: Platform.select({
      android: 10,
      ios: 53,

    }),
  },
  input: {
    height: 40,
    width: 362,
    marginBottom: 10,
    padding: 10,
    borderRadius: 14,
    fontSize: 18,
    fontFamily: "inter",
    fontStyle: "italic",
    fontWeight: "medium",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    borderColor: '#D1D1D1',
    borderWidth: 1,
  },
  btnTransfer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.select({
      android: 362,
      ios: 362,
    }),
    height: 40,
    borderRadius: 28,
    backgroundColor: '#5DADE2',
    marginTop: Platform.select({
      android: 30,
      ios: -20,
    }),
    marginBottom: Platform.select({
      android: 30,
      ios: 60,
    }),
  },
  textTransfer: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: "inter",
    fontWeight: "bold"
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
    fontWeight: "bold"
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
    top: 420

  },
  textClose: {
    fontSize: 20,
    color: '#5DADE2',
    fontFamily: "inter",
    fontWeight: "bold"
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.select({
      android: 135,
      ios: 100,
    }),
  },
  btnsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
})
