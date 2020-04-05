import React, {useEffect} from 'react';
import storage from './../../storage';

const AppInitialLoader = (props) => {
  const navigateToAppropriateScreen = async () => {
    const userFromStorage = await storage.getLoggedInUser();
    if (userFromStorage) {
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
