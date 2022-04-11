import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useStorage} from '../../hooks/UseStorage';

const HomeScreen = ({navigation}) => {
  const [user, setUser] = useStorage('user', null);
  console.log(user);
  const Logout = () => {
    setUser();
  };

  return (
    <View>
      <Text>First Name : {user?.firstName}</Text>
      <Text>Last Name: {user?.lastName}</Text>
      <Text>Email: {user?.email}</Text>
      <Image source={{uri: user?.avatar}} style={{height: 100, width: 100}} />

      <Button title="Logout" onPress={Logout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
