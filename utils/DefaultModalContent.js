import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const DefaultModalContent = props => (
  <View style={styles.content}>
    <View style={styles.slider}></View>
    <Text style={[styles.contentTitle]}>{props.data}</Text>
    <Text style={styles.contentTitle}>Hi 👋!</Text>
    <Text style={styles.contentTitle}>Hi 👋!</Text>
    <Text style={styles.contentTitle}>Hi 👋!</Text>
    <Text style={styles.contentTitle}>Hi 👋!</Text>
    <Text style={styles.contentTitle}>Hi 👋!</Text>
    <Text style={styles.contentTitle}>Hi 👋!</Text>
    <Text style={styles.contentTitle}>Hi 👋!</Text>
    <Text style={styles.contentTitle}>Hi 👋!</Text>
    <Text style={styles.contentTitle}>Hi 👋!</Text>
    <Text style={styles.contentTitle}>Hi 👋!</Text>
  </View>
);

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 4,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
    color: '#333',
  },
  slider: {
    height: 7,
    width: '20%',
    marginVertical: 6,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
});

export default DefaultModalContent;
