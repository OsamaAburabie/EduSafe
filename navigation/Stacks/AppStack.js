import React, {useEffect} from 'react';
import {useMainContext} from '../../context/MainContextProvider';
import GuardTabs from '../Tabs/GuardTabs';
import InstructorTabs from '../Tabs/InstructorTabs';
import StudentTabs from '../Tabs/StudentTabs';
import VerifyStack from './VerifyStack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../../src/components/DrawerContent';

function AppStack() {
  const {
    user,
    token,
    fetchEvents,
    fetchPenalties,
    fetchMaskStatus,
    fetchInstructorEvents,
  } = useMainContext();
  const verified = user?.verified;
  useEffect(() => {
    if (!token) return;
    fetchEvents();
    fetchPenalties();
    fetchMaskStatus();

    if (user?.role === 'instructor') {
      fetchInstructorEvents();
    }
  }, [token]);

  if (!verified) {
    return <VerifyStack />;
  }

  switch (user?.role) {
    case 'guard':
      return <GuardTabs />;
    case 'instructor':
      return <InstructorTabs />;
    case 'student':
      return <StudentTabs />;
    default:
      return <StudentTabs />;
  }
}

function AppStackDrawer() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="App" component={AppStack} />
    </Drawer.Navigator>
  );
}
export default AppStackDrawer;
