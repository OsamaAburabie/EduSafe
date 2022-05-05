import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText,
  error,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
        flexWrap: 'wrap',
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          placeholderTextColor="#666666"
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0, color: '#05375a'}}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          placeholderTextColor="#666666"
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0, color: '#05375a'}}
          value={value}
          onChangeText={onChangeText}
        />
      )}
      {error && (
        <View style={{width: '100%'}}>
          <Text style={{color: '#FF0000', fontSize: 14}}>{error} </Text>
        </View>
      )}
    </View>
  );
}
