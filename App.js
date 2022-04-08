// In App.js in a new project

import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import {useStorage} from './hooks/UseStorage';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createNativeStackNavigator();

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

  const [user] = useStorage('user', null);

  console.log(user);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {appFirstLaunch ? (
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        ) : null}

        {user ? (
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        ) : (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
