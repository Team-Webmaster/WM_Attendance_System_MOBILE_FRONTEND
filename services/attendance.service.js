import axios from "axios";

class AttendanceService{
    attend(date,imageFile,userId){
      var formData = new FormData();
      formData.append('date', date.slice(0, 9).replace('/', '-'));
      formData.append('inTime', get24Hours(date.slice(0, 9) + " ", date.slice(11, 15) + date.slice(18, 21)));
      formData.append('outTime', '');
      formData.append('type', 'Attend');
      formData.append('uId', userId);
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
}

export default AttendanceService();