import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {EventStack, HealthStack, ProfileStack} from '../Stacks/TabStacks';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tabScreenOptions} from '../../utils/tabScreenOptions';
import {useMainContext} from '../../context/MainContextProvider';

const Tab = createBottomTabNavigator();

function StudentTabs() {
  const {events} = useMainContext();

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
          tabBarBadge: events?.unseenNumber,
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
export default StudentTabs;
