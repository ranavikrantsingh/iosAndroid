import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './src/redux/store';
import Root from './src/routes/Root';
import { NativeBaseProvider } from 'native-base';


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <Root />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}