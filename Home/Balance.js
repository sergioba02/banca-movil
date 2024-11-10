import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function Balance(){
    // const name = 'Sergio'
    // const balance = '2000.00'
    return(
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.text}>Tu saldo:</Text>
            </View>
            <View style={styles.container2}>
                <TouchableOpacity>
                    <Text style={styles.balance}>$</Text>
                    <Text> style={styles.currency}MXN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -200,
      marginBottom: 40,
      
    },
    text: {
        fontSize: 48,
        color: '#004445',
        fontFamily: 'inter',
        fontWeight: 'bold'
    },
    balance: {
        fontSize: 48,
        color: '#fff',
        fontFamily: 'inter',
        fontWeight: 'bold'
    },
    currency: {
        fontSize: 24,
        color: '#fff',
        fontFamily: 'inter',
        fontWeight: 'bold'
    },
    container1: {
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      container2: {
        alignItems: 'center',
        justifyContent: 'center'
        
      },
  });