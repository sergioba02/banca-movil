import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    Platform
} from "react-native"
import { useUserData } from "../context/userDataProvider";
import { useState } from "react";

export default function HistoryScreen({ navigation }) {

    const { dataToList, fetchInOrder } = useUserData();

    return (
        dataToList.length === null ? (
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
                        onPress={() => {
                            fetchInOrder();
                            navigation.replace("HomeScreen")
                        }}
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