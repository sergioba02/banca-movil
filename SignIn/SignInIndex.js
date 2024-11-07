import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Title from "./Title";
import UserData from "./UserData";
import BtnSignIn from "./BtnSignIn";

export default function SignInIndex(){
    return(
        <View style={styles.container}>
            <Title/>
            <UserData/>
            <BtnSignIn/>
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