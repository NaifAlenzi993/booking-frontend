import "./App.css";
import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Houses from "./components/Houses";
import Home from "./components/Home";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css"
import { ChakraProvider , extendTheme, theme , Spinner , Center } from "@chakra-ui/react";

import NavbarTop from "./components/Navbar";

function App() {
  const [token, setToken] = useState("")
  const [userId, setUserId] = useState("")
  const [name , setName] = useState("")

  useEffect(() => { 
    if (!token) {
        const mytoken = JSON.parse(localStorage.getItem("token"))
        const myuserId = JSON.parse(localStorage.getItem("userId"))
        setToken(mytoken)
        setUserId(myuserId)
    }
}, [])


const [config, setConfig] = useState({initialColorMode: 'dark',
useSystemColorMode: false})


// const [theme2, setTheme2] = useState(extendTheme({ config }))

  return (
    <ChakraProvider theme={extendTheme({ config })}>
      <NavbarTop token={token} setToken={setToken} userId={userId} setName={setName} config={config} setConfig={setConfig}/>

      <Route
        exact
        path="/"
        render={() => {
          return <Home token={token} setToken={setToken} userId={userId} />;
        }}
      />

      <Route
        exact
        path="/houses"
        render={() => {
          return <Houses token={token} setToken={setToken} userId={userId} />;
        }}
      />

      <Route
        exact
        path="/login"
        render={() => (
          <Login
            token={token}
            setToken={setToken}
            setName={setName}
            setUserId={setUserId}
          />
        )}
      />
      <Route
        exact
        path="/signup"
        render={() => <Signup token={token} setToken={setToken} />}
      />
    </ChakraProvider>
  );
}

export default App;
