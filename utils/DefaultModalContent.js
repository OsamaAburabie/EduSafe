import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';

const DefaultModalContent = ({data, fetchError}) => {
  return (
    <View style={styles.content}>
      {data && (
        <>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{uri: data.avatar}} />
            <Text style={[styles.contentTitle]}>
              {data?.firstName} {data?.lastName}
            </Text>
          </View>
        </>
      )}

      {fetchError && <Text style={[styles.contentTitle]}>Error</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentTitle: {
    fontSize: 20,
    color: '#333',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
