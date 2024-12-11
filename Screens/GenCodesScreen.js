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

export default function GenCodesScreen ({ navigation }) {

    const { userData, codesToList, fetchInOrder, fetchCodes, handleRebuildCode } = useUserData();

    const refreshData = () => {
        fetchInOrder();
      }

    return (
        !codesToList ? (
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
                    <Text style={styles.label}>Códigos generados disponibles para escanear</Text>
                </View>
                {/*Historial */}
                <View style={styles.historyContainer}>
                    {console.log('Contenido de codesToList:', codesToList)}
                    <FlatList
                        data={codesToList}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                            style={styles.historyItem}
                            onPress={()=>{
                                navigation.navigate("QrCodeScreen", { code: item.code, orig_id: userData.id, amount: item.amount, concept: item.concept })
                            }}
                            >
                                <View style={styles.historyItemLeft}>
                                    <Text style={styles.historyItemConcept}>Concepto: {item.concept}</Text>
                                    <Text style={styles.historyItemDate}>{item.date}</Text>
                                </View>
                                <View style={styles.historyItemRight}>
                                    <Text style={styles.historyItemAmount}>${item.amount}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={<Text>No hay datos para mostrar</Text>}
                    />
                </View>
                {/*Historial */}
                <View>
                    <TouchableOpacity
                        style={styles.btnClose}
                        onPress={() => {
                            refreshData();
                            navigation.pop()
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
    header: {
        width: 364,
        height: 'auto'
    },
    label: {
        fontFamily: "inter",
        fontSize: 24,
        fontWeight: "bold",
        color: 'black',
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
    historyItemLeft: {
        justifyContent: 'center',
        flexDirection: 'column',
    },
    historyItemConcept: {
        fontFamily: "inter",
        fontSize: 18,
    },
    historyItemRight: {
        alignItems: 'flex-end',
        flexDirection: 'column',
        justifyContent: 'center',

    },
    historyItemDate: {
        fontFamily: "inter",
        fontSize: 16,
        color: '#000',
    },
    historyItemAmount: {
        fontFamily: "inter",
        fontSize: 20,
        color: '#000',

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