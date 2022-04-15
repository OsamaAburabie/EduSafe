import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../src/screens/HomeScreen';
import ScanScreen from '../src/screens/ScanScreen';
import {COLORS} from '../utils/colors';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function AppStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarLabelStyle: {
          color: COLORS.white,
        },
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        tabBarStyle: {
          elevation: 0,
          backgroundColor: COLORS.primary,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'home' : 'home-outline'}
                color={focused ? COLORS.white : COLORS.white}
                size={size}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ScanScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              color={focused ? COLORS.white : COLORS.white}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default AppStack;
