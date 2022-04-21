import React, {useState, createContext, useEffect} from 'react';
import {useStorage} from '../hooks/UseStorage';
import axios from '../config/axios';

export const MainContext = createContext({});

//custom hook to use the context
export const useMainContext = () => {
  const context = React.useContext(MainContext);
  if (context === undefined) {
    throw new Error('useMainContext must be used within a MainContextProvider');
  }
  return context;
};

export const MainContextProvider = ({children}) => {
  const [user, setUser] = useStorage('user', null);
  const [events, setEvents] = useStorage('events', null);
  const [appFirstLaunch, setAppFirstLaunch] = useStorage(
    'appFirstLaunch',
    true,
  );
  const [granted, setGranted] = useStorage('cameraPermissionGranted', false);

  const Logout = () => {
    setUser(null);
    setEvents(null);
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`/api/student/events`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setEvents(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <MainContext.Provider
      value={{
        appFirstLaunch,
        setAppFirstLaunch,
        user,
        setUser,
        Logout,
        granted,
        setGranted,
        events,
        setEvents,
      }}>
      {children}
    </MainContext.Provider>
  );
};
