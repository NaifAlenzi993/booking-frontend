import React , {useState , useEffect} from "react";
import {Navbar , Nav  } from 'react-bootstrap'
import {  Button  , Tooltip  , MenuGroup, MenuItem , MenuList , Menu , MenuButton , MenuDivider ,useColorMode} from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { FaRegMoon } from 'react-icons/fa';
import axios from "axios";




export default function NavbarTop({token , setToken , setName , name , config , setConfig , role}) {

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
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/")}}>Home</Button> </Nav.Link>

                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/houses")}}>Houses</Button> </Nav.Link>

                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/booking")}}>Booking</Button> </Nav.Link>

                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/fav")}}>Fav</Button> </Nav.Link>

                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push('/addhouse')}}>Add House</Button> </Nav.Link>

                {role === 0 ?  
                 
                <Nav.Link> <Menu> 
                    <MenuButton as={Button} colorScheme='pink'>
                        Dashboard
                    </MenuButton> 
                    <MenuList>
                        <MenuGroup fontSize={"15px"} color={"black"} >
                                <MenuItem onClick={()=>{hestory.push("/details")}} color={"black"}>Details</MenuItem>
                                <MenuItem onClick={()=>{hestory.push("/houseslist")}} color={"black"}>Houses</MenuItem>
                                <MenuItem onClick={()=>{hestory.push("/memberslist")}} color={"black"}>Members</MenuItem>
                                <MenuItem onClick={()=>{hestory.push("/reportslist")}} color={"black"}>Reports</MenuItem>
                                <MenuItem onClick={()=>{hestory.push("/requestslist")}} color={"black"}>Requests</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </Nav.Link>  : ""}


                    <Nav.Link> <Menu>
                        <MenuButton as={Button} colorScheme='pink'>
                            My Account
                        </MenuButton>
                        <MenuList>
                            <MenuGroup fontSize={"15px"} color={"black"} title={`Login : ${name}`} >
                                <MenuItem color={"black"}>Setting</MenuItem>
                                <MenuItem onClick={()=>{hestory.push("/my-profile")}} color={"black"}>My Profile</MenuItem>
                                {/* {role === 0 ? <MenuItem color={"black"}>AdminTools</MenuItem> : ""} */}
                                {/* {role === 0 ? <MenuItem onClick={()=>{hestory.push('/addhouse')}} color={"black"}>Add Houses</MenuItem> : ""} */}
                            </MenuGroup>
                         <MenuDivider />
                         <MenuItem onClick={()=>{logout()}} color={"red"}>Logout</MenuItem>
                         </MenuList>
                        </Menu>
                    </Nav.Link>

          </>
      }else{
          return <>
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/")}}>Home</Button> </Nav.Link>
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/houses")}}>House</Button> </Nav.Link>
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/login")}}>Login</Button> </Nav.Link>
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

                  
                        
                    
                        
                    </Nav.Link>
                    {checkToken()}
                    </Nav>

                    </Navbar.Collapse>
                        {/* {checkToken()} */}
                    <FaRegMoon fontSize={"25px"} onClick={()=>{toggleColorMode()}}></FaRegMoon>
                </Navbar>
         
      
  )
}
