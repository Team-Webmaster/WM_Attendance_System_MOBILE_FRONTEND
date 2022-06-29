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

  function get24Hours(date, amPmString) {
    var d = new Date(date + amPmString);
    console.log(d);
    return d.getHours() + ":" + d.getMinutes();
  }

  function attend(date, imageFile) {
    var formData = new FormData();
    formData.append('date', date.slice(0, 9).replace('/', '-'));
    formData.append('inTime', get24Hours(date.slice(0, 9) + " ", date.slice(11, 15) + date.slice(18, 21)));
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
        route.params.reFetch();
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

  function getBreak(date, imageFile) {
    var formData = new FormData();
    formData.append('date', date.slice(0, 9).replace('/', '-'));
    formData.append('inTime', get24Hours(date.slice(0, 9) + " ", date.slice(11, 15) + date.slice(18, 21)));
    formData.append('outTime', '');
    formData.append('type', 'Break');
    formData.append('uId', userData.userId);
    formData.append('faceImage', imageFile);
    setIsLoading(true);
    axios.post('https://localhost:5001/api/Attendance/add', formData)
      .then((res) => {
        setIsLoading(false);
        Alert.alert("Break success.!", "You are successfully marked your attendance.",
          [{ text: "Back to home", onPress: () => navigation.navigate('Home') }]);
        alert("Break success.! You are successfully marked your attendance.");
        navigation.navigate('Home');
        console.log(res);
        route.params.reFetch();
      })
      .catch((err) => {
        setIsLoading(false);
        Alert.alert("Break failed.!", "Your face is not matched. Try again.",
          [{ text: "Try again", style: 'cancel' }]);
        if (err.response.status === 500) {
          alert("Break failed. face not found.");
        } else {
          alert("Break failed.! Your face is not matched. Try again.");
        }
      });
  }

  function backToWork(date, breakD, imageFile) {
    var formData = new FormData();
    formData.append('id', breakD.id);
    formData.append('date', breakD.date);
    formData.append('inTime', breakD.inTime);
    formData.append('outTime', get24Hours(date.slice(0, 9) + " ", date.slice(11, 15) + date.slice(18, 21)));
    formData.append('type', 'Break');
    formData.append('uId', userData.userId);
    formData.append('faceImage', imageFile);
    setIsLoading(true);
    axios.put(`https://localhost:5001/api/Attendance/${breakD.id}`, formData)
      .then((res) => {
        navigation.navigate('Home');
        route.params.reFetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function workOff(date, attend, breakD, imageFile, inBreak) {
    var formData = new FormData();
    formData.append('id', attend.id);
    formData.append('date', attend.date);
    formData.append('inTime', attend.inTime);
    formData.append('outTime', get24Hours(date.slice(0, 9) + " ", date.slice(11, 15) + date.slice(18, 21)));
    formData.append('type', 'Attend');
    formData.append('uId', userData.userId);
    formData.append('faceImage', imageFile);
    setIsLoading(true);
    axios.put(`https://localhost:5001/api/Attendance/${attend.id}`, formData)
      .then((res) => {
        setIsLoading(false);
        Alert.alert("Work out success.!", "You are successfully marked your attendance.",
          [{ text: "Back to home", onPress: () => navigation.navigate('Home') }]);
        if (!inBreak) {
          route.params.reFetch();
          navigation.navigate('Home');
          alert("Work out success.! You are successfully marked your attendance.");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        Alert.alert("Work out failed.!", "Your face is not matched. Try again.",
          [{ text: "Try again", style: 'cancel' }]);
        if (err.response.status === 500) {
          alert("Work out failed. face not found.");
        } else {
          alert("Work out failed.! Your face is not matched. Try again.");
        }
      });
    if (inBreak) {
      var formData2 = new FormData();
      formData2.append('id', breakD.id);
      formData2.append('date', breakD.date);
      formData2.append('inTime', breakD.inTime);
      formData2.append('outTime', get24Hours(date.slice(0, 9) + " ", date.slice(11, 15) + date.slice(18, 21)));
      formData2.append('uId', userData.userId);
      formData2.append('faceImage', imageFile);
      formData2.append('type', 'Break');
      axios.put(`https://localhost:5001/api/Attendance/${breakD.id}`, formData2)
        .then((res) => {
          console.log(res);
          route.params.reFetch();
          navigation.navigate('Home');
          alert("Work out success.! You are successfully marked your attendance.");
        })
        .catch((err) => {
          alert("Work out failed.! Your face not matched.");
        });
    }
  }

  const handleCapture = async () => {
    if (!camera) { return; }
    const photo = await camera.takePictureAsync();
    const imageFile = blobToFile(await (await fetch(photo.uri)).blob(), "newFile")
    const date = new Date().toLocaleString('en-US', 'Asia/Colombo');
    if (route.params.userStatus.type === 0) {
      attend(date, imageFile);
    } else if (route.params.userStatus.type === 1) {
      if (route.params.type === "B2W") {
        backToWork(date, route.params.userStatus.break, imageFile);
      } else {
        workOff(date, route.params.userStatus.attend, route.params.userStatus.break, imageFile, true);
      }
    } else {
      if (route.params.type === "Br") {
        getBreak(date, imageFile);
      } else {
        workOff(date, route.params.userStatus.attend, '', imageFile, false);
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
            <Text style={styles.attendText} >Capture</Text>
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