import React , {useState , useEffect} from "react";
import { Link } from "react-router-dom";
import {Navbar , Nav  } from 'react-bootstrap'
import {  Button , Center , extendTheme , Flex , MenuGroup, MenuItem , MenuList , Menu , MenuButton , MenuDivider ,useColorMode} from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { FaRegMoon } from 'react-icons/fa';
import axios from "axios";


export default function NavbarTop({token , setToken , setName , name , config , setConfig }) {

    const hestory = useHistory()
    const { colorMode, toggleColorMode } = useColorMode()

    const logout = ()=>{
      setToken("")
       localStorage.setItem("token" , JSON.stringify(""))
      setName("")
  }

  const checkToken = ()=> {
      if (token) {
          return <>
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/")}}>HOME</Button> </Nav.Link>

                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/houses")}}>HOUSES</Button> </Nav.Link>

                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/booking")}}>BOOKING</Button> </Nav.Link>

                

                <Nav.Link> <Menu>
                        <MenuButton as={Button} colorScheme='pink'>
                            Profile
                        </MenuButton>
                        <MenuList>
                            <MenuGroup color={"black"} title='Profile' >
                                <MenuItem color={"black"}>My Account</MenuItem>
                                <MenuItem color={"black"}>Payments</MenuItem>
                            </MenuGroup>
                         {/* <MenuDivider /> */}
                         </MenuList>
                        </Menu>
                        </Nav.Link>

                <Nav.Link > <Button colorScheme="red" onClick={()=>{logout()}}>LOGOUT</Button> </Nav.Link>
          </>
      }else{
          return <>
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/")}}>HOME</Button> </Nav.Link>
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/login")}}>LOGIN</Button> </Nav.Link>
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/signup")}}>Create Account</Button> </Nav.Link>
          </>
      }
  }


  return (
   
           <Navbar className="p-3" collapseOnSelect style={{background : "#080808"}} variant = "dark"
                   sticky="top" expand = "lg" >
                    
                    <Navbar.Brand > 
                        {/* <img src={logo} width="40" height={"40"}/> */}
                        <span className='ml-2'>Booking App</span> 
                    </Navbar.Brand>
                      
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                    <Nav>
                    <Nav.Link> 
                        <FaRegMoon fontSize={"25px"} onClick={()=>{toggleColorMode()}}></FaRegMoon>
                    </Nav.Link>
                    {checkToken()}
                    </Nav>

                    </Navbar.Collapse>
 {/* {checkToken()} */}
                </Navbar>
         
      
  )
}
