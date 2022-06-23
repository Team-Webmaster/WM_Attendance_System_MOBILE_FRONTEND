import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import LoginPage from './pages/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from './pages/HomePage';
import UserContextProvider from './store/Context';
import React from 'react';
import AttendCamera from './components/AttendCamera';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Root() {
  return (
    <Drawer.Navigator initialRouteName='Home' >
      <Drawer.Screen name='Home' component={HomePage} />
    </Drawer.Navigator>
  );
}

export default function App() {

  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Root' >
          <Stack.Screen
            name='Root'
            component={Root}
            options={{headerShown:false}}
          />
          <Stack.Screen name='Login' component={LoginPage} />
          <Stack.Screen name='Camera' component={AttendCamera} />
        </Stack.Navigator>
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