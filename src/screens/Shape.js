import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Shape = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          height: 100,
          width: 100,
          borderColor: 'blue',
          borderEndWidth: 5,
          borderTopWidth: 5,
          borderTopRightRadius: 20,
          transform: [{rotate: '270deg'}],
        }}></View>
    </View>
  );
};

export default Shape;

const styles = StyleSheet.create({});
