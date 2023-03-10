import React, { useState, useEffect } from "react";
import Home from "./Home";
import Dash from "./dashboard/Dash";
import Protected from "./authentication/Protected";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { theme } from "./theme";

import SubmitExit from "./dashboard/tabs/SubmitExit";
import Exits from "./dashboard/tabs/Exits";

function App() {
  useEffect(() => {}, [localStorage.isLoggedIn]);

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="dash">
          <Route
            index
            path="*"
            element={
              <Protected>
                {" "}
                <Dash children={"HOME"} />{" "}
              </Protected>
            }
          />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

// OUTLET DETERMINES THE OUTPUT OF THE ROUTE

export default App;
