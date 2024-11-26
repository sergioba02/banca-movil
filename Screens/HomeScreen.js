import { StyleSheet, View, TouchableOpacity, Text, Image, ImageBackground } from "react-native"

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/backgroundv2.png')}
      style={styles.container}
      >
      <View style={styles.header}>
        <Text style={styles.greeting}>Hola, Aurora</Text>
        <TouchableOpacity
        onPress={() => navigation.navigate("LoginScreen")}
        >
          <Image style={styles.logout} source={require('../assets/Logout.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Saldo actual</Text>
        <Text style={styles.balance}>$2568.45</Text>
        
      </View>
      {/* View de miniHistorial */}
      <View style={styles.historyContainer}>
        <TouchableOpacity style={styles.historyItem}>
          <View style={styles.historyItemTop}>
            <Text style={styles.historyItemName}>Sergio Tabula</Text>
            <Text style={styles.historyItemDate}>09/11/24</Text>
          </View>
          <View style={styles.historyItemMoney}>
            <Text style={styles.historyItemAmount}>$328.00</Text>
            <Text style={styles.historyItemStatus}>Completado</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.historyItem}>
          <View style={styles.historyItemTop}>
            <Text style={styles.historyItemName}>Natanael Cano</Text>
            <Text style={styles.historyItemDate}>02/09/24</Text>
          </View>
          <View style={styles.historyItemMoney}>
            <Text style={styles.historyItemAmount}>$254.00</Text>
            <Text style={styles.historyItemStatus}>Creado</Text>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    //justifyContent: 'center',
    //backgroundColor: '#D1D1D1',
  },
  header: {
    flexDirection: "row",
    //marginTop: 66,
    marginTop: 68,
    marginBottom: 38,

  },
  greeting: {
    fontFamily: "inter",
    fontSize: 24,
    fontWeight: "bold",
    color: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    marginRight: 180,

  },
  logout: {
    width: 25,
    height: 25,
  },
  balanceContainer: {
    justifyContent: 'center',
    width: 362,
    height: 97,
    backgroundColor: '#F1F1F1',
    borderRadius: 14,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,

  },
  balanceLabel: {
    fontFamily: "inter",
    fontSize: 16,
    color: '#1576B7',
    opacity: 0.55,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 6,

  },
  balance: {
    fontFamily: "inter",
    fontSize: 36,
    color: '#1576B7',
    fontWeight: "bold",
    marginLeft: 20,

  },
  historyContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 362,
    height: 336,
    backgroundColor: '#F1F1F1',
    borderRadius: 14,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
  
  },
 
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 323,
    height: 60,
    backgroundColor: '#E7E7E7',
    borderRadius: 14,
    paddingHorizontal: 10,
    marginTop: 16,

  },
  historyItemTop: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  historyItemName: {
    fontFamily: "inter",
    fontSize: 18,
  },
  historyItemMoney: {
    alignItems: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'center',
    
  },
  historyItemAmount: {
    fontFamily: "inter",
    fontSize: 18,
    color: '#000',
  },
  historyItemDate: {
    fontFamily: "inter",
    fontSize: 12,
    color: '#000',
    opacity: 0.6,
  },
  historyItemStatus: {
    fontFamily: "inter",
    fontSize: 12,
    color: '#008113',

  },
  historySeeMore: {
    fontFamily: "inter",
    fontSize: 16,
    opacity: 0.6,
    marginTop: 10,

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
    backgroundColor: '#5DADE2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginRight: 45,
  },
  btnTransfer: {
    width: 128,
    height: 40,
    backgroundColor: '#5DADE2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14
  },
  btnText: {
    fontSize: 16,
    color: '#FFF'
  },
});