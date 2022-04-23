import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {COLORS} from '../../utils/colors';

const EventQrModal = ({inviteId}) => {
  return (
    <View style={styles.container}>
      <View style={styles.slider}></View>
      <View style={styles.content}>
        {/* <View style={styles.seperator}></View> */}
        <QRCode value={inviteId} color={COLORS.primary} size={150} />
        <Text style={styles.contentTitle}>Your QR Code</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
  },
  content: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 10,
  },
  seperator: {
    height: 1,
    width: '70%',
    backgroundColor: COLORS.lightWhite,
    marginBottom: 20,
  },
  slider: {
    height: 7,
    width: '20%',
    marginVertical: 6,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
  },
});

export default EventQrModal;
