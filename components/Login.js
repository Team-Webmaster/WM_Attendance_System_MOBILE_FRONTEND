import React from 'react';
import { TextInput, View, StyleSheet, Button, Text } from 'react-native';
import authService from '../services/auth.service';
import { UserContext } from '../store/Context';

const Login = ({navigation}) => {

    const [values,setValues] = React.useState({email:'',password:''});
    const [errMsg,setErrMsg] = React.useState('');
    const {setUserData} = React.useContext(UserContext);

    const handleSubmit = async ()=>{
        const loginData = {
            email:values.email,
            password:values.password
        }
        if((!loginData.email)||(!loginData.password)){
            return;
        }
        console.log(loginData);
        const response = await authService.login(loginData);
        if (response.status===200) {
            console.log(response.data);
            setUserData(response.data.data);
            navigation.navigate('Home');
          }
          else if(response.status===400) {
            console.log(response);
            setErrMsg(response.data.message);
          }else{
            console.log(response);
          }
    }

    return (
        <View style={styles.container} >
            <Text style={styles.title} >Login</Text>
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={values.email}
                onChangeText={(value)=>setValues({...values,email:value})}
                autoFocus
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={values.password}
                onChangeText={(value)=>setValues({...values,password:value})}
                useNativeDriver={true}
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
    input:{
        width:'97%',
        height:40,
        marginBottom:10,
        borderBottomColor:'black',
        borderBottomWidth:1,
        alignSelf:'center',
        paddingLeft:5
    },
    title:{
        fontWeight:'bold',
        fontSize:30,
        textAlign:'center',
        marginBottom:10
    }
});

export default Login;