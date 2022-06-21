import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import LoginPage from './pages/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from './pages/HomePage';
import UserContextProvider from './store/Context';
import React from 'react';
import AttendCamera from './components/AttendCamera';

const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <UserContextProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home' >
          <Drawer.Screen name='Login' component={LoginPage} />
          <Drawer.Screen name='Home' component={HomePage} />
          <Drawer.Screen name='Camera' component={AttendCamera} />
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