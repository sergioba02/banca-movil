import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function HomeTitle(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Hola</Text>
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
    }
  });