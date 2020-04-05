import React, {useEffect} from 'react';
import storage from './../../storage';
import {useStoreActions} from './../../stores';

const AppInitialLoader = (props) => {
  const loginUser = useStoreActions((state) => state.loginStore.loginUser);

  const navigateToAppropriateScreen = async () => {
    const userFromStorage = await storage.getLoggedInUser();
    if (userFromStorage) {
      loginUser(userFromStorage);
      props.navigation.navigate('Home');
    } else {
      props.navigation.navigate('Login');
    }
  };

  useEffect(() => {
    navigateToAppropriateScreen();
  }, []);

  return null;
};

export default AppInitialLoader;
