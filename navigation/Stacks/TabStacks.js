import React from 'react';
import ScanScreen from '../../src/screens/ScanScreen';
import {COLORS} from '../../utils/colors';
import HomeScreen from '../../src/screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfileScreen from '../../src/screens/EditProfileScreen';
import {createStackNavigator} from '@react-navigation/stack';
import EventScreen from '../../src/screens/EventScreen';
import EventDetailsScreen from '../../src/screens/EventDetailsScreen';

const Stack = createStackNavigator();

const stackOptions = {
  headerStyle: {
    backgroundColor: COLORS.primary,
  },
  headerTintColor: COLORS.white,
  animationEnabled: false,
};

export const GuardStack = () => {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen
        name="Scan"
        options={{
          headerTitle: 'Scan QR Code',
        }}
        component={ScanScreen}
      />
    </Stack.Navigator>
  );
};
export const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="Profile" component={HomeScreen} />
      <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};
export const EventStack = () => {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="Events" component={EventScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
};
