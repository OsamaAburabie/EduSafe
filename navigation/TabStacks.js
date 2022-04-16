import React from 'react';
import ScanScreen from '../src/screens/ScanScreen';
import {COLORS} from '../utils/colors';
import HomeScreen from '../src/screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfile from '../src/screens/EditProfile';

const Stack = createNativeStackNavigator();

export const GuardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        animation: 'none',
      }}>
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
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        animation: 'none',
      }}>
      <Stack.Screen name="Profile" component={HomeScreen} />
      <Stack.Screen name="Edit Profile" component={EditProfile} />
    </Stack.Navigator>
  );
};
