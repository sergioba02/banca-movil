import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback, TextInput, Platform, Keyboard, KeyboardAvoidingView,} from "react-native"

export default function LoginScreen({navigation}) {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={-220}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/bancamovil-logo.png')} />
          </View>
          <View style={styles.inputContainer}>
            <View >
              <TextInput
                style={styles.input}
                placeholder={'Nombre'}
                placeholderTextColor='#747474'

              />
            </View>
            <View >
              <TextInput
                style={styles.input}
                placeholder={'Apellido'}
                placeholderTextColor='#747474'

              />
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
              <TouchableOpacity style={styles.btnCreate}>
                <Text style={styles.text}>Crear cuenta</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity 
            style={styles.btnLogin}
            onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.textLogin}>Iniciar sesión</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
              <Image style={styles.tinyLogo} source={require('../assets/bancamovil-logo.png')} />
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
    backgroundColor: "#D1D1D1"

  },
  logoContainer: {
    marginTop: 176,
    alignItems: 'center'
  },
  logo: {
    width: 80,
    height: 92,
  },
  tinyLogo: {
    width: 17,
    height: 20,
    marginRight: 9,
  },
  input: {
    height: 52,
    width: 362,
    marginBottom: 13,
    padding: 10,
    borderRadius: 14,
    backgroundColor: '#fff',
    fontSize: 20,
    fontFamily: "inter",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,

  },
  btnCreate: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#008113',
    width: 362,
    height: 45,
    borderRadius: 100,
  },
  btnLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1D1D1',
    borderWidth: 3,
    borderColor: '#008113',
    width: 362,
    height: 45,
    borderRadius: 100,

  },
  textLogin: {
    fontSize: 20,
    color: '#008113',
    fontFamily: "inter",
    fontWeight: "bold"
  },
  text: {
    fontSize: 20,
    color: '#FFF',
    fontFamily: "inter",
    fontWeight: "bold"
  },
  tinyText: {
    fontSize: 16,
    color: '#90D344',
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
    marginTop: 11,
  },
  bottomContainer: {
    alignItems: "center"
  }
});