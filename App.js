import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
import Root from './src/routes/Root';
import {NativeBaseProvider} from 'native-base';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <Root />
          </GestureHandlerRootView>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
