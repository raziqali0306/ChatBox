/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import Navigator from './src//Router';
import {StoreProvider} from 'easy-peasy';
import store from './src/stores';

const App = () => {
  return (
    <StoreProvider store={store}>
      <Navigator />
    </StoreProvider>
  );
};

export default App;
