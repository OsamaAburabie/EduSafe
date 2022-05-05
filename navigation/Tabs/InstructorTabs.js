import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../../src/screens/shared/HomeScreen';
import {
  EventStack,
  HealthStack,
  HomeStack,
  InstructorEventStack,
  PenaltyStack,
  ProfileStack,
} from '../Stacks/TabStacks';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tabScreenOptions} from '../../utils/tabScreenOptions';
import {useMainContext} from '../../context/MainContextProvider';
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
  const {unseenEventsNum} = useMainContext();

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name={`${focused ? 'home' : 'home-outline'}`}
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
