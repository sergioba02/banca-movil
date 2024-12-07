import { useState } from "react";
import { StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Image, 
  TouchableWithoutFeedback, 
  TextInput, 
  Platform, 
  Keyboard, 
  KeyboardAvoidingView, 
  Alert } from "react-native"
  import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.70:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.status === 200) {
        const {token} = await response.json()
        await AsyncStorage.setItem('token', token);
        navigation.replace("HomeScreen");
      } else if (response.status === 404) {
        const errorData = await response.json();
        Keyboard.dismiss();
        Alert.alert('Error', errorData.message, [
          { text: 'Cerrar' },
        ]);
      } else if(response.status === 401) {
        const errorData = await response.json();
        Keyboard.dismiss();
        Alert.alert('Error', errorData.message, [
          { text: 'Cerrar' },
        ]);
      }else{
        const errorData = await response.json();
        Keyboard.dismiss();
        Alert.alert('Error', errorData.message, [
          { text: 'Cerrar' },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={-220}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/LogoPuerkito.png')} />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.titleLoginContainer}>
              <Text style={styles.titleLogin}>Inicia sesión</Text>
            </View>
            <View style={styles.inputt}>
              <TextInput
                style={styles.input}
                placeholder={'Correo electrónico'}
                placeholderTextColor='#747474'
                keyboardType="email-address"
                onChangeText={setEmail}

              />
            </View>
            <View style={styles.inputt}>
              <TextInput
                style={styles.input}
                placeholder={'Contraseña'}
                placeholderTextColor='#747474'
                secureTextEntry={true}
                onChangeText={setPassword}

              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.btnCreate}
                onPress={handleLogin}
              >
                <Text style={styles.text}>Iniciar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.btnSignin}
              onPress={() => navigation.navigate("SigninScreen")}
            >
              <Text style={styles.textSignin}>¿No tienes cuenta?</Text>
              <Text style={styles.textSignin}>Regístrate aquí</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
              <Image style={styles.tinyLogo} source={require('../assets/Puerkito.png')} />
              <Text style={styles.tinyText}>BANCAMÓVIL</Text>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: Platform.select({
      android: -30,
      ios: 120,
    }),
    marginTop: Platform.select({
      android: 80,
      ios: 120,
    })
  },
  logo: {
    width: 400,
    height: 160,
  },
  tinyLogo: {
    width: 29,
    height: 20,
    marginRight: 9,
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
  btnCreate: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.select({
      android: 140,
      ios: 155,
    }),
    height: 40,
    borderRadius: 28,
    borderColor: '#1576B7',
    backgroundColor: '#1576B7',
    borderWidth: 1,
    marginTop: Platform.select({
      android: 30,
      ios: 30,
    }),
  },
  btnSignin: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.select({
      android: 66,
      ios: 66,
    }),
    marginBottom: Platform.select({
      android: 2,
      ios: 2,
    }),
    backgroundColor: Platform.select({
      android: '#FFF',
      ios: '',
    }),
    width: Platform.select({
      android: 116,
      ios: 'auto',
    }),
    height: 45,
  },
  titleLoginContainer: {
    width: Platform.select({
      android: '',
      ios: 'auto',
    }),
    height: Platform.select({
      android: '',
      ios: 35,
    }),
    marginBottom: Platform.select({
      android: 18,
      ios: 25,
    }),
    marginLeft: 2,
    alignSelf: 'flex-start',
  },
  titleLogin: {
    fontSize: 35,
    color: '#000',
    fontFamily: "inter",
    fontWeight: "bold",

  },
  textSignin: {
    fontSize: 15,
    color: '#b0b0b0',
    fontFamily: "inter",
    fontWeight: "bold"
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: "inter",
    fontWeight: "bold"
  },
  tinyText: {
    fontSize: 17,
    color: '#1576B7',
    fontFamily: "inter",
    fontWeight: "bold"
  },
  inputContainer: {
    marginTop: Platform.select({
      android: 77,
      ios: 80,
    }),
    marginBottom: Platform.select({
      android: 150,
      ios: 400,
    }),
    alignItems: 'center'
  },
  footer: {
    flexDirection: "row",
    marginTop: Platform.select({
      android:12,
      ios: 12,
    }),
    height: Platform.select({
      android: 17,
      ios: 17,
    })
  },
  bottomContainer: {
    alignItems: "center"
  }
});