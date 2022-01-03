import React , {useState , useEffect} from "react";
import {Navbar , Nav  } from 'react-bootstrap'
import {  Button  , Tooltip  , MenuGroup, MenuItem , MenuList , Menu , MenuButton , MenuDivider ,useColorMode} from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { FaRegMoon , FaUserPlus , FaSignInAlt , FaHome ,FaRegCalendarCheck ,FaHotel , FaClinicMedical , FaSignOutAlt , FaHeart} from 'react-icons/fa';





export default function NavbarTop({token , setToken , setName , name , config , setConfig , role}) {

    const hestory = useHistory()
    const { colorMode, toggleColorMode } = useColorMode()

    const logout = ()=>{
      setToken("")
       localStorage.setItem("token" , JSON.stringify(""))
      setName("")
      hestory.push("/")
  }

  const checkToken = ()=> {
      if (token) {
          return <>
                <Tooltip hasArrow label='Go Page Home' bg='red.600'>
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/")}}><FaHome/></Button> </Nav.Link>
                </Tooltip>

                <Tooltip hasArrow label='Go Page Hotels' bg='red.600'>
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/houses")}}><FaHotel/></Button> </Nav.Link>
                </Tooltip>
                
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/booking")}}><FaRegCalendarCheck/></Button> </Nav.Link>
                
                <Tooltip hasArrow label='Your Favorite List' bg='red.600'>
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/fav")}}><FaHeart/></Button> </Nav.Link>
                </Tooltip>
                <Tooltip hasArrow label='Add Your Hotel' bg='red.600'>
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push('/addhouse')}}><FaClinicMedical></FaClinicMedical></Button> </Nav.Link>
                </Tooltip>

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

                            </MenuGroup>
                        <MenuDivider />
                        <MenuItem onClick={()=>{logout()}} color={"red"}>Logout</MenuItem>
                        </MenuList>
                        </Menu>
                    </Nav.Link>
            </>
        }else{
            return <>
               <Tooltip hasArrow label='Go Page Home' bg='red.600'>
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/")}}><FaHome/></Button> </Nav.Link>
                </Tooltip>
                <Tooltip hasArrow label='Go Page Hotels' bg='red.600'>
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/houses")}}><FaHotel/></Button> </Nav.Link>
                </Tooltip>
                <Tooltip hasArrow label='Login' bg='red.600'>
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/login")}}><FaSignInAlt/></Button> </Nav.Link>
                </Tooltip>
                
                <Tooltip hasArrow label='Create New Account' bg='red.600'>
                <Nav.Link> <Button colorScheme="red" onClick={()=>{hestory.push("/signup")}}>{<FaUserPlus/>}</Button> </Nav.Link>
                </Tooltip>
          </>
      }
  }
  



  return (
   
           <Navbar className="p-2" collapseOnSelect style={{background : "#080808"}} variant = "dark"
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
