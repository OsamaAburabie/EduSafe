import React from 'react';
import {Button, StatusBar, StyleSheet} from 'react-native';
// @ts-ignore
import Modal from 'react-native-modal';
import {COLORS} from '../../utils/colors';
import DefaultModalContent from '../../utils/DefaultModalContent';

const BottomHalfModal = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const close = () => {
    setIsVisible(false);
  };
  return (
    <>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Button title="Show Modal" onPress={() => setIsVisible(true)} />
      <Modal
        testID={'modal'}
        isVisible={isVisible}
        onModalHide={() => {
          console.log('wow');
        }}
        onSwipeComplete={close}
        swipeDirection={['down']}
        // swipeThreshold={50}
        onBackdropPress={close}
        backdropOpacity={0}
        style={styles.view}>
        <DefaultModalContent onPress={close} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default BottomHalfModal;
