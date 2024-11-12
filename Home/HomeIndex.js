import { StyleSheet, View } from "react-native";
import Balance from "./Balance";
import HomeTitle from "./HomeTitle";
import Buttons from "./Buttons";

export default function HomeIndex(){
    return(
        <View style={styles.container}>
            <HomeTitle/>
            <Balance/>
            <Buttons/>
        </View>
    );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignItems: 'flex-start'
  }
});