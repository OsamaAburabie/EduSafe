import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  HealthStack,
  InstructorEventStack,
  PenaltyStack,
  ProfileStack,
} from '../Stacks/TabStacks';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tabScreenOptions} from '../../utils/tabScreenOptions';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ManageEventsScreen from '../../src/screens/instructor/ManageEventsScreen';
import CreateEventScreen from '../../src/screens/instructor/CreateEventScreen';
import ScanInviteScreen from '../../src/screens/instructor/ScanInviteScreen';
import {COLORS} from '../../utils/colors';

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

export function EventsTopTabs() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.primary,
        },
      }}>
      <TopTab.Screen name="Manage" component={ManageEventsScreen} />
      <TopTab.Screen name="Create" component={CreateEventScreen} />
      <TopTab.Screen
        name="Scan"
        options={{
          tabBarLabel: 'Scan',
        }}
        component={ScanInviteScreen}
      />
    </TopTab.Navigator>
  );
}

function InstructorTabs() {
  return (
    <Tab.Navigator
      initialRouteName="ProfileStack"
      screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="HealthStack"
        component={HealthStack}
        options={{
          tabBarLabel: 'Health',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name={`${focused ? 'heart' : 'heart-outline'}`}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PenaltyStack"
        component={PenaltyStack}
        options={{
          tabBarLabel: 'Penalty',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name={`${focused ? 'file-edit' : 'file-edit-outline'}`}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="EventsStack"
        component={InstructorEventStack}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name={`${focused ? 'bullhorn' : 'bullhorn-outline'}`}
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
export default InstructorTabs;
