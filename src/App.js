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
import { ChakraProvider , extendTheme , Text , Flex} from "@chakra-ui/react";

import "./style.css"

import NavbarTop from "./components/Navbar";

import MembersList from "./components/Dashboard/MembersList";
import Details from "./components/Dashboard/Details";
import HousesList from "./components/Dashboard/HousesList";
import Reports from "./components/Dashboard/Reports";
import Requests from "./components/Dashboard/Requests";

import Profile from "./components/Profile";
import UserInfo from "./components/UserInfo";
import axios from "axios";

function App() {
  const [serverUrl, setServerUrl] = useState("http://localhost:5000")
  const [token, setToken] = useState("")
  const [userId, setUserId] = useState("")
  const [name , setName] = useState("")
  const [role, setRole] = useState(2)
  const [usersBlock, setUsersBlock] = useState([])

  const [showPage, setShowPage] = useState(true)


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

  // useEffect(() => {
  //   axios.get(serverUrl + "/block" , 
  //   {headers: { authorization: `Bearer ${token}` }})
  //   .then(res => {
  //     setUsersBlock(res.data);
  //   })
  //   .catch(err => console.log(err))

  //   checkIsUserBlock()
  // }, [token])


const [config, setConfig] = useState({initialColorMode: 'dark',useSystemColorMode: false})

  // const checkIsUserBlock = ()=> {
  //   if (!userId) {
  //     setUserId(JSON.parse(localStorage.getItem("userId")))
  //   }
  //   usersBlock.forEach((elem , i) => {
  //       if (userId === elem.user){
  //         setShowPage(true)
  //       }else{
  //         setShowPage(false)
  //       }
  //   })
  // }

// const [theme2, setTheme2] = useState(extendTheme({ config }))

  return (
    <ChakraProvider theme={extendTheme({ config })}>

      {
      showPage ? 
      <>
      
      <NavbarTop token={token} setToken={setToken} userId={userId} setName={setName} config={config} setConfig={setConfig} name={name} role={role} />
      

      {/* =========== DashBoard ========== */}
    {role === 0 ? 
    <>

<Route
exact
path="/memberslist"
render={() => {
  return <MembersList token={token} setToken={setToken} userId={userId} serverUrl={serverUrl}/>;
}}
/>

<Route
exact
path="/details"
render={() => {
  return <Details token={token} userId={userId} serverUrl={serverUrl}/>;
}}
/>

<Route
exact
path="/houseslist"
render={() => {
  return <HousesList token={token} userId={userId} serverUrl={serverUrl}/>;
}}
/>

<Route
exact
path="/requestslist"
render={() => {
  return <Requests token={token} userId={userId} serverUrl={serverUrl}/>;
}}
/>

<Route
exact
path="/reportslist"
render={() => {
  return <Reports token={token} userId={userId} serverUrl={serverUrl}/>;
}}
/>
</>
      
      :
      ""
    }


    
      

        {/* ======= Home ====== */}
      <Route
        exact
        path="/"
        render={() => {
          return <Home token={token} setToken={setToken} userId={userId} serverUrl={serverUrl}/>;
        }}
      />

      { token ? <>

        <Route
        exact
        path="/user/:id"
        render={() => {
          return <UserInfo token={token} userId={userId} serverUrl={serverUrl}/>;
        }}
        />

        <Route
        exact
        path="/my-profile"
        render={() => {
          return <Profile token={token} setToken={setToken} userId={userId} serverUrl={serverUrl}/>;
        }}
      />
      


      {/* ====== Booking Page ======= */}
      <Route
        exact
        path="/booking"
        render={() => {
          return <Booking token={token} setToken={setToken} userId={userId} serverUrl={serverUrl}/>;
        }}
      />

<Route
        exact
        path="/fav"
        render={() => {
          return <Fav token={token} setToken={setToken} userId={userId} serverUrl={serverUrl}/>;
        }}
      />

     {/* ======= Show House By Id ======= */}
      <Route
        exact
        path="/house/:id"
        render={() => {
          return <HouseSelect token={token} role={role} setToken={setToken} userId={userId} serverUrl={serverUrl}/>;
        }}
      />

      {/* ======= Add House ======= */}
      <Route
        exact
        path="/addhouse"
        render={() => {
          return <AddHouse token={token} setToken={setToken} userId={userId} serverUrl={serverUrl}/>;
        }}
      />

      <Route
        exact
        path="/requests"
        render={() => {
          return <AddHouse token={token} setToken={setToken} userId={userId} serverUrl={serverUrl}/>;
        }}
      />

      </>
      :
      ""
      }

      

      {/* ======= House Page ======= */}
      <Route
        exact
        path="/houses"
        render={() => {
          return <Houses token={token} setToken={setToken} userId={userId} serverUrl={serverUrl} role={role} />;
        }}
      />


      {/* ======= Login & SignUp ====== */}

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
            serverUrl={serverUrl}
            showPage={showPage}
            setUsersBlock={setUsersBlock}
          />
        )}
      />
      <Route
        exact
        path="/signup"
        render={() => <Signup token={token} setToken={setToken} serverUrl={serverUrl}/>}
      />
      </>
      :
      <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w={"500px"}
      border={"1px solid red"}
      boxShadow={"0px 0px 10px black"}
      margin={"auto"}
      marginTop={"40px"}
      >
            <Text
            fontSize={"30px"}
            >Your account has been banned
            </Text>
      </Flex>
     
      }
    </ChakraProvider>
  );
}

export default App;
