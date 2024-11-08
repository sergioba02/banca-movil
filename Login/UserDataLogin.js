import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import DataContainerLogin from "./DataContainerLogin";

export default function UserDataLogin(){
    return(
        <View>
            <DataContainerLogin text={'Correo electrónico'}/>
            <DataContainerLogin text={'Contraseña'}/>
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });