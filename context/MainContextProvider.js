import React, {useState, createContext} from 'react';
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
  const [appFirstLaunch, setAppFirstLaunch] = useStorage(
    'appFirstLaunch',
    true,
  );
  const [granted, setGranted] = useStorage('cameraPermissionGranted', false);

  const Register = values => {
    axios
      .post('/api/auth/register', values)
      .then(res => {
        if (res?.data?.success) {
          setUser(res?.data?.user);
        }
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  const Login = values => {
    axios
      .post('/api/auth/login', values)
      .then(res => {
        if (res?.data?.success) {
          setUser(res?.data?.user);
        }
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  const Logout = () => {
    setUser(null);
  };
  return (
    <MainContext.Provider
      value={{
        appFirstLaunch,
        setAppFirstLaunch,
        user,
        setUser,
        Register,
        Login,
        Logout,
        granted,
        setGranted,
      }}>
      {children}
    </MainContext.Provider>
  );
};
