import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';

const ModalSuccess = () => {
  return (
    <View style={styles.content}>
      <Text style={[styles.contentTitle]}>success</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ModalSuccess;
