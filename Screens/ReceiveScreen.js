import { StyleSheet, View, TouchableOpacity, Text, KeyboardAvoidingView, TextInput, Keyboard, TouchableWithoutFeedback, Platform } from "react-native"

export default function HomeScreen({ navigation }) {


    return (
        <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === 'ios' ? 'position' : 'height'}
         keyboardVerticalOffset={-220}
        > 
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <View style={styles.titleReceiveContainer}>
                 <Text style={styles.titleReceive}>Has Recibido</Text>
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
    titleReceiveContainer: {
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
    titleReceive: {
        fontSize: 35,
        color: '#000',
        fontFamily: "inter",
        fontWeight: "bold",
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
        marginTop: -15,

    },
    textClose: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: "inter",
        fontWeight: "bold"
    },
})
