import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import MainNavigation from './navigation/navigation';

import KeypairController from './controllers/KeypairController';
import ChainProviderController from './controllers/ChainProviderController';

import { persistor, store } from './stores/index';

const App = () => {
  useEffect(() => {
    KeypairController.init();
    ChainProviderController.init();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
