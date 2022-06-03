import React from 'react';
import ScanScreen from '../../src/screens/guard/ScanScreen';
import {COLORS} from '../../utils/colors';
import EditProfileScreen from '../../src/screens/shared/EditProfileScreen';
import EventScreen from '../../src/screens/student/EventScreen';
import EventDetailsScreen from '../../src/screens/student/EventDetailsScreen';
import InstructorEventDetailsScreen from '../../src/screens/instructor/EventDetailsScreen';
import HeaderMenuButton from '../../src/components/HeaderMenuButton';
import ProfileScreen from '../../src/screens/shared/ProfileScreen';
import HeaderBackButton from '../../src/components/HeaderBackButton';
import HealthScreen from '../../src/screens/student/HealthScreen';
import HomeScreen from '../../src/screens/shared/HomeScreen';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import MakePenaltyScreen from '../../src/screens/instructor/MakePenaltyScreen';
import ScanForEmailScreen from '../../src/screens/instructor/ScanForEmailScreen';
import {EventsTopTabs} from '../Tabs/InstructorTabs';
import EditEventScreen from '../../src/screens/instructor/EditEventScreen';
import MakeInvitesScreen from '../../src/screens/instructor/MakeInvitesScreen';
import UploadVaccine from '../../src/screens/student/UploadVaccine';
import EditVaccie from '../../src/screens/student/EditVaccineScreen';
import ScannedListScreen from '../../src/screens/instructor/ScannedListScreen';
import Download from '../../src/screens/instructor/Download';
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
        options={({navigation, route}) => {
          return {
            headerTitle: route.params?.eventDetails?.title + ' Details',
          };
        }}
        component={EventDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export const InstructorEventStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => {
        return {
          ...stackOptions,
          headerLeft: () => {
            if (
              route.name === 'EditEvent' ||
              route.name === 'MakeInvites' ||
              route.name === 'EventDetails' ||
              'EventScanned'
            ) {
              return <HeaderBackButton onPress={() => navigation.goBack()} />;
            } else {
              return (
                <HeaderMenuButton onPress={() => navigation.openDrawer()} />
              );
            }
          },
        };
      }}>
      <Stack.Screen name="Events" component={EventsTopTabs} />
      <Stack.Screen
        name="EditEvent"
        options={{
          headerTitle: 'Edit Event ',
        }}
        component={EditEventScreen}
      />
      <Stack.Screen
        name="MakeInvites"
        options={{
          headerTitle: 'Invite',
        }}
        component={MakeInvitesScreen}
      />
      <Stack.Screen
        name="EventDetails"
        options={{
          headerTitle: 'Event Details',
        }}
        component={InstructorEventDetailsScreen}
      />
      <Stack.Screen
        name="EventScanned"
        options={{
          headerTitle: 'Scanned Invites',
        }}
        component={ScannedListScreen}
      />

      <Stack.Screen
        name="EventDownload"
        options={{
          headerTitle: 'Download',
        }}
        component={Download}
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
          headerLeft: () => {
            if (
              route.name === 'UploadVaccine' ||
              route.name === 'EditVaccine'
            ) {
              return <HeaderBackButton onPress={() => navigation.goBack()} />;
            } else {
              return (
                <HeaderMenuButton onPress={() => navigation.openDrawer()} />
              );
            }
          },
        };
      }}>
      <Stack.Screen name="Health" component={HealthScreen} />
      <Stack.Screen
        name="UploadVaccine"
        options={{
          headerTitle: 'Upload',
        }}
        component={UploadVaccine}
      />
      <Stack.Screen
        name="EditVaccine"
        options={{
          headerTitle: 'Edit',
        }}
        component={EditVaccie}
      />
    </Stack.Navigator>
  );
};

export const PenaltyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => {
        return {
          ...stackOptions,
          headerLeft: () => {
            if (route.name === 'ScanForEmail') {
              return <HeaderBackButton onPress={() => navigation.goBack()} />;
            } else {
              return (
                <HeaderMenuButton onPress={() => navigation.openDrawer()} />
              );
            }
          },
        };
      }}>
      <Stack.Screen
        name="CreatePenalty"
        options={{
          headerTitle: 'Create Penalty',
        }}
        component={MakePenaltyScreen}
      />
      <Stack.Screen
        name="ScanForEmail"
        options={{
          headerTitle: 'Scan QR Code',
        }}
        component={ScanForEmailScreen}
      />
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
