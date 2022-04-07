import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useStorage} from './hooks/UseStorage';

const App = () => {
  const [token, setToken] = useStorage('token', 'default');
  return (
    <View>
      <Text>{token}</Text>
      <Button title="setname" onPress={() => setToken('osama')} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
