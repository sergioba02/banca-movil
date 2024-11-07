import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"

export default function DataContainer({text}){
    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View >
                <TextInput 
                style={styles.input}
                placeholder={text}
                placeholderTextColor='#2C7873'
            
                />
            </View>
        </TouchableWithoutFeedback>

    );
} 

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 300,
        margin: 12,
        padding: 10,
        borderRadius: 14,
        backgroundColor: '#fff',
    
    },
  });