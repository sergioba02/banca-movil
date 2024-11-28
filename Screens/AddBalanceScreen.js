import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native"

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.label}>Depositar a mi cuenta</Text>
            </View>
            <View style={styles.historyContainer}>
                <TouchableOpacity style={styles.historyItem}>
                    <View style={styles.historyItemTop}>
                        <Text style={styles.historyItemName}>Sergio Tabula</Text>
                        <Text style={styles.historyItemDate}>09/11/24</Text>
                    </View>
                </TouchableOpacity>
            </View>
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
        backgroundColor: '#218DD4'
    },
    header: {
        height: 'auto',
        width: 'auto',
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
        height: 300,
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
});