import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button, ActivityIndicator, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { UserContext } from '../store/Context';
import axios from 'axios';

const AttendCamera = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.front);
  const [camera, setCamera] = useState(new Camera());
  const { userData } = React.useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  function blobToFile(theBlob, fileName) {
    return new File([theBlob], fileName + theBlob.type, { lastModified: new Date().getTime(), type: theBlob.type })
  }

  const handleCapture = async () => {
    if (!camera) { return; }
    const photo = await camera.takePictureAsync();
    const imageFile = blobToFile(await (await fetch(photo.uri)).blob(), "newFile")
    const formData = new FormData();
    if (route.params.userStatus.type === 0) {
      formData.append('date', new Date().toISOString().slice(0, 10));
      formData.append('inTime', new Date().toString().slice(11, 16));
      formData.append('outTime', '');
      formData.append('type', 'Attend');
      formData.append('uId', userData.userId);
      formData.append('faceImage', imageFile);
      setIsLoading(true);
      axios.post('https://localhost:5001/api/Attendance/add', formData)
        .then((res) => {
          setIsLoading(false);
          Alert.alert("Attend success.!", "You are successfully marked your attendance.",
            [{ text: "Back to home", onPress: () => navigation.navigate('Home') }]);
          alert("Attend success.! You are successfully marked your attendance.");
          navigation.navigate('Home');
          console.log(res);
        })
        .catch((err) => {
          setIsLoading(false);
          Alert.alert("Attend failed.!", "Your face is not matched. Try again.",
            [{ text: "Try again", style: 'cancel' }]);
          if (err.response.status === 500) {
            alert("Attend failed. face not found.");
          } else {
            alert("Attend failed.! Your face is not matched. Try again.");
          }
        });
    } else if (route.params.userStatus.type === 1) {
      if (route.params.type === "B2W") {
        formData.append('date', route.params.userStatus.break.date);
        formData.append('inTime', route.params.userStatus.break.inTime);
        formData.append('outTime', new Date().toString().slice(11, 16));
        formData.append('type', 'Break');
        formData.append('uId', userData.userId);
        formData.append('faceImage', imageFile);
        setIsLoading(true);
        axios.put(`https://localhost:5001/api/Attendance/${route.params.userStatus.break.id}`, formData)
          .then((res) => {
            setIsLoading(false);
            Alert.alert("Attend success.!", "You are successfully marked your attendance.",
              [{ text: "Back to home", onPress: () => navigation.navigate('Home') }]);
            alert("Attend success.! You are successfully marked your attendance.");
            navigation.navigate('Home');
            console.log(res);
          })
          .catch((err) => {
            setIsLoading(false);
            Alert.alert("Attend failed.!", "Your face is not matched. Try again.",
              [{ text: "Try again", style: 'cancel' }]);
            if (err.response.status === 500) {
              alert("Attend failed. face not found.");
            } else {
              alert("Attend failed.! Your face is not matched. Try again.");
            }
          });
      } else {
        formData.append('date', route.params.userStatus.break.date);
        formData.append('inTime', route.params.userStatus.break.inTime);
        formData.append('outTime', new Date().toString().slice(11, 16));
        formData.append('type', 'Attend');
        formData.append('uId', userData.userId);
        formData.append('faceImage', imageFile);
        setIsLoading(true);
        axios.put(`https://localhost:5001/api/Attendance/${route.params.userStatus.attend.id}`, formData)
          .then((res) => {
            setIsLoading(false);
            Alert.alert("Attend success.!", "You are successfully marked your attendance.",
              [{ text: "Back to home", onPress: () => navigation.navigate('Home') }]);
            alert("Attend success.! You are successfully marked your attendance.");
            navigation.navigate('Home');
            console.log(res);
          })
          .catch((err) => {
            setIsLoading(false);
            Alert.alert("Attend failed.!", "Your face is not matched. Try again.",
              [{ text: "Try again", style: 'cancel' }]);
            if (err.response.status === 500) {
              alert("Attend failed. face not found.");
            } else {
              alert("Attend failed.! Your face is not matched. Try again.");
            }
          });
      }
    } else {
      if (route.params.type === "Br") {
        formData.append('date', new Date().toISOString().slice(0, 10));
        formData.append('inTime', new Date().toString().slice(11, 16));
        formData.append('outTime', '');
        formData.append('type', 'Break');
        formData.append('uId', userData.userId);
        formData.append('faceImage', imageFile);
        setIsLoading(true);
        axios.post('https://localhost:5001/api/Attendance/add', formData)
          .then((res) => {
            setIsLoading(false);
            Alert.alert("Attend success.!", "You are successfully marked your attendance.",
              [{ text: "Back to home", onPress: () => navigation.navigate('Home') }]);
            alert("Attend success.! You are successfully marked your attendance.");
            navigation.navigate('Home');
            console.log(res);
          })
          .catch((err) => {
            setIsLoading(false);
            Alert.alert("Attend failed.!", "Your face is not matched. Try again.",
              [{ text: "Try again", style: 'cancel' }]);
            if (err.response.status === 500) {
              alert("Attend failed. face not found.");
            } else {
              alert("Attend failed.! Your face is not matched. Try again.");
            }
          });
      } else {
        formData.append('date', route.params.userStatus.break.date);
        formData.append('inTime', route.params.userStatus.break.inTime);
        formData.append('outTime', new Date().toString().slice(11, 16));
        formData.append('type', 'Attend');
        formData.append('uId', userData.userId);
        formData.append('faceImage', imageFile);
        setIsLoading(true);
        axios.put(`https://localhost:5001/api/Attendance/${route.params.userStatus.attend.id}`, formData)
          .then((res) => {
            setIsLoading(false);
            Alert.alert("Attend success.!", "You are successfully marked your attendance.",
              [{ text: "Back to home", onPress: () => navigation.navigate('Home') }]);
            alert("Attend success.! You are successfully marked your attendance.");
            navigation.navigate('Home');
            console.log(res);
          })
          .catch((err) => {
            setIsLoading(false);
            Alert.alert("Attend failed.!", "Your face is not matched. Try again.",
              [{ text: "Try again", style: 'cancel' }]);
            if (err.response.status === 500) {
              alert("Attend failed. face not found.");
            } else {
              alert("Attend failed.! Your face is not matched. Try again.");
            }
          });
      }
    }

  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(r) => {
          setCamera(r);
        }}
      >
        {isLoading && <View style={styles.indicator} ><ActivityIndicator size="large" /></View>}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <Text style={styles.text}> Flip Camera </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.captureButton} >
          <TouchableOpacity
            onPress={handleCapture}
            style={{
              width: 70,
              height: 70,
              bottom: 5,
              borderRadius: 50,
              backgroundColor: '#fff'
            }}
          >
            <Text style={styles.attendText} >Attend</Text>
            <Text style={styles.attendTextMe} >ME</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginLeft: 20
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    color: 'white',
    margin: 10
  },
  captureButton: {
    alignSelf: 'center'
  },
  attendText: {
    textAlign: 'center',
    marginTop: 18,
    fontWeight: 'bold',
    fontFamily: 'cursive'
  },
  attendTextMe: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'cursive'
  },
  indicator: {
    alignSelf: 'center',
    marginTop: '70%'
  }
});

export default AttendCamera;