import { StyleSheet, View } from "react-native";
import Balance from "./Balance";
import HomeTitle from "./HomeTitle";
import BtnReceive from "./BtnReceive";
import BtnTransfer from "./BtnTransfer";

export default function HomeIndex(){
    return(
        <View style={styles.container}>
            <HomeTitle/>
            <Balance/>
            <View style={styles.btns}>
                <BtnReceive/>
                <BtnTransfer/>
            </View>

        </View>
    );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btns: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});