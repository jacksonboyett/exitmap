import React, { useState, useEffect } from 'react';
import Home from './Home';
import Dash from './main/Dash';
import Protected from './authentication/Protected';
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

function App() {

  useEffect(() => {
  }, [localStorage.isLoggedIn]);

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/dash'
          element={
            <Protected>
              <Dash children={ 'test' }/>
            </Protected>
          }
        />
        <Route path='/login' element={ <Login /> } />
        <Route path='/signup' element={ <Signup /> } />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
