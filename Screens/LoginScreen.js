import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback, TextInput, Platform, Keyboard, KeyboardAvoidingView,} from "react-native"

export default function LoginScreen({navigation}) {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={-220}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/LogoPuerkito.png')} />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.TitleLogin}>
              <Text style={styles.TextLog}>Inicia sesión</Text>
            </View>
            <View >
              <TextInput
                style={styles.input}
                placeholder={'Correo electrónico'}
                placeholderTextColor='#747474'
                keyboardType="email-address"

              />
            </View>
            <View >
              <TextInput
                style={styles.input}
                placeholder={'Contraseña'}
                placeholderTextColor='#747474'
                secureTextEntry={true}

              />
            </View>
            <View>
              <TouchableOpacity 
              style={styles.btnCreate}
              onPress={() => navigation.navigate("HomeScreen")}
              >
                <Text style={styles.text}>Iniciar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity 
            style={styles.btnLogin}
            onPress={() => navigation.navigate("SigninScreen")}
            >
              <Text style={styles.textLogin}>¿No tienes cuenta?</Text>
              <Text style={styles.textLogin}>Regístrate aquí</Text>
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
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    marginTop: 120,
    alignItems: 'center',
    marginBottom: -30,
    marginTop: 80,
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
  btnCreate: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
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
    marginTop: 66,
    marginBottom: 2,
    backgroundColor: '#FFFFFF',
    width: 116,
    height: 45,
    borderRadius: 100,

  },
  TitleLogin: {
    marginBottom: 18,
    marginLeft: 2,
    alignSelf: 'flex-start',
  },
  TextLog: {
    fontSize: 35,
    color: '#000',
    fontFamily: "inter",
    fontWeight: "bold",
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
    marginTop: 77,
    marginBottom: 150,
    alignItems: 'center'
  },
  footer: {
    flexDirection: "row",
    marginTop: 12,
  },
  bottomContainer: {
    alignItems: "center"
  }
});