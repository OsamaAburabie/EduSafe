import React from 'react';
import ScanScreen from '../../src/screens/guard/ScanScreen';
import {COLORS} from '../../utils/colors';
import EditProfileScreen from '../../src/screens/shared/EditProfileScreen';
import EventScreen from '../../src/screens/student/EventScreen';
import EventDetailsScreen from '../../src/screens/student/EventDetailsScreen';
import HeaderMenuButton from '../../src/components/HeaderMenuButton';
import ProfileScreen from '../../src/screens/shared/ProfileScreen';
import HeaderBackButton from '../../src/components/HeaderBackButton';
import HealthScreen from '../../src/screens/student/HealthScreen';
import HomeScreen from '../../src/screens/shared/HomeScreen';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
const Stack = createStackNavigator();
const stackOptions = {
  headerStyle: {
    backgroundColor: COLORS.white,
  },
  headerTintColor: COLORS.primary,
  headerShadowVisible: false,
  headerTitleStyle: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const GuardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => {
        return {
          ...stackOptions,
          headerLeft: () => (
            <HeaderMenuButton onPress={() => navigation.openDrawer()} />
          ),
        };
      }}>
      <Stack.Screen
        name="Scan"
        options={{
          headerTitle: 'Scan QR Code',
        }}
        component={ScanScreen}
      />
    </Stack.Navigator>
  );
};
export const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => {
        return {
          ...stackOptions,
          headerLeft: () => {
            if (route.name === 'EditProfile') {
              return <HeaderBackButton onPress={() => navigation.goBack()} />;
            } else {
              return (
                <HeaderMenuButton onPress={() => navigation.openDrawer()} />
              );
            }
          },
        };
      }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="EditProfile"
        options={{
          headerTitle: 'Edit Profile',
        }}
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  );
};
export const EventStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => {
        return {
          ...stackOptions,
          headerLeft: () => {
            if (route.name === 'EventDetails') {
              return <HeaderBackButton onPress={() => navigation.goBack()} />;
            } else {
              return (
                <HeaderMenuButton onPress={() => navigation.openDrawer()} />
              );
            }
          },
        };
      }}>
      <Stack.Screen name="Events" component={EventScreen} />
      <Stack.Screen
        name="EventDetails"
        options={{
          headerTitle: 'Event Details',
        }}
        component={EventDetailsScreen}
      />
    </Stack.Navigator>
  );
};
export const HealthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => {
        return {
          ...stackOptions,
          headerLeft: () => (
            <HeaderMenuButton onPress={() => navigation.openDrawer()} />
          ),
        };
      }}>
      <Stack.Screen name="Health" component={HealthScreen} />
    </Stack.Navigator>
  );
};

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => {
        return {
          ...stackOptions,
          headerLeft: () => (
            // <Image
            //   source={require('../../assets/bootsplash_logo.png')}
            //   style={{
            //     width: 35,
            //     height: 35,
            //     marginLeft: 10,
            //     marginRight: -23,
            //     marginBottom: 8,
            //   }}
            // />]

            <HeaderMenuButton onPress={() => navigation.openDrawer()} />
          ),
        };
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
