import React from 'react';
import { Image, View, StyleSheet, Text, ScrollView } from 'react-native';
import Login from '../components/Login';
import Images from '../assets/images';

const LoginPage = ({navigation}) => {
    return (
        <ScrollView contentContainerStyle={{flexGrow:1}} >
            <View style={styles.pageContainer} >
                <View style={styles.container} >
                    <Image style={{ width: 70, height: 70, resizeMode: 'contain', alignSelf: 'center' }} source={Images.logoImage} />
                    <Text style={styles.title} >WM Attendance System</Text>
                    <View style={styles.imageContainer} >
                        <Image style={{ width: 300, height: 300, resizeMode: 'contain' }} source={Images.loginImage} />
                    </View>
                    <View>
                        <Login navigation={navigation} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignContent: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        width: '85%',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'center'
    },
    imageContainer: {
        alignContent: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default LoginPage;