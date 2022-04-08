import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import {useStorage} from '../../hooks/UseStorage';
const LoginScreen = () => {
  const SecondUser = {
    name: 'ahmad',
    age: '20',
    email: 'ahmad@gmail.com',
  };
  const [user, setUser] = useStorage('user');

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: '#333'}}>LoginScreen</Text>
      <Button
        title="Set user"
        onPress={() => {
          setUser(SecondUser);
        }}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
