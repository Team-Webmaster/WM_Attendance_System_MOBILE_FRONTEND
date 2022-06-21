import React from 'react';
import { View, Button } from 'react-native';

const Attend = ({navigation}) => {
  return (
    <View>
        <Button title='Attend' onPress={()=>navigation.navigate('Camera')} />
    </View>
  )
};

export default Attend;