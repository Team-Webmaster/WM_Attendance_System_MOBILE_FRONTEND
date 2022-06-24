import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { currentStatus } from '../functions/currentStatus';
import useFetch from '../hooks/useFetch';
import { UserContext } from '../store/Context';

const Attend = ({ navigation }) => {
  const { userData } = React.useContext(UserContext);
  const [userStatus, setUserStatus] = React.useState(null);
  const { data, reFetch } = useFetch(`https://localhost:5001/api/Attendance/today/${userData.userId}`);
  console.log(data);
  useEffect(() => {
    if (data) {
      setUserStatus(currentStatus(data));
    }
  }, [data]);

  return (
    <View>
      {userStatus && userStatus.type === 0 ?
        <Button title='Attend'
          onPress={() => navigation.navigate('Camera', { userStatus: userStatus, reFetch:reFetch })}
        /> :
        userStatus && userStatus.type === 1 ?
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', reFetch:reFetch }} >
            <View>
              <Button title='Back To Work' color='orange'
                onPress={() => navigation.navigate('Camera', { userStatus: userStatus, type: "B2W", reFetch:reFetch })}
              /></View>
            <View style={{marginLeft:2}} >
              <Button title='Work Off' color='red'
                onPress={() => navigation.navigate('Camera', { userStatus: userStatus, type: "WO", reFetch:reFetch })}
              />
            </View>
          </View> : !!userStatus ?
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }} >
              <View>
                <Button title='Break' color='orange'
                  onPress={() => navigation.navigate('Camera', { userStatus: userStatus, type: "Br", reFetch:reFetch })}
                />
              </View>
              <View style={{marginLeft:2}} >
                <Button title='Work Off' color='red'
                  onPress={() => navigation.navigate('Camera', { userStatus: userStatus, type: "WO", reFetch:reFetch })}
                />
              </View>
            </View> : null}
    </View>
  )
};

export default Attend;