// In App.js in a new project

import React, {useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import {useStorage} from './hooks/UseStorage';
import LoginScreen from './src/screens/LoginScreen';
import RNBootSplash from 'react-native-bootsplash';
import SignupScreen from './src/screens/SignupScren';
import {CardStyleInterpolators} from '@react-navigation/stack';
const Stack = createStackNavigator();

function App() {
  const [appFirstLaunch, setAppFirstLaunch] = useStorage(
    'appFirstLaunch',
    true,
  );

  const DefaultUser = {
    name: 'osama',
    age: '20',
    email: 'osama@gmail.com',
  };

  const SecondUser = {
    name: 'ahmad',
    age: '20',
    email: 'ahmad@gmail.com',
  };

  const [user, setUser] = useStorage('user', null);

  useEffect(() => {
    setUser(DefaultUser);
  }, []);

  const AuthStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide({fade: true})}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {/* {appFirstLaunch ? (
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        ) : null} */}

        {user ? (
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
