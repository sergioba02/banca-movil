import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native"

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hola, Aurora</Text>
        <TouchableOpacity
        onPress={() => navigation.navigate("LoginScreen")}
        >
          <Image style={styles.logout} source={require('../assets/logout.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Saldo actual</Text>
        <Text style={styles.balance}>$2568.45</Text>
      </View>
      {/* View de miniHistorial */}
      <View style={styles.historyContainer}>
        <TouchableOpacity style={styles.historyItem}>
          <View>
            <View style={styles.historyItemTop}>
              <Text style={styles.historyItemName}>Jorge Tapia</Text>
              <Text style={styles.historyItemAmount}>$328.00</Text>
            </View>
            <View style={styles.historyItemBottom}>
              <Text style={styles.historyItemDate}>09/11/24</Text>
              <Text style={styles.historyItemStatus}>Completado</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.historyItem}>
          <View>
            <View style={styles.historyItemTop}>
              <Text style={styles.historyItemName}>Natanael Cano</Text>
              <Text style={styles.historyItemAmount}>$316.00</Text>
            </View>
            <View style={styles.historyItemBottom}>
              <Text style={styles.historyItemDate}>02/11/24</Text>
              <Text style={styles.historyItemStatus}>Creado</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.historySeeMore}
        onPress={() => navigation.navigate("HistoryScreen")}
        >
          <Text style={styles.historySeeMoreLabel}>Ver más</Text>
        </TouchableOpacity>
      </View>
      {/* View de miniHistorial */}
      <View style={styles.btnsContainer}>
        <TouchableOpacity
          style={styles.btnReceive}
          onPress={() => navigation.navigate("")}
          >
          <Text style={styles.btnText}>Recibir</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.btnTransfer}
        onPress={() => navigation.navigate("")}
        >
          <Text style={styles.btnText}>Transferir</Text>
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
    justifyContent: 'center',
    backgroundColor: '#E7E7E7'
  },
  header: {
    flexDirection: "row",
    marginTop: 66,
    marginBottom: 28,

  },
  greeting: {
    fontFamily: "inter",
    fontSize: 24,
    fontWeight: "bold",
    color: 'black',
    marginRight: 180,

  },
  logout: {
    width: 22,
    height: 22,
  },
  balanceContainer: {
    justifyContent: 'center',
    width: 362,
    height: 97,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,

  },
  balanceLabel: {
    fontFamily: "inter",
    fontSize: 16,
    color: '#008113',
    opacity: 0.55,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 6,

  },
  balance: {
    fontFamily: "inter",
    fontSize: 36,
    color: '#009216',
    fontWeight: "bold",
    marginLeft: 20,

  },
  historyContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 362,
    height: 336,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,

  },
  historyItem: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: 323,
    height: 60,
    backgroundColor: '#E7E7E7',
    borderRadius: 14,
    marginTop: 16,

  },
  historyItemTop: {
    flexDirection: 'row',
    marginBottom: 4,

  },
  historyItemBottom: {
    flexDirection: 'row',

  },
  historyItemName: {
    fontFamily: "inter",
    fontSize: 20,
    marginLeft: 10,
    marginRight: 80,


  },
  historyItemAmount: {
    fontFamily: "inter",
    fontSize: 20,

  },
  historyItemDate: {
    fontFamily: "inter",
    fontSize: 12,
    marginLeft: 17,
    marginRight: 140,

  },
  historyItemStatus: {
    fontFamily: "inter",
    fontSize: 12,
    color: '#008113'

  },
  historySeeMore: {
    fontFamily: "inter",
    fontSize: 16,
    opacity: 0.6,

  },
  historySeeMoreLabel: {

  },
  btnsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  btnReceive: {
    width: 128,
    height: 40,
    backgroundColor: '#009216',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginRight: 45
  },
  btnTransfer: {
    width: 128,
    height: 40,
    backgroundColor: '#009216',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14
  },
  btnText: {
    fontSize: 16,
    color: '#FFF'
  },
});