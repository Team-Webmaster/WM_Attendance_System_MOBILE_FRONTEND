import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { currentStatus } from '../functions/currentStatus';
import { UserContext } from '../store/Context';

const Attend = ({ navigation }) => {
  const { userData } = React.useContext(UserContext);
  const [userStatus, setUserStatus] = React.useState(0);

  useEffect(() => {
    setUserStatus(currentStatus(userData.userId));
  }, []);

  return (
    <View>
      {userStatus.type === 0 ?
        <Button title='Attend'
          onPress={() => navigation.navigate('Camera', { userStatus: userStatus })}
        /> :
        userStatus.type === 1 ?
          <>
            <Button title='Back To Work'
              onPress={() => navigation.navigate('Camera', { userStatus: userStatus, type:"B2W" })}
            />
            <Button title='Work Off'
              onPress={() => navigation.navigate('Camera', { userStatus: userStatus, type:"WO" })}
            />
          </> :
          <>
            <Button title='Break'
              onPress={() => navigation.navigate('Camera', { userStatus: userStatus, type:"Br" })}
            />
            <Button title='Work Off'
              onPress={() => navigation.navigate('Camera', { userStatus: userStatus, type:"WO" })}
            />
          </>}
    </View>
  )
};

export default Attend;