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
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import DefaultModalContent from '../../../utils/DefaultModalContent';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {COLORS} from '../../../utils/colors';
// import axios from 'axios';
import axios from '../../../config/axios';
import {useMainContext} from '../../../context/MainContextProvider';
import {FocusAwareStatusBar} from '../../../utils/FocusAwareStatusBar';
import ModalSuccess from '../../components/ModalSuccess';
import ModalError from '../../components/ModalError';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ScanInviteScreen = () => {
  const {token, granted, setGranted} = useMainContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let scannerRef = useRef(null);
  const close = () => {
    setIsVisible(false);
    scannerRef.reactivate();
  };
  const fetch = async id => {
    try {
      const res = await axios.post(`/api/guard/scan_invite/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setIsLoading(false);
        setIsVisible(true);
      }
    } catch (error) {
      console.log(error?.response?.data?.message + '  At scan invite');
      if (error?.response?.data?.message) {
        setError(error?.response?.data?.message);
      } else {
        setError('Something went wrong');
      }
      setIsLoading(false);
      setIsVisible(true);
    }
  };

  const onRead = e => {
    // setIsVisible(true);
    setIsLoading(true);
    fetch(e.data);
  };

  const onHide = () => {
    setError(null);
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
        <Modal
          testID={'modal'}
          onModalHide={onHide}
          isVisible={isVisible}
          // animationIn="fadeIn"
          // animationOut="fadeOut"
          onBackdropPress={close}
          backdropOpacity={0.7}
          backdropTransitionInTiming={0}
          backdropTransitionOutTiming={0}
          style={styles.view}>
          {error ? (
            <ModalError message={error} />
          ) : (
            <ModalSuccess message="Scanned Successfully" />
          )}
        </Modal>
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

export default ScanInviteScreen;

const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency
const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 1.7,
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
