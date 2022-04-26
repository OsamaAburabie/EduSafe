import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../utils/colors';

const HeaderMenuButton = ({onPress}) => {
  return (
    <Pressable style={{marginLeft: 10}} onPress={onPress}>
      <Ionicons name="ios-menu-sharp" size={30} color={COLORS.primary} />
    </Pressable>
  );
};

export default HeaderMenuButton;
