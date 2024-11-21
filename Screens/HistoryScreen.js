import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native"

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.label}>Historial de movimientos</Text>
            </View>
            {/*Historial */}
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#E7E7E7'
    },
    label: {
        fontFamily: "inter",
        fontSize: 24,
        fontWeight: "bold",
        color: 'black',
        marginRight: 180,
        color: '#009216',
        marginTop: 68,
        marginBottom: 13,

    },
    historyContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 362,
        height: 602,
        backgroundColor: '#fff',
        borderRadius: 14,
        marginBottom: 43,
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
    btnClose: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E7E7E7',
        borderWidth: 3,
        borderColor: '#009216',
        width: 362,
        height: 45,
        borderRadius: 100,

    },
    textClose: {
        fontSize: 20,
        color: '#009216',
        fontFamily: "inter",
        fontWeight: "bold"
    },
});