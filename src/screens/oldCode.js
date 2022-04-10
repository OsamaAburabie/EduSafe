import React, {useRef, useState} from 'react';
import {Button, Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import Modal from 'react-native-modal';
import {COLORS} from '../../utils/colors';
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
    <View style={{flex: 1, position: 'relative'}}>
      <Text style={{color: 'white', fontSize: 40, position: 'absolute'}}>
        wow
      </Text>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      {/* <Button title="Show Modal" onPress={() => setIsVisible(true)} /> */}
      <QRCodeScanner
       showMarker
       markerStyle={{
         borderWidth: 0,
       }}
        ref={node => {
          scannerRef = node;
        }}
        onRead={onRead}
        cameraStyle={{height: SCREEN_HEIGHT}}
        customMarker={
            <View style={styles.rectangleContainer}>
              <Icon
                name="scan-outline"
                size={SCREEN_WIDTH * 0.73}
                color={iconScanColor}
              />
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
        // swipeThreshold={50}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default BottomHalfModal;
