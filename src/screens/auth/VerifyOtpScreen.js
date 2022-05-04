import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../utils/colors';
import {useMainContext} from '../../../context/MainContextProvider';
import OTPInputField from '../../components/OTPInputField';
import axios from '../../../config/axios';
import {ScrollView} from 'react-native-gesture-handler';

const VerifyOtpScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const MAX_CODE_LENGTH = 4;

  const {user, setUser, token, Logout} = useMainContext();
  const data = {
    otp: code,
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    try {
      const res = await axios.put('api/user/verify', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data?.success) {
        setUser({
          ...user,
          verified: true,
        });
      }
    } catch (err) {
      console.log(err.response.data);
      ToastAndroid.show(err.response.data?.message, ToastAndroid.SHORT);
    }
  };

  const handleSendCode = async () => {
    try {
      const res = await axios.post('api/user/send_otp', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data?.success) {
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log(err.response.data);
      ToastAndroid.show(err.response.data?.message, ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{height, width, backgroundColor: COLORS.white}}
      contentContainerStyle={{flex: 1}}>
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <View style={{width: '70%'}}>
          <Text style={[styles.text, {fontWeight: '500', color: COLORS.black}]}>
            We've sent you a code at
          </Text>
          <Text style={[styles.text, {fontWeight: '500'}]}>
            ({user?.email})
          </Text>
        </View>
        <OTPInputField
          setPinReady={setPinReady}
          code={code}
          setCode={setCode}
          maxLength={MAX_CODE_LENGTH}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!pinReady}
          activeOpacity={0.8}
          style={[
            styles.btn,
            {backgroundColor: pinReady ? COLORS.primary : COLORS.lightWhite},
          ]}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: COLORS.white,
            }}>
            Submit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSendCode}
          activeOpacity={0.8}
          style={{width: '70%'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: COLORS.primary,
              textAlign: 'left',
            }}>
            Send me another code?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Logout}
          activeOpacity={0.8}
          style={{width: '70%'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: 'red',
              textAlign: 'left',
              marginTop: 10,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </Pressable>
    </ScrollView>
  );
};

export default VerifyOtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: COLORS.primary,
    textAlign: 'left',
  },
  btn: {
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '70%',
    marginBottom: 20,
  },
});
