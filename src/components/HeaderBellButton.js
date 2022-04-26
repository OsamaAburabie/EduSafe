import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../utils/colors';

const HeaderBellButton = ({onPress}) => {
  return (
    <Pressable style={{marginRight: 10}} onPress={onPress}>
      <Ionicons name="notifications" size={30} color={COLORS.primary} />
    </Pressable>
  );
};

export default HeaderBellButton;
