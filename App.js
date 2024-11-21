import { StyleSheet } from 'react-native';
import HomeScreen from './Screens/HomeScreen.js';
import LoginScreen from './Screens/LoginScreen.js'
import SigninScreen from './Screens/SigninScreen.js'
import HistoryScreen from './Screens/HistoryScreen.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HistoryScreen' screenOptions={{headerShown:false}}>
        <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        <Stack.Screen name='SigninScreen' component={SigninScreen}/>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
        <Stack.Screen name='HistoryScreen' component={HistoryScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
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
