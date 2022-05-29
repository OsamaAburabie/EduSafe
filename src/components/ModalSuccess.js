import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ModalSuccess = ({message}) => {
  return (
    <View style={styles.content}>
      <MaterialCommunityIcons
        name="checkbox-marked-circle-outline"
        size={200}
        color={COLORS.primary}
      />
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

export default ModalSuccess;
