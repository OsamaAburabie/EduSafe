import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import {COLORS} from '../../utils/colors';

const OTPInputField = ({setPinReady, code, setCode, maxLength}) => {
  const codeDigitsArray = new Array(maxLength).fill(0);
  const textInputRef = createRef();

  const toCodeDigitsInput = (_value, index) => {
    const emptyInputChar = ' ';
    const digit = code[index] || emptyInputChar;

    return (
      <View style={styles.otpInput} key={index}>
        <Text style={styles.otpInputText}>{digit}</Text>
      </View>
    );
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Keyboard.dismiss();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
    setPinReady(code.length === maxLength);
    return () => setPinReady(false);
  }, [code]);

  const handleOnPress = () => {
    textInputRef.current.focus();
  };
  return (
    <View style={styles.otpInputSection}>
      <Pressable style={styles.otpInputContainer} onPress={handleOnPress}>
        {codeDigitsArray.map(toCodeDigitsInput)}
      </Pressable>
      <TextInput
        style={styles.hiddenTextInput}
        value={code}
        onChangeText={setCode}
        maxLength={maxLength}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        ref={textInputRef}
      />
    </View>
  );
};

export default OTPInputField;

const styles = StyleSheet.create({
  hiddenTextInput: {
    position: 'absolute',
    height: 1,
    width: 1,
    opacity: 0,
  },
  otpInputSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  otpInputContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  otpInput: {
    minWidth: '15%',
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 5,
    padding: 12,
  },
  otpInputText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.primary,
  },
});
