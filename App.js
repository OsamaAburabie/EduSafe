import {StatusBar} from 'react-native';
import React from 'react';
import {MainContextProvider} from './context';
import RootNavigator from './navigation/RootNavigator';
import {COLORS} from './utils/colors';

const App = () => {
  return (
    <MainContextProvider>
      {/* <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" /> */}
      <RootNavigator />
    </MainContextProvider>
  );
};

export default App;
