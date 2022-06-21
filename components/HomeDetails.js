import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { UserContext } from '../store/Context';

const HomeDetails = () => {

    const {userData} = React.useContext(UserContext);

  return (
    <View style={styles.container} >
        {userData&&<Text style={styles.greet} >{`Welcome Back ${userData.name}`},</Text>}
        <Text style={styles.text} >Have a nice day...</Text>
        <Text style={styles.text} >Your clock is ticking, let's do that...</Text>
    </View>
  )
};

const styles = StyleSheet.create({
    container:{
        alignSelf:'center'
    },
    greet:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center'
    },
    text:{
        fontSize:15,
        fontWeight:'bold',
        textAlign:'left',
        alignSelf:'center'
    }
});

export default HomeDetails;