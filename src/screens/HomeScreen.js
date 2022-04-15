import {Button, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useMainContext} from '../../context/MainContextProvider';
import {COLORS} from '../../utils/colors';

const HomeScreen = ({navigation}) => {
  // const [user, setUser] = useStorage('user', null);
  const {user} = useMainContext();
  const {Logout} = useMainContext();

  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <Text style={styles.text}>First Name : {user?.firstName}</Text>
      <Text style={styles.text}>Last Name: {user?.lastName}</Text>
      <Text style={styles.text}>Email: {user?.email}</Text>
      <Image source={{uri: user?.avatar}} style={{height: 100, width: 100}} />
      <Button title="Logout" onPress={Logout} />
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
