import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ManageEventsScreen = ({navigation}) => {
  return (
    <View>
      <Button
        title="go to"
        onPress={() =>
          navigation.navigate('EventsStack', {screen: 'EditEvent'})
        }
      />
    </View>
  );
};

export default ManageEventsScreen;

const styles = StyleSheet.create({});
