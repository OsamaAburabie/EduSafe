import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS} from '../../utils/colors';
import {useMainContext} from '../../context/MainContextProvider';

const HomeScreen = () => {
  const {user, fetchEvents} = useMainContext();
  useEffect(() => {
    if (!user) return;
    fetchEvents();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Text style={{color: '#333'}}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
