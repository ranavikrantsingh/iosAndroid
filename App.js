import React from 'react';
import {NativeBaseProvider} from 'native-base';
import Routes from './src/routes/Routes';

const App = ({params}) => (
  <NativeBaseProvider>
    <Routes />
  </NativeBaseProvider>
);

export default App;
