import React, {createContext, useEffect} from 'react';
import {useStorage} from '../hooks/UseStorage';
import axios from '../config/axios';
import {useMMKVObject, useMMKVString, MMKV} from 'react-native-mmkv';
export const MainContext = createContext({});

export const storage = new MMKV();

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
  const [token, setToken] = useMMKVString('token');
  const [events, setEvents] = useMMKVObject('events');
  const [instructorEvents, setInstructorEvents] =
    useMMKVObject('instructorEvents');
  const [penalties, setPenalties] = useMMKVObject('penalties');
  const [appFirstLaunch, setAppFirstLaunch] = useStorage(
    'appFirstLaunch',
    true,
  );
  const [granted, setGranted] = useStorage('cameraPermissionGranted', false);
  const [maskStatus, setMaskStatus] = React.useState('optional');

  const Logout = () => {
    setUser(undefined);
    setToken(undefined);
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`/api/student/events`);
      if (res.data?.success) {
        setEvents(res.data.data);
      }
    } catch (error) {
      console.log(`${error} at fetchEvents`);
    }
  };

  const fetchInstructorEvents = async () => {
    try {
      const res = await axios.get(`/api/instructor/events`);
      if (res.data?.success) {
        setInstructorEvents(res.data.events);
      }
    } catch (error) {
      console.log(`${error} at fetchInstructorEvents`);
    }
  };

  const fetchPenalties = async () => {
    try {
      const res = await axios.get(`/api/student/penalties`);
      if (res.data?.success) {
        setPenalties(res.data.data);
      }
    } catch (error) {
      console.log(`${error} at fetchPenalties`);
    }
  };

  const fetchMaskStatus = async () => {
    try {
      const response = await axios.get('/api/mask');
      if (response.data) {
        setMaskStatus(response.data?.status);
      }
    } catch (error) {
      console.log(`${error} at fetchMaskStatus`);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/api/user/me`);
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
        fetchUser,
        Logout,
        granted,
        setGranted,
        events,
        setEvents,
        fetchEvents,
        penalties,
        fetchPenalties,
        token,
        setToken,
        maskStatus,
        setMaskStatus,
        fetchMaskStatus,
        instructorEvents,
        setInstructorEvents,
        fetchInstructorEvents,
      }}>
      {children}
    </MainContext.Provider>
  );
};
