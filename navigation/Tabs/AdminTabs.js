import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../../src/screens/shared/HomeScreen';
import {
  EventStack,
  HealthStack,
  HomeStack,
  InstructorEventStack,
  ManageVaccineStack,
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

function AdminTabs() {
  return (
    <Tab.Navigator
      initialRouteName="ProfileStack"
      screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="ManageVaccineStack"
        component={ManageVaccineStack}
        options={{
          tabBarLabel: 'Manage Vaccines',
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
        name="MaskStack"
        component={PenaltyStack}
        options={{
          tabBarLabel: 'Mask Status',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name={`${focused ? 'face-mask' : 'face-mask-outline'}`}
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default AdminTabs;
