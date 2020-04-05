import React, {useEffect, useState} from 'react';
import storage from './../../storage';
import {useStoreActions} from './../../stores';
import {View, ActivityIndicator, Text} from 'react-native';

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

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default AppInitialLoader;
