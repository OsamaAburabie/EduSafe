import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/colors';
import {useMainContext} from '../../context/MainContextProvider';

const RequestOtpScreen = ({navigation}) => {
  const {user} = useMainContext();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      {/* <View style={styles.info}>
        <Text style={styles.text}>You need to verify your email:</Text>
        <Text style={styles.text}>{user.email}</Text>
      </View> */}
      <TouchableOpacity
        onPress={() => navigation.navigate('VerifyOtpScreen')}
        activeOpacity={0.8}
        style={styles.btn}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            color: COLORS.primary,
          }}>
          Request a verification code
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RequestOtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'left',
  },
  btn: {
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
