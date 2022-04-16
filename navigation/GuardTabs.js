import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../src/screens/HomeScreen';
import ScanScreen from '../src/screens/ScanScreen';
import {COLORS} from '../utils/colors';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {GuardStack, ProfileStack} from './TabStacks';

const Tab = createMaterialBottomTabNavigator();

function GuardTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={COLORS.white}
      barStyle={{backgroundColor: COLORS.primary}}>
      <Tab.Screen
        name="GuardStack"
        component={GuardStack}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default GuardTabs;
