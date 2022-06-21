import React from 'react';
import { View, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginPage from '../pages/LoginPage';

const HomeScreen = ({navigation})=>{
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            onPress={() => navigation.navigate('Notifications')}
            title="Go to notifications"
          />
        </View>
      );
}

const Drawer = createDrawerNavigator();

const SideMenu = () => {
  return (
    <Drawer.Navigator initialRouteName='Home' >
        <Drawer.Screen name='Home' component={LoginPage} />
    </Drawer.Navigator>
  )
};

export default SideMenu;