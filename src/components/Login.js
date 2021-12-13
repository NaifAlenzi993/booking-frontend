import React , {useState , useEffect} from "react";
import { useHistory } from 'react-router-dom';
import { Input , Text ,InputLeftAddon ,useToast  , InputGroup , InputLeftElement , Button ,Center , Flex ,Box} from "@chakra-ui/react";
import { FaKey , FaAt  } from 'react-icons/fa';
import axios from "axios";


export default function Login({setToken , token , setUserId , setName}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const hestory = useHistory()

    const [stateLogin, setStateLogin] = useState("")

    const [ShowWartinig, setShowWartinig] = useState(false)

    const [loginIsOkey, setLoginIsOkey] = useState("")

    const toast = useToast()

    const eventClickLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5000/login" , 
        {
                email : email , 
                password : password
        })
            setToken(response.data.token)
            setUserId(response.data.userId)
            // setName(email)
            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("userId",JSON.stringify(response.data.userId))
            hestory.push("/")
            toast({title: 'Login.',
            description: "You are logged in successfully.",
            status: 'success',
            duration: 3000,
            isClosable: true,})
            console.log(response.data.token);
        } catch (error) {
            if (error.response.status === 404 || error.response.status === 403) {
                console.log(error.response);
                toast({title: 'Error.',
                description: "Worng Password Or Email !",
                status: 'error',
                duration: 3000,
                isClosable: true,})

            }
        }
        

    }
    return (
        
        <Flex marginTop={"50px"} padding={"20px"}   >
            
            <Center flexDirection="column" margin={"auto"} >
            <Text fontSize={"23"}>Login Account : </Text>
            <InputGroup marginTop={"5px"}>
            <InputLeftElement
            pointerEvents='none'
            children={<FaAt color='gray.300' />}
            />
            <Input type="email" placeholder='E-Mail' onChange={(e)=>{setEmail(e.target.value)}}/>
            </InputGroup>

            <InputGroup marginTop={"5px"}>
            <InputLeftElement
            pointerEvents='none'
            children={<FaKey color='gray.300' />}
            />
            <Input type='password' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
            </InputGroup>
            
            <Button onClick={()=>{eventClickLogin()}} marginTop={"5px"} >LOGIN</Button>

            </Center>
            
        </Flex>
    )
}
