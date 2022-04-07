// In App.js in a new project

import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import {useStorage} from './hooks/UseStorage';

const Stack = createNativeStackNavigator();

function App() {
  const [appFirstLaunch, setAppFirstLaunch] = useStorage(
    'appFirstLaunch',
    true,
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {appFirstLaunch ? (
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        ) : null}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
