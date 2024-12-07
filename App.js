import { StyleSheet } from 'react-native';
import HomeScreen from './Screens/HomeScreen.js';
import LoginScreen from './Screens/LoginScreen.js'
import SigninScreen from './Screens/SigninScreen.js'
import HistoryScreen from './Screens/HistoryScreen.js'
import AddBalanceScreen from './Screens/AddBalanceScreen.js'
import TransferScreen from './Screens/TransferScreen.js'
import ReceiveScreen from './Screens/ReceiveScreen.js'
import Permission from './Screens/Permission.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './context/userDataProvider.js';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName='LoginScreen' 
        screenOptions={{ 
          headerShown: false,
          }}>
          <Stack.Screen name='LoginScreen' component={LoginScreen} />
          <Stack.Screen name='SigninScreen' component={SigninScreen} />
          <Stack.Screen name='HomeScreen' component={HomeScreen} />
          <Stack.Screen name='HistoryScreen' component={HistoryScreen} />
          <Stack.Screen name='AddBalanceScreen' component={AddBalanceScreen} />
          <Stack.Screen name='TransferScreen' component={TransferScreen} />
          <Stack.Screen name='ReceiveScreen' component={ReceiveScreen} />
          <Stack.Screen name='Permission' component={Permission} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
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
