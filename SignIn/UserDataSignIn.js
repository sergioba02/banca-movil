import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import DataContainer from "./DataContainerSignIn";

export default function UserDataSignIn(){
    return(
        <View>
            <DataContainer text={'Nombre'}/>
            <DataContainer text={'Apellido'}/>
            <DataContainer text={'Correo electrónico'}/>
            <DataContainer text={'Contraseña'}/>
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