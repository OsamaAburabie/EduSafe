import React, {useRef, useState} from 'react';
import {Button, StatusBar, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import Modal from 'react-native-modal';
import {COLORS} from '../../utils/colors';
import DefaultModalContent from '../../utils/DefaultModalContent';
import QRCodeScanner from 'react-native-qrcode-scanner';

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
        showMarker={true}
        markerStyle={{
          borderColor: 'white',
          borderWidth: 0,
        }}
        ref={node => {
          scannerRef = node;
        }}
        onRead={onRead}
        cameraStyle={{height: '100%'}}
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
});

export default BottomHalfModal;
