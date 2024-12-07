import { useState } from "react"
import { StyleSheet, View, TouchableOpacity, Text, KeyboardAvoidingView, TextInput, Keyboard, TouchableWithoutFeedback, Platform } from "react-native"

export default function HomeScreen({ navigation }) {

    const [amount, setAmount] = useState('')

    //Generar QR
    const handleTransfer = () => {
        console.log('Generar QR');
        // Agregar lógica para generar el QR.
      }

    return (
        <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === 'ios' ? 'position' : 'height'}
         keyboardVerticalOffset={-220}
        > 
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <View style={styles.titleTransferContainer}>
                 <Text style={styles.titleTransfer}>Cantidad a Transferir</Text>
                </View>
                <View style={styles.inputt}>
                 <TextInput
                  style={styles.input}
                  placeholder={'$0.00'}
                  placeholderTextColor='#747474'
                  keyboardType="decimal-pad"
                  onChangeText={setAmount}
                 />
                </View>
                <View>
                  <TouchableOpacity
                   style={styles.btnTransfer}
                   onPress={handleTransfer}
                   >
                    <Text style={styles.textTransfer}>Generar QR</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.btnClose}
                    onPress={() => navigation.navigate("HomeScreen")}
                   >
                    <Text style={styles.textClose}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF',
    
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
    titleTransferContainer: {
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
          ios: 25,
        }),
        marginLeft: 2,
        alignSelf: 'flex-start',
    },
    titleTransfer: {
        fontSize: 35,
        color: '#000',
        fontFamily: "inter",
        fontWeight: "bold",
    },

    inputt: {
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
          android: 140,
          ios: 155,
        }),
        height: 40,
        borderRadius: 28,
        backgroundColor: '#5DADE2',
        borderWidth: 3,
        borderColor: '#5DADE2',
        marginTop: Platform.select({
          android: 30,
          ios: 30,
        }),
    },textTransfer: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: "inter",
        fontWeight: "bold"
    },
    btnClose: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5DADE2',
        borderWidth: 3,
        borderColor: '#5DADE2',
        width: 128,
        height: 40,
        borderRadius: 100,
        marginTop: 50,

    },
    textClose: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: "inter",
        fontWeight: "bold"
    },
})
