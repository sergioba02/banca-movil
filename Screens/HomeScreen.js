import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  Alert,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from "../context/userDataProvider";

import { useCameraPermissions } from "expo-camera";

export default function HomeScreen({ navigation }) {

  const { userData, dataToList, fetchInOrder, fetchCodes } = useUserData();

  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  const ipComputadora = "192.168.1.70";
  const maxItems = 4;


  const limitedData = Array.isArray(dataToList) ? dataToList.slice(0, maxItems) : [];
  

  const refreshData = () => {
    fetchInOrder();
  }

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        await fetch(`http://${ipComputadora}:3000/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      await AsyncStorage.removeItem('token');
      Alert.alert('Sesión cerrada', 'Gracias por usar Banca Móvil :)', [
        { text: 'Cerrar', onPress: () => { navigation.replace("LoginScreen"); } },
      ]);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      Alert.alert('Error', 'No se pudo cerrar sesión correctamente');
    }
  };

  const handleCameraAccess = async () => {
    if (isPermissionGranted) {
      navigation.navigate("Permission");
    } else {
      const permissionResponse = await requestPermission();
      if (permissionResponse.granted) {
        navigation.navigate("Permission");
      } else {
        Alert.alert("Permiso denegado", "Se requiere permiso a la cámara para continuar.");
      }
    }
  };

  return (
    !dataToList ? (
      <View style={styles.loadingScreen}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/LogoPuerkito.png')} />
        </View>
        <ActivityIndicator size="small" color="#000" />
        <Text style={styles.loadingText}>Conectando a Banca Móvil...</Text>
      </View>
    ) : (

      < ImageBackground source={require('../assets/backgroundv2.png')} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hola, {userData.name}</Text>
          <TouchableOpacity
            onPress={handleLogout}
          >
            <Image style={styles.logout} source={require('../assets/logout.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.balanceContainer}>
          <View>
            <Text style={styles.balanceLabel}>Saldo actual</Text>
            <Text style={styles.balance}>${userData.balance}</Text>
          </View>
          <TouchableOpacity
            style={styles.btnAddBalance}
            onPress={() => navigation.navigate("AddBalanceScreen")}
          >
            <Text style={styles.btnAdd}></Text>
          </TouchableOpacity>

        </View>
        {/* View de miniHistorial */}
        <View style={styles.historyContainer}>
          {console.log('Contenido de dataToList:', dataToList)}
          <FlatList
            data={limitedData}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <View style={styles.historyItemTop}>
                  <Text style={styles.historyItemName}>{item.name}</Text>
                  <Text style={styles.historyItemDate}>{item.date}</Text>
                </View>
                <View style={styles.historyItemMoney}>
                  <Text
                    style={[
                      styles.historyItemAmount,
                      { color: item.type === 'income' ? 'green' : 'red' }
                    ]}
                  >
                    {item.type === 'income' ? '+' : '-'}${item.amount}
                  </Text>
                  <Text style={styles.historyItemStatus}>{item.status}</Text>
                </View>
              </View>
            )}
            keyExtractor={(index) => index.toString()}
            ListEmptyComponent={<Text>No hay datos para mostrar</Text>}
          />
          <TouchableOpacity
            style={styles.historySeeMore}
            onPress={() => {
              refreshData();
              navigation.navigate("HistoryScreen")
            }}
          >
            <Text style={styles.historySeeMoreLabel}>Ver más</Text>
          </TouchableOpacity>
        </View>
        {/* View de miniHistorial */}
        <View style={styles.btnsContainer}>
          <TouchableOpacity
            style={styles.btnReceive}
            onPress={handleCameraAccess}//Abrir camara para escanear QR
          >
            <Text style={styles.btnText}>Recibir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnTransfer}
            onPress={() => navigation.navigate("TransferScreen")}
          >
            <Text style={styles.btnText}>Transferir</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.generatedCodesContainer}>
            <TouchableOpacity
              onPress={() => {
                fetchCodes();
                navigation.navigate("GenCodesScreen")
              }}
            >
              <Text style={styles.generatedCodesText}>Códigos generados sin escanear</Text>
            </TouchableOpacity>
          </View>

      </ImageBackground >

    )
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
    width: 362,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
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

  },
  logout: {
    width: 25,
    height: 25,
  },
  balanceContainer: {
    justifyContent: 'space-between',
    width: 362,
    height: 97,
    backgroundColor: '#F1F1F1',
    borderRadius: 14,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,

  },
  balanceLabel: {
    fontFamily: "inter",
    fontSize: 16,
    color: '#1576B7',
    opacity: 0.55,
    fontWeight: "bold",
  },
  balance: {
    fontFamily: "inter",
    fontSize: 36,
    color: '#1576B7',
    fontWeight: "bold",
  },
  BalanceTextContainer: {
    flexDirection: 'column',
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
    marginBottom: 6,

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
  btnAddBalance: {
    width: 150,
    height: 98,
    backgroundColor: '#c1c1c1',
    opacity: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginRight: -20,
  },
  btnAdd: {
    fontSize: 18,
    fontStyle: 'normal',
    //color: '#5DADE2',
    color: '#000',
    fontWeight: '400',
    marginLeft: 20,
    //opacity: 0.6,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Platform.select({
      android: -30,
      ios: 0,
    }),
  },
  logo: {
    width: 320,
    height: 128,
  },
  loadingText: {
    fontFamily: "inter",
    fontSize: 20,
    color: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    marginTop: 50

  },
  generatedCodesContainer: {
    position: 'absolute',
    top: Platform.select({
      android: 700,
      ios: 700,
    }),
    alignItems: 'center',
    justifyContent: 'center',
    width: 362,
    height: 49,
    backgroundColor: '#F1F1F1',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    paddingHorizontal: 20,
  },
  generatedCodesText: {
    fontFamily: "inter",
    fontSize: 16,
    color: '#1576B7',
    fontWeight: "bold",
  },


});