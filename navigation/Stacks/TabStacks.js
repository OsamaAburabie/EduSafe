import React from 'react';
import ScanScreen from '../../src/screens/ScanScreen';
import {COLORS} from '../../utils/colors';
import EditProfileScreen from '../../src/screens/EditProfileScreen';
import {createStackNavigator} from '@react-navigation/stack';
import EventScreen from '../../src/screens/EventScreen';
import EventDetailsScreen from '../../src/screens/EventDetailsScreen';
import {Pressable} from 'react-native';
import HeaderMenuButton from '../../src/components/HeaderMenuButton';
import ProfileScreen from '../../src/screens/ProfileScreen';
import HeaderBellButton from '../../src/components/HeaderBellButton';
import HeaderBackButton from '../../src/components/HeaderBackButton';

const Stack = createStackNavigator();
const stackOptions = {
  headerStyle: {
    backgroundColor: COLORS.white,
  },
  headerTintColor: COLORS.primary,
  animationEnabled: false,
  headerShadowVisible: false,
};

export const GuardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        animationEnabled: false,
        headerShadowVisible: false,
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
      screenOptions={({navigation, route}) => {
        return {
          ...stackOptions,
          headerLeft: () => {
            if (route.name === 'EditProfile') {
              return <HeaderBackButton onPress={() => navigation.goBack()} />;
            } else {
              return (
                <HeaderMenuButton onPress={() => navigation.openDrawer()} />
              );
            }
          },
          headerRight: () => <HeaderBellButton />,
        };
      }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};
export const EventStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => {
        return {
          ...stackOptions,
          headerLeft: () => {
            if (route.name === 'EventDetails') {
              return <HeaderBackButton onPress={() => navigation.goBack()} />;
            } else {
              return (
                <HeaderMenuButton onPress={() => navigation.openDrawer()} />
              );
            }
          },
          headerRight: () => <HeaderBellButton />,
        };
      }}>
      <Stack.Screen name="Events" component={EventScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
};
