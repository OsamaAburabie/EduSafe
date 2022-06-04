import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InvitationItem from '../../components/InvitationItem';
import RNFetchBlob from 'rn-fetch-blob';
import {useMainContext} from '../../../context/MainContextProvider';
import {baseURL} from '../../../config/axios';

const ScannedListScreen = ({route}) => {
  const {id, event} = route.params;
  console.log(event);
  const {token} = useMainContext();
  const fileUrl = `${baseURL}/api/instructor/download/${id}`;

  const filteredEvents = event?.Invitations?.filter(evt => evt.scanned);
  const EmptyListMessage = ({item}) => {
    return (
      // Flat List Item
      <View style={styles.emptyListStyle}>
        <Text style={styles.emptyText}>No Invites Found</Text>
      </View>
    );
  };

  const checkPermission = async () => {
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  const downloadFile = () => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    let file_ext = '.csv';

    // file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL, {
        Authorization: `Bearer ${token}`,
      })
      .then(res => {
        // Alert after successful downloading
        // console.log('res -> ', JSON.stringify(res));
        alert('File Downloaded Successfully.');
      });
  };

  if (!event)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.white,
        }}>
        <Text>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          borderRadius: 5,
          marginVertical: 10,
          elevation: 2,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        <FlatList
          data={filteredEvents}
          keyExtractor={item => item.id}
          renderItem={({item}) => <InvitationItem {...item} />}
          style={{width: '100%'}}
          ListEmptyComponent={EmptyListMessage}
          contentContainerStyle={{flexGrow: 1}}
        />
      </View>

      {filteredEvents?.length > 0 && (
        <Pressable
          onPress={checkPermission}
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: 5,
            marginBottom: 10,
            elevation: 2,
            flexDirection: 'row-reverse',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: 20,
          }}>
          <MaterialCommunityIcons
            name="file-download-outline"
            size={30}
            color={COLORS.white}
          />
          <Text
            style={{
              color: COLORS.white,
              fontWeight: '700',
              fontSize: 20,
              marginRight: 5,
            }}>
            Export (CSV)
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default ScannedListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  emptyListStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.primary,
  },
});
