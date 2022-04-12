import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import HomeScreen from '../src/screens/HomeScreen';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import HomeStack from './HomeStack';
import {useMainContext} from '../context/MainContextProvider';
import AuthStack from './AuthStack';
import OnboardingScreen from '../src/screens/OnboardingScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const {user, appFirstLaunch} = useMainContext();

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide({fade: true})}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {appFirstLaunch ? (
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        ) : null}
        {user ? (
          <Stack.Screen name="HomeStack" component={HomeStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
