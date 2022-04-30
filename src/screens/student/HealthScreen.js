import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/colors';

const HealthScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Text style={{color: '#333'}}>HealthScreen</Text>
    </View>
  );
};

export default HealthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
