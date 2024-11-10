import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginIndex from './Login/LoginIndex.js';
import SignInIndex from './SignIn/SignInIndex.js';
import HomeIndex from './Home/HomeIndex.js';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <LoginIndex/> */}
      {/* <SignInIndex/> */}
      <HomeIndex/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6FB98F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
