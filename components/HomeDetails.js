import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { UserContext } from '../store/Context';

const HomeDetails = () => {

    const {userData} = React.useContext(UserContext);

  return (
    <View style={styles.container} >
        <Text style={styles.text} >Welcome Back Lakshitha,</Text>
        <Text >Have a nice day...</Text>
        <Text>Your clock is ticking, let's do that...</Text>
    </View>
  )
};

const styles = StyleSheet.create({
    container:{
        alignSelf:'center'
    },
    text:{
        fontSize:30,
        fontWeight:'bold'
    }
});

export default HomeDetails;