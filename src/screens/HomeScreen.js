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
import {COLORS} from '../../utils/colors';

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
            <View style={styles.topOverlay}></View>

            <View style={{flexDirection: 'row'}}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle}>
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

const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'white';

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = '#22ff00';

const iconScanColor = 'blue';

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
    height: 60,
    width: 60,
    borderColor: COLORS.primary,
    borderEndWidth: 5,
    borderTopWidth: 5,
    borderTopRightRadius: 10,
    position: 'absolute',
    top: 0,
    right: 0,
  },

  cornerBottomRight: {
    height: 60,
    width: 60,
    borderColor: COLORS.primary,
    borderEndWidth: 5,
    borderTopWidth: 5,
    borderTopRightRadius: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [{rotate: '90deg'}],
  },
  cornerLeft: {
    height: 60,
    width: 60,
    borderColor: COLORS.primary,
    borderEndWidth: 5,
    borderTopWidth: 5,
    borderTopRightRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{rotate: '270deg'}],
  },
  cornerBottomLeft: {
    height: 60,
    width: 60,
    borderColor: COLORS.primary,
    borderEndWidth: 5,
    borderTopWidth: 5,
    borderTopRightRadius: 10,
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
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },
});

export default BottomHalfModal;
