import React from 'react';
import {useMainContext} from '../../context/MainContextProvider';
import GuardTabs from '../Tabs/GuardTabs';
import InstructorTabs from '../Tabs/InstructorTabs';
import StudentTabs from '../Tabs/StudentTabs';
import VerifyStack from './VerifyStack';

function AppStack() {
  const {user} = useMainContext();
  const verified = user?.verified;

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
export default AppStack;
