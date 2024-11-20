import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback, TextInput } from "react-native"

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/bancamovil-logo.png')} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View >
          <TextInput
            style={styles.input}
            placeholder={'Correo electrónico'}
            placeholderTextColor='#2C7873'

          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View >
          <TextInput
            style={styles.input}
            placeholder={'Contraseña'}
            placeholderTextColor='#2C7873'

          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity style={styles.btnContainer}>
        <Text style={styles.text}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <View>
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.text}>Crear cuenta</Text>
        </TouchableOpacity>
        <View>
        <Image style={styles.logo} source={require('../assets/bancamovil-logo.png')} />
        <Text>BANCAMÓVL</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 92,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    padding: 10,
    borderRadius: 14,
    backgroundColor: '#fff',

  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    backgroundColor: '#004445',
    width: 128,
    height: 40,
  },
  text: {
    fontSize: 16,
    color: '#6FB98F'
  }
});