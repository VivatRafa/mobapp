import React from 'react';
import { StatusBar } from 'react-native';
import { SWRConfig } from 'swr';
import { AuthProvider } from './context/AuthProvider';
import Navigator from './pages';


export default function App() {
  return (
    <>
    <AuthProvider>
      <SWRConfig>
        <StatusBar
          backgroundColor="#121212"
          barStyle="light-content"
        />
        <Navigator />
      </SWRConfig>
    </AuthProvider>
    </>
  );
}

