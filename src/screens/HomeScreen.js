import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useStorage} from '../../hooks/UseStorage';
import {useMainContext} from '../../context/MainContextProvider';

const HomeScreen = ({navigation}) => {
  // const [user, setUser] = useStorage('user', null);
  const {user} = useMainContext();
  const {Logout} = useMainContext();

  return (
    <View>
      <Button title="Logout" onPress={Logout} />
      <Text style={styles.text}>First Name : {user?.firstName}</Text>
      <Text style={styles.text}>Last Name: {user?.lastName}</Text>
      <Text style={styles.text}>Email: {user?.email}</Text>
      <Image source={{uri: user?.avatar}} style={{height: 100, width: 100}} />

      <Button
        title="Go to Scan Screen"
        onPress={() => navigation.navigate('ScanScreen')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#000',
  },
});
