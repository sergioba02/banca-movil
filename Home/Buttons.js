import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function Buttons(){
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnReceive}>  
                <Text style={styles.text}>Recibir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnTransfer}>
                <Text style={styles.text}>Transferir</Text>
            </TouchableOpacity>
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
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
    }
  });