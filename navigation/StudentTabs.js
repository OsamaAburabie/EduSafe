import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../src/screens/HomeScreen';
import {COLORS} from '../utils/colors';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

function StudentTabs() {
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
        name="Health"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Health',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bullhorn" color={color} size={26} />
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
export default StudentTabs;
