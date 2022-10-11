import React from 'react';
import {NativeBaseProvider} from 'native-base';
import Routes from './src/routes/Routes';
import LoginRoutes from './src/routes/LoginRoutes'
const App = ({params}) => (
  <NativeBaseProvider>
    <LoginRoutes />
  </NativeBaseProvider>
);

export default App;
