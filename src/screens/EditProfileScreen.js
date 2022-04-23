import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const EditProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>EditProfile</Text>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});