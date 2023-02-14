import React, { useState, useEffect } from 'react';
import Home from './Home';
import Dash from './dashboard/Dash';
import Protected from './authentication/Protected';
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import SubmitExit from './dashboard/tabs/SubmitExit';
import Exits from './dashboard/tabs/Exits';


function App() {

  useEffect(() => {
  }, [localStorage.isLoggedIn]);

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={ <Login /> } />
        <Route path='signup' element={ <Signup /> } />
        <Route path='dash'>
          <Route index path='' element={<Protected> <Dash children={ 'HOME' }/> </Protected>} />
          <Route index path='exits' element={<Protected> <Dash children={ <Exits /> }/> </Protected>} />
          <Route path='submit' element={<Protected> <Dash children={<SubmitExit />}/> </Protected>} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
