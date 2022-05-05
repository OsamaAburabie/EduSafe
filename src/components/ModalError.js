import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import {COLORS} from '../../utils/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ModalError = ({message}) => {
  return (
    <View style={styles.content}>
      <MaterialIcons name="error-outline" size={200} color="red" />
      <Text style={[styles.contentTitle]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 300,
    width: 300,
  },
  contentTitle: {
    fontSize: 18,
    color: COLORS.black,
  },
});

export default ModalError;
