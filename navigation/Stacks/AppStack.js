import React from 'react';
import {useMainContext} from '../../context/MainContextProvider';
import GuardTabs from '../Tabs/GuardTabs';
import InstructorTabs from '../Tabs/InstructorTabs';
import StudentTabs from '../Tabs/StudentTabs';

function AppStack() {
  const {user} = useMainContext();

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
