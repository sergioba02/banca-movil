import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LoginTitle from "./LoginTitle";
import UserDataLogin from "./UserDataLogin";
import BtnLogin from "./BtnLogin";

export default function LoginIndex(){
    return(
        <View style={styles.container}>
            <LoginTitle/>
            <UserDataLogin/>
            <BtnLogin/>
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