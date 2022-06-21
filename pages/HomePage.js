import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, ActivityIndicator, Button } from 'react-native';
import Images from '../assets/images';
import Attend from '../components/Attend';
import HomeDetails from '../components/HomeDetails';
import authService from '../services/auth.service';
import { UserContext } from '../store/Context';

const HomePage = ({ navigation }) => {

  const { userData, setUserData } = React.useContext(UserContext);

  const getUserData = async () => {
    const response = await authService.getCurrentUser();
    if (response.status === 401) {
      navigation.navigate('Login');
    } else if (response.status === 200) {
      setUserData(response.data);
    } else {
      setServerErr(true);
    }
  }

  React.useEffect(() => {
    if (!userData) {
      getUserData();
    }
  }, []);

  if (!userData) {
    return <View style={styles.indicatorContainer} ><ActivityIndicator size="large" /></View>
  }

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
        <View style={{ width: 100, alignSelf: 'center' }} >
          <Attend />
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
  },
  indicatorContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  }
});

export default HomePage;