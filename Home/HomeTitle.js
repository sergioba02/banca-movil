import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function HomeTitle(){
    const name = 'Aurora'
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Hola {name}</Text>
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 145,
      marginBottom: 70,
      
    },
    text: {
        fontSize: 48,
        color: '#004445',
        fontFamily: 'inter',
        fontWeight: 'bold'
    }
  });