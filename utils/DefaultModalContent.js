import React from 'react';
import {Button, StyleSheet, Text, View, ActivityIndicator} from 'react-native';

const DefaultModalContent = ({data, fetchError}) => {
  return (
    <View style={styles.content}>
      {data ? (
        <>
          <View style={styles.slider}></View>
          <Text style={[styles.contentTitle]}> id: {data?.id}</Text>
          <Text style={[styles.contentTitle]}>
            completed: {data?.completed}
          </Text>
          <Text style={[styles.contentTitle]}> title: {data?.title}</Text>
        </>
      ) : (
        <>
          {fetchError ? (
            <View>
              <Text style={[styles.contentTitle]}>Error</Text>
            </View>
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
