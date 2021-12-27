import React , {useState , useEffect} from "react";
import { Input , Text , InputLeftAddon , useToast , InputGroup , InputLeftElement , Button ,Center , Flex} from "@chakra-ui/react";
import { FaKey , FaAt , FaHashtag} from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import axios from "axios";


export default function Signup({serverUrl}) {
    const [inputUsername, setInputUsername] = useState("")
    const [inputEmail, setInputEmail] = useState("")
    const [inputPassword, setInputPassword] = useState("")

    const hestory = useHistory()

    const toast = useToast()

    const clickSignup = async () => {
        if (inputUsername === "" || inputEmail === "" || inputPassword === "") {
            toast({
                title: 'Error',
                description: "Please fill in data !",
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
              return
        }
        try {
            const response = await axios.post(serverUrl+"/signUp" , {
                name: inputUsername ,
                email: inputEmail ,
                password: inputPassword
            })
               
                    hestory.push("/login")
                    toast({
                        title: 'Account created.',
                        description: "We've created your account for you.",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                      })
            
           } catch (error) {
            toast({
                title: 'Error',
                description: "Email is already registered",
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
           }

    }

    return (
       <Flex  marginTop={"50px"} padding={"20px"}>
            <Center flexDirection="column" margin={"auto"}>
            <Text fontSize={"23"}>Create Account : </Text>
            <InputGroup marginTop={"5px"}>
            <InputLeftElement
            pointerEvents='none'
            children={<FaHashtag color='gray.300' />}
            />
            <Input type="text" placeholder='Username' onChange={(e)=>{setInputUsername(e.target.value)}}/>
            </InputGroup>

            <InputGroup marginTop={"5px"}>
            <InputLeftElement
            pointerEvents='none'
            children={<FaAt color='gray.300' />}
            />
            <Input type="email" placeholder='E-Mail' onChange={(e)=>{setInputEmail(e.target.value)}}/>
            </InputGroup>

            <InputGroup marginTop={"5px"}>
            <InputLeftElement
            pointerEvents='none'
            children={<FaKey color='gray.300' />}
            />
            <Input type='password' placeholder='Password' onChange={(e)=>{setInputPassword(e.target.value)}}/>
            </InputGroup>
            
            <Button onClick={()=>{clickSignup()}} marginTop={"5px"} >SIGNUP</Button>

            </Center>
            
        </Flex>
    )
}
