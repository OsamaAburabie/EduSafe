import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ManageVaccineStack, PenaltyStack} from '../Stacks/TabStacks';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tabScreenOptions} from '../../utils/tabScreenOptions';

const Tab = createBottomTabNavigator();

function AdminTabs() {
  return (
    <Tab.Navigator
      initialRouteName="ManageVaccineStack"
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
