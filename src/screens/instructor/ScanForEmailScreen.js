import React, {useEffect, useRef, useState} from 'react';
import {
  check,
  PERMISSIONS,
  request,
  openSettings,
} from 'react-native-permissions';

import {
  ActivityIndicator,
  AppState,
  Button,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {COLORS} from '../../../utils/colors';
import axios from '../../../config/axios';
import {useMainContext} from '../../../context/MainContextProvider';
import {FocusAwareStatusBar} from '../../../utils/FocusAwareStatusBar';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ScanForEmailScreen = ({navigation}) => {
  const {granted, setGranted} = useMainContext();
  const [isLoading, setIsLoading] = useState(false);
  let scannerRef = useRef(null);
  const close = () => {
    scannerRef.reactivate();
  };
  const fetch = async id => {
    try {
      const res = await axios.get(`/api/guard/student_info/${id}`);
      if (res.data.success) {
        setIsLoading(false);
        navigation.navigate('CreatePenalty', {
          email: res.data?.student?.email,
        });
      }
    } catch (error) {
      setIsLoading(false);
      ToastAndroid.show(
        error?.response?.data?.message || 'Something went wrong',
        ToastAndroid.SHORT,
      );
      navigation.navigate('CreatePenalty');
    }
  };

  const onRead = e => {
    // setIsVisible(true);
    setIsLoading(true);
    fetch(e.data);
  };

  //check permission if camera is granted
  const checkPermission = async () => {
    const permission = await check(PERMISSIONS.ANDROID.CAMERA);
    if (permission === 'granted') {
      setGranted(true);
    } else {
      setGranted(false);
    }
  };

  const requestPermission = async () => {
    const permission = await request(PERMISSIONS.ANDROID.CAMERA);
    if (permission === 'granted') {
      setGranted(true);
    } else {
      setGranted(false);
    }
  };

  useEffect(() => {
    checkPermission();
    requestPermission();
  }, []);

  // check permission when app is in foreground
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      if (appState.current === 'active') {
        checkPermission();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (granted) {
    return (
      <View style={{flex: 1}}>
        <FocusAwareStatusBar
          backgroundColor={COLORS.white}
          barStyle="dark-content"
        />
        <QRCodeScanner
          showMarker
          markerStyle={{
            borderWidth: 0,
            padding: 0,
          }}
          ref={node => {
            scannerRef = node;
          }}
          reactivate={true}
          reactivateTimeout={2000}
          onRead={onRead}
          cameraStyle={{height: SCREEN_HEIGHT}}
          customMarker={
            <View style={styles.rectangleContainer}>
              <View style={styles.topOverlay}></View>

              <View style={{flexDirection: 'row'}}>
                <View style={styles.leftAndRightOverlay} />

                <View style={styles.rectangle}>
                  {isLoading && (
                    <ActivityIndicator
                      style={{top: '43%'}}
                      size="large"
                      color={COLORS.primary}
                    />
                  )}
                  <View style={styles.cornerRight} />
                  <View style={styles.cornerBottomRight} />
                  <View style={styles.cornerLeft} />
                  <View style={styles.cornerBottomLeft} />
                </View>

                <View style={styles.leftAndRightOverlay} />
              </View>

              <View style={styles.bottomOverlay} />
            </View>
          }
        />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FocusAwareStatusBar
          backgroundColor={COLORS.white}
          barStyle="dark-content"
        />
        <Button title="Go to settings" onPress={openSettings} />
      </View>
    );
  }
};

export default ScanForEmailScreen;

const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency
const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    backgroundColor: 'transparent',
    position: 'relative',
    borderRadius: 10,
  },
  cornerRight: {
    height: 40,
    width: 40,
    borderColor: COLORS.primary,
    borderEndWidth: 5,
    borderTopWidth: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  },

  cornerBottomRight: {
    height: 40,
    width: 40,
    borderColor: COLORS.primary,
    borderEndWidth: 5,
    borderTopWidth: 5,
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [{rotate: '90deg'}],
  },
  cornerLeft: {
    height: 40,
    width: 40,
    borderColor: COLORS.primary,
    borderEndWidth: 5,
    borderTopWidth: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{rotate: '270deg'}],
  },
  cornerBottomLeft: {
    height: 40,
    width: 40,
    borderColor: COLORS.primary,
    borderEndWidth: 5,
    borderTopWidth: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    transform: [{rotate: '180deg'}],
  },
  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1.5,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },
});
