import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function Balance(){
    const balance = 0.00;
    return(
        <View style={styles.container}>
            <Text style={styles.balanceLabel}>Tu saldo:</Text>
            <TouchableOpacity style={styles.balanceContainer}>
                <Text style={styles.balance}>${balance}<Text style={styles.currency}>MXN</Text></Text>
            </TouchableOpacity>
        </View>
  );
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
      
    },
    balanceLabel: {
        fontSize: 24,
        color: '#004445',
        fontFamily: 'inter',
        fontWeight: 'bold',
        marginBottom: 45,    
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
      balanceContainer: {
        alignItems: 'center',
        justifyContent: 'center'
        
      },
  });