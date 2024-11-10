import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function BtnTransfer(){
    return(
        <View style={styles.container}>
            <TouchableOpacity>
                <Text style={styles.text}>Transferir</Text>
            </TouchableOpacity>
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 80,
      backgroundColor: '#004445',
      width: 128,
      height: 40,
    },
    text: {
        fontSize: 16,
        color: '#6FB98F'
    }
  });