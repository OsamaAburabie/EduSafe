import React, {useState, createContext, useEffect, useRef} from 'react';
import {useStorage} from '../hooks/UseStorage';
import axios from '../config/axios';
import {AppState} from 'react-native';
import {useMMKVObject, useMMKVString} from 'react-native-mmkv';
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
  const [user, setUser] = useMMKVObject('user');
  const [events, setEvents] = useMMKVObject('events');
  const [token, setToken] = useMMKVString('token');
  const [appFirstLaunch, setAppFirstLaunch] = useStorage(
    'appFirstLaunch',
    true,
  );
  const [granted, setGranted] = useStorage('cameraPermissionGranted', false);

  const Logout = () => {
    setUser(undefined);
    setToken(undefined);
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`/api/student/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data?.success) {
        setEvents(res.data);
      }
    } catch (error) {
      console.log(`${error} at fetchEvents`);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setUser({
          ...user,
          ...res.data.user,
        });
      }
    } catch (error) {
      console.log(`${error} at fetchUser`);
    }
  };

  useEffect(() => {
    if (!token) return;
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
        token,
        setToken,
      }}>
      {children}
    </MainContext.Provider>
  );
};
