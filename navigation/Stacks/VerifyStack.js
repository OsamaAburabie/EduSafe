import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import VerifyOtpScreen from '../../src/screens/auth/VerifyOtpScreen';

const Stack = createStackNavigator();

const VerifyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="VerifyOtpScreen"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
    </Stack.Navigator>
  );
};

export default VerifyStack;
