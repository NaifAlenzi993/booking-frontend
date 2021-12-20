import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Houses from "./components/Houses";
import AddHouse from "./components/AddHouse";
import Home from "./components/Home";
import HouseSelect from "./components/HouseSelect"
import Booking from "./components/Booking";
import Fav from "./components/Fav";
import "bootstrap/dist/css/bootstrap.css"
import { ChakraProvider , extendTheme } from "@chakra-ui/react";

import "./style.css"

import NavbarTop from "./components/Navbar";

function App() {
  const [token, setToken] = useState("")
  const [userId, setUserId] = useState("")
  const [name , setName] = useState("")
  const [role, setRole] = useState(2)

  useEffect(() => { 
    if (!token) {
        const mytoken = JSON.parse(localStorage.getItem("token"))
        const myuserId = JSON.parse(localStorage.getItem("userId"))
        const username = JSON.parse(localStorage.getItem("username"))
        const userRole = JSON.parse(localStorage.getItem("role"))
        setToken(mytoken)
        setUserId(myuserId)
        setName(username)
        setRole(userRole)
    }
}, [])


const [config, setConfig] = useState({initialColorMode: 'dark',
useSystemColorMode: false})


// const [theme2, setTheme2] = useState(extendTheme({ config }))

  return (
    <ChakraProvider theme={extendTheme({ config })}>
      <NavbarTop token={token} setToken={setToken} userId={userId} setName={setName} config={config} setConfig={setConfig} name={name} role={role} />

      <Route
        exact
        path="/fav"
        render={() => {
          return <Fav token={token} setToken={setToken} userId={userId} />;
        }}
      />

      <Route
        exact
        path="/booking"
        render={() => {
          return <Booking token={token} setToken={setToken} userId={userId} />;
        }}
      />

      <Route
        exact
        path="/"
        render={() => {
          return <Home token={token} setToken={setToken} userId={userId} />;
        }}
      />

      <Route
        exact
        path="/house/:id"
        render={() => {
          return <HouseSelect token={token} setToken={setToken} userId={userId} />;
        }}
      />

      <Route
        exact
        path="/addhouse"
        render={() => {
          return <AddHouse token={token} setToken={setToken} userId={userId} />;
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
            setRole={setRole} 
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
