import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../../src/screens/HomeScreen';
import {
  EventStack,
  HealthStack,
  HomeStack,
  ProfileStack,
} from '../Stacks/TabStacks';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tabScreenOptions} from '../../utils/tabScreenOptions';
import {useMainContext} from '../../context/MainContextProvider';

const Tab = createBottomTabNavigator();

function StudentTabs() {
  const {events} = useMainContext();
  const [unSeen, setUnSeen] = React.useState(null);
  useEffect(() => {
    if (!events) return;
    const unseen = events.filter(event => event.seen === false);
    if (unseen.length > 0) {
      setUnSeen(unseen.length);
    } else {
      setUnSeen(null);
    }
  }, [events]);
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
          tabBarBadge: unSeen,
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
