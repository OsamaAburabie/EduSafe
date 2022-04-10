import React, {useRef, useState} from 'react';
import {
  Button,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import DefaultModalContent from '../../utils/DefaultModalContent';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/Ionicons';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const BottomHalfModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState('');
  let scannerRef = useRef(null);

  const close = () => {
    setIsVisible(false);
    scannerRef.reactivate();
  };

  const onRead = e => {
    console.log(e.data);
    setData(e.data);
    setIsVisible(true);
  };

  const activateScanner = () => {
    scannerRef.reactivate();
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
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
            <Icon name="md-scan" size={SCREEN_WIDTH * 0.5} color="white" />
          </View>
        }
      />
      <Modal
        testID={'modal'}
        isVisible={isVisible}
        onModalHide={() => {
          setData('');
        }}
        onSwipeComplete={close}
        swipeDirection={['down']}
        onBackdropPress={close}
        backdropOpacity={0}
        style={styles.view}>
        <DefaultModalContent onPress={close} data={data} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  rectangleContainer: {
    backgroundColor: 'transparent',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomHalfModal;
