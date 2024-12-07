import { useState, } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback, TextInput, Platform, Keyboard, KeyboardAvoidingView, Alert, } from "react-native"

export default function LoginScreen({ navigation }) {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ipComputadora = "192.168.1.67";

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(`http://${ipComputadora}:3000/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          surname: surname,
          email: email,
          password: password,
        }),
      });

      const errorData = await response.json();

      if (response.status === 200) {
        Alert.alert('Usuario registrado', 'Usted se ha registrado correctamente a Banca Móvil', [
          { text: 'Aceptar', onPress: () => {navigation.replace("LoginScreen");} },
        ]);
      }else if (errorData.status === 409) {
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
            <View style={styles.titleSigninContainer}>
              <Text style={styles.titleSignin}>Regístrate</Text>
            </View>
            <View style={styles.inputt}>
              <TextInput
                value={name}
                style={styles.input}
                placeholder={'Nombre'}
                placeholderTextColor='#747474'
                onChangeText={setName}

              />
            </View>
            <View style={styles.inputt}>
              <TextInput
                style={styles.input}
                placeholder={'Apellido'}
                placeholderTextColor='#747474'
                onChangeText={setSurname}

              />
            </View>
            <View style={styles.inputt}>
              <TextInput
                style={styles.input}
                placeholder={'Correo electrónico'}
                placeholderTextColor='#747474'
                keyboardType="email-address"
                autoCapitalize="none"
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
                autoCapitalize="none"

              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.btnCreate}
                onPress={() => {
                  if(!isValidEmail(email)){
                    Alert.alert('Email inválido', 'El email que ingresaste no tiene la sintaxis esperada.', [
                      { text: 'Cerrar' },
                    ]);
                  }else{
                    handleRegister();
                  };
                }}
              >
                <Text style={styles.text}>Crear cuenta</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.textLogin}>¿Ya tienes cuenta?</Text>
              <Text style={styles.textLogin}>Inicia sesión aquí</Text>
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
  titleSigninContainer: {
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
  titleSignin: {
    fontSize: 35,
    color: '#000',
    fontFamily: "inter",
    fontWeight: "bold",
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
    marginTop: 30,
  },
  btnLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.select({
      android: -35,
      ios: 320,
    }),
    marginBottom: 2,
    width: Platform.select({
      android: 114,
      ios: 'auto',
    }),
    backgroundColor: Platform.select({
      android: '#FFF',
      ios: '',
    }),
    height: 45,
    borderRadius: Platform.select({
      android: 100,
      ios: 0,
    }),

  },
  textLogin: {
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
      android: 111,
      ios: 145,
    }),
    alignItems: 'center'
  },
  footer: {
    flexDirection: "row",
    marginTop: Platform.select({
      android: 12,
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