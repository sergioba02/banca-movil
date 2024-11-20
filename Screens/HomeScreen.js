import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native"

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Text>Hola, Aurora</Text>
        <TouchableOpacity>
          <Image source={require('../assets/logout.png')}/>
        </TouchableOpacity>
      </View>
    <View>
      <Text style={styles.balanceLabel}>Saldo actual</Text>
      <Text style={styles.balance}>$2568.45</Text>
    </View>
      <View style={styles.btnsContainer}>
        <TouchableOpacity
          style={styles.btnReceive}
          onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.text}>Recibir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTransfer}>
          <Text style={styles.text}>Transferir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignItems: 'flex-start'
  },
  btnsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: -200,
},
btnReceive: {
    width: 128,
    height: 40,
    backgroundColor: '#004445',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginRight: 45
},
btnTransfer: {
    width: 128,
    height: 40,
    backgroundColor: '#004445',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14
},
text: {
    fontSize: 16,
    color: '#6FB98F'
},,
balanceLabel: {
  fontSize: 24,
  color: '#004445',
  fontFamily: 'inter',
  fontWeight: 'bold',
  marginBottom: 45,    
},
balance: {
  fontSize: 48,
  color: '#fff',
  fontFamily: 'inter',
  fontWeight: 'bold'
},
});