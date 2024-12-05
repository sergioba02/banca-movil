import { useEffect, useState } from "react";
import { StyleSheet, 
    View, 
    TouchableOpacity, 
    Text, 
    Image, 
    FlatList, 
    Alert, 
    ActivityIndicator,
    Platform
 } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen({ navigation }) {

    const [dataToList, setDataToList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchUserTransactions = async () => {
            try {
                const ids = [];
                const token = await AsyncStorage.getItem('token');

                if (!token) {
                    Alert.alert('Error', 'No se encontró el token de autenticación');
                    return;
                }

                const response = await fetch('http://192.168.1.67:3000/user/allTransactions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (response.status === 200) {

                    const jsonData = await response.json();

                    jsonData.data.forEach((transaction) => {
                        if (transaction.user_orig_id !== jsonData.id && !ids.includes(transaction.user_orig_id)) {
                            ids.push(transaction.user_orig_id);
                        }
                        if (transaction.user_dest_id !== jsonData.id && !ids.includes(transaction.user_dest_id)) {
                            ids.push(transaction.user_dest_id);
                        }
                    })
                    console.log(ids)
                    return { ids: ids, userID: jsonData.id, transactions: jsonData.data };
                }
            } catch (error) {
                Alert.alert('Error', 'No se pudo conectar con el servidor');
                console.error(error);
            }
        };

        const fetchUsersNames = async (ids) => {
            try {
                const token = await AsyncStorage.getItem('token');

                if (!token) {
                    Alert.alert('Error', 'No se encontró el token de autenticación');
                    return;
                }

                const queryString = ids.map(id => `id=${id}`).join('&');

                const response = await fetch(`http://192.168.1.67:3000/users/names?${queryString}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const jsonData = await response.json();
                    return jsonData.data;

                }
            } catch (error) {
                Alert.alert('Error', 'No se pudo conectar con el servidor');
                console.error(error);
            }
        };

        const fetchInOrder = async () => {
            try {
                const { ids, userID, transactions } = await fetchUserTransactions();
                const usersNames = await fetchUsersNames(ids);

                console.log('Id del usuario: ', userID)

                const tempDataToList = [...dataToList];

                for (const transaction of transactions) {
                    console.log(transaction)
                    let tempID;
                    let tempUser;

                    if (transaction.user_orig_id !== userID) {
                        tempID = transaction.user_orig_id;
                        tempUser = usersNames.find(user => user.id == tempID);
                    } else {
                        tempID = transaction.user_dest_id;
                        tempUser = usersNames.find(user => user.id == tempID);
                    }
                    tempDataToList.push({
                        id: tempID,
                        name: `${tempUser.name} ${tempUser.surname}`,
                        amount: transaction.amount,
                        date: transaction.date.slice(0, 10),
                        status: 'default',
                    });
                }

                setDataToList(tempDataToList)

                setTimeout(() => {
                    setIsLoading(false);
                }, 1500);

            } catch (error) {
                console.error('Error en alguna de las peticiones:', error);
            }

        }
        fetchInOrder();

    }, []);
    return (
        isLoading || dataToList.length === 0 ? (
            <View style={styles.loadingScreen}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/LogoPuerkito.png')} />
                </View>
                <ActivityIndicator size="small" color="#000" />
                <Text style={styles.loadingText}>Cargando datos de tu Banca Móvil...</Text>
            </View>
        ) : (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.label}>Historial de movimientos</Text>
                </View>
                {/*Historial */}
                <View style={styles.historyContainer}>
                    {console.log('Contenido de dataToList:', dataToList)}
                    <FlatList
                        data={dataToList}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.historyItem}>
                                <View style={styles.historyItemTop}>
                                    <Text style={styles.historyItemName}>{item.name}</Text>
                                    <Text style={styles.historyItemDate}>{item.date}</Text>
                                </View>
                                <View style={styles.historyItemMoney}>
                                    <Text style={styles.historyItemAmount}>${item.amount}</Text>
                                    <Text style={styles.historyItemStatus}>{item.status}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        ListEmptyComponent={<Text>No hay datos para mostrar</Text>}
                    />
                </View>
                {/*Historial */}
                <View>
                    <TouchableOpacity
                        style={styles.btnClose}
                        onPress={() => navigation.navigate("HomeScreen")}
                    >
                        <Text style={styles.textClose}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#218DD4'
    },
    label: {
        fontFamily: "inter",
        fontSize: 24,
        fontWeight: "bold",
        color: 'black',
        marginRight: 180,
        color: '#FFFFFF',
        marginTop: 68,
        marginBottom: 13,

    },
    historyContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 362,
        height: 602,
        backgroundColor: '#F1F1F1',
        borderRadius: 14,
        marginBottom: 43,
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
});