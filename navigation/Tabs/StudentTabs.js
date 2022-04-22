import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../../src/screens/HomeScreen';
import {EventStack, ProfileStack} from '../Stacks/TabStacks';
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
        name="EventsStack"
        component={EventStack}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bullhorn" color={color} size={26} />
          ),
          tabBarBadge: unSeen,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
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
