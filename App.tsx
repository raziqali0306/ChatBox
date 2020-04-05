/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import Navigator from './src//Router';
import {StoreProvider} from 'easy-peasy';
import store from './src/stores';
import contacts from './src/common/Contacts';

const App = () => {
  const getPermissions = async () => {
    await contacts.getPermissions();
  };
  useEffect(() => {
    getPermissions();
  }, []);
  return (
    <StoreProvider store={store}>
      <Navigator />
    </StoreProvider>
  );
};

export default App;
