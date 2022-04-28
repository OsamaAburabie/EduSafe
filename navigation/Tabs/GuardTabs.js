import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GuardStack, ProfileStack} from '../Stacks/TabStacks';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tabScreenOptions} from '../../utils/tabScreenOptions';

const Tab = createBottomTabNavigator();

function GuardTabs() {
  return (
    <Tab.Navigator
      initialRouteName="GuardStack"
      screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="GuardStack"
        component={GuardStack}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="qrcode" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name={`${focused ? 'account' : 'account-outline'}`}
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default GuardTabs;
