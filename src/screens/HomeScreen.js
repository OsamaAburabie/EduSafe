import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import {useStorage} from '../../hooks/UseStorage';
const HomeScreen = () => {
  const SecondUser = {
    name: 'ahmad',
    age: '20',
    email: 'ahmad@gmail.com',
  };
  const [user, setUser] = useStorage('user');
  const [appFirstLaunch, setAppFirstLaunch] = useStorage('appFirstLaunch');

  const changeUsername = () => {
    const oldUser = user;
    const newUser = {...oldUser, name: 'osos'};
    setUser(newUser);
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: '#333'}}>HomeScreen</Text>
      <Text style={{color: '#333'}}>{user.name}</Text>
      <Text style={{color: '#333'}}>{user.age}</Text>
      <Text style={{color: '#333'}}>{user.email}</Text>
      <Button
        title="Set user"
        onPress={() => {
          setUser();
        }}
      />
      <Button title="Set username to osama" onPress={changeUsername} />
      <Button title="Set onborading" onPress={() => setAppFirstLaunch(true)} />
    </SafeAreaView>
  );
};

export default HomeScreen;
