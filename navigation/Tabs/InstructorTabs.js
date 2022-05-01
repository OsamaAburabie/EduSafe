import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../../src/screens/shared/HomeScreen';
import {
  EventStack,
  HealthStack,
  HomeStack,
  PenaltyStack,
  ProfileStack,
} from '../Stacks/TabStacks';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tabScreenOptions} from '../../utils/tabScreenOptions';
import {useMainContext} from '../../context/MainContextProvider';

const Tab = createBottomTabNavigator();

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
        component={EventStack}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name={`${focused ? 'bullhorn' : 'bullhorn-outline'}`}
              color={color}
              size={26}
            />
          ),
          tabBarBadge: unseenEventsNum,
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
