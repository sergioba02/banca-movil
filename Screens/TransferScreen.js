import { useState } from "react"
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Keyboard, TouchableWithoutFeedback, Platform } from "react-native"
import QRCode from 'react-native-qrcode-svg';

export default function HomeScreen({ navigation }) {

  const [amount, setAmount] = useState('');
  const [concept, setConcept] = useState('');

  const [qrValue, setQrValue] = useState(null);
  const handleTransfer = () => {
    console.log('Generar QR');
    if (amount) {
      setQrValue(`TRANSFER:${amount}`);
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
            placeholder={'Concepto'}
            placeholderTextColor='#747474'
            onChangeText={setConcept}
            maxLength={25}
          />
        </View>
        <View style={styles.btnsContainer}>
          <TouchableOpacity
            style={styles.btnTransfer}
            onPress={handleTransfer}
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
          <TouchableOpacity
            style={styles.btnClose}
            onPress={() => navigation.replace("HomeScreen")}
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
      ios: 80,
    }),
  },
  textTransfer: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: "inter",
    fontWeight: "bold"
  },
  btnClose: {
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
    marginTop: -15,

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
      ios: 135,
    }),
  },
  btnsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
})
