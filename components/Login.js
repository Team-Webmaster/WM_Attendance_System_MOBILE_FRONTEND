import React from 'react';
import { TextInput, View, StyleSheet, Button, Text } from 'react-native';
import authService from '../services/auth.service';

const Login = ({navigation}) => {

    const [values,setValues] = React.useState({email:'',password:''});

    const handleSubmit = async ()=>{
        const loginData = {
            email:values.email,
            password:values.password
        }
        navigation.navigate('Home');
        const response = await authService.login(loginData);
    }

    return (
        <View style={styles.container} >
            <Text style={styles.title} >Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={values.email}
                onChangeText={(value)=>setValues({...values,email:value})}
                autoFocus
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={values.password}
                onChangeText={(value)=>setValues({...values,password:value})}
            />
            <Button
                color="#0074ff"
                title='Login'
                onPress={handleSubmit}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        width:'100%',
        padding:30,
        backgroundColor:'white',
        borderColor:'white',
        borderWidth:1.5,
        shadowColor:'#0000ff',
        shadowOffset: {
            width:0,
            height:2
        },
        shadowRadius:6,
        shadowOpacity:0.26,
        backgroundColor:'white',
        elevation:10,
        borderRadius:10
    },
    input: {
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        borderBottomColor:'grey',
        borderBottomWidth:1,
    },
    title:{
        fontWeight:'bold',
        fontSize:30,
        textAlign:'center',
        marginBottom:10
    }
});

export default Login;