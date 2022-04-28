import React, {useState, createContext, useEffect, useRef} from 'react';
import {useStorage} from '../hooks/UseStorage';
import axios from '../config/axios';
import {AppState} from 'react-native';

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
      if (res.data?.success) {
        setEvents(res.data?.events);
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/api/user/me`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.data.success) {
        setUser({
          ...user,
          ...res.data.user,
        });
      }
    } catch (err) {
      console.log(err?.response);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchUser();
  }, []);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', state => {
  //     if (state === 'background' || state === 'inactive') {
  //       fetchEvents();
  //     }
  //   });
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);
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
        fetchEvents,
      }}>
      {children}
    </MainContext.Provider>
  );
};
