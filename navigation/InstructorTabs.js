import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../src/screens/HomeScreen';
import {COLORS} from '../utils/colors';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

function InstructorTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={COLORS.white}
      barStyle={{backgroundColor: COLORS.primary}}
      shifting={false}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Penalties"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Penalties',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="file-edit" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="event" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
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
export default InstructorTabs;