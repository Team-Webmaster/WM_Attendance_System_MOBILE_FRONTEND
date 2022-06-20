import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import Images from '../assets/images';
import HomeDetails from '../components/HomeDetails';

const HomePage = () => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
            <View style={styles.pageContainer} >
                <View style={styles.container} >
                    <Image style={{ width: 70, height: 70, resizeMode: 'contain', alignSelf: 'center' }} source={Images.logoImage} />
                    <Text style={styles.title} >WM Attendance System</Text>
                    <View style={styles.imageContainer} >
                        <Image style={{ width: 330, height: 300, resizeMode: 'contain' }} source={Images.helloImage} />
                    </View>
                    <View>
                        <HomeDetails />
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

export default HomePage;