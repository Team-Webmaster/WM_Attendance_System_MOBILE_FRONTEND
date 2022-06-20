import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './pages/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SideMenu from './components/SideMenu';
import HomePage from './pages/HomePage';
import UserContextProvider from './store/Context';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home' >
          <Drawer.Screen name='Login' component={LoginPage} />
          <Drawer.Screen name='Home' component={HomePage} />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//#A7C7FF