import React , {useState , useEffect} from "react";
import { Input , Text , InputLeftAddon , useToast , InputGroup , InputLeftElement , Button ,Center , Flex} from "@chakra-ui/react";
import { FaKey , FaAt , FaHashtag , FaHourglassEnd , FaHourglassHalf , FaHourglassStart , FaHourglass,FaShieldAlt} from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import{ init } from 'emailjs-com';
import { Modal } from 'react-materialize';

import axios from "axios";

import emailjs from 'emailjs-com';


export default function Signup({serverUrl}) {
    const [inputUsername, setInputUsername] = useState("")
    const [inputEmail, setInputEmail] = useState("")
    const [inputPassword, setInputPassword] = useState("")

    const [toggleActiveWin, setToggleActiveWin] = useState(false)
    const [codeActive, setCodeActive] = useState("")

    const hestory = useHistory()

    const toast = useToast()

    const [timerCodeGen, setTimerCodeGen] = useState(20)
    const [toggleStartTimer, setToggleStartTimer] = useState(false)
    const [toggleBtnNewCode, settoggleBtnNewCode] = useState(false)

    const timericon = [<FaHourglassEnd/> , <FaHourglassHalf/> ,  <FaHourglassStart/> , <FaHourglass/>]
    const [iconshow, setIconshow] = useState(0)

    useEffect(() => {
        if (toggleStartTimer){
            setTimeout(()=>{
                if (timerCodeGen > 0 ) {
                    iconshow === 3 ? setIconshow(0) : setIconshow(iconshow + 1)   
                    setTimerCodeGen(timerCodeGen - 1)
                    settoggleBtnNewCode(false)
                }else if(timerCodeGen === 0){
                    settoggleBtnNewCode(true)
                    setToggleStartTimer(false)
                    setTimerCodeGen(20)
                }
            } , 1000)
        }
    })

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

            const response = await axios.post(serverUrl+"/signup-active" , {
                name: inputUsername ,
                email: inputEmail ,
                password: inputPassword
            })

            setToggleActiveWin(true)
            setToggleStartTimer(true)
               
                   
            
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

    const activeUser = () => {
        axios.post(serverUrl+"/check-code" , 
        {
            email: inputEmail ,
            code : codeActive
        })
        .then(res => {
            console.log(res.data)
            hestory.push("/login")
            toast({
                title: 'Account created.',
                description: "We've created your account and Activete , thank you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
        })
        .catch(err => {
            toast({
                title: 'Error.',
                description: "Invalid Code Active.",
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        })

     };

     const getNewCodeActive = () => {
         axios.post(serverUrl + "/gen-new-code" , 
         {email: inputEmail })
         .then(res => console.log(res.data))
         .catch(err => console.log(err))

         settoggleBtnNewCode(!toggleBtnNewCode)
         setToggleStartTimer(!toggleStartTimer)
     }

 

    const activeGUI = () => {
        return (
            <>
            <Center flexDirection="column" margin={"auto"}>
            <Text fontSize={"23"}>Active Account : </Text>
            <InputGroup marginTop={"5px"}>
            <InputLeftElement
            pointerEvents='none'
            children={<FaShieldAlt color='gray.300' />}
            />
            <Input  id="inputActiveCode" w={"250px"} onChange={(e)=>{setCodeActive(e.target.value)}}  type="text" placeholder='Enter Your Active Code'/>
            </InputGroup>
            <Flex>
            <Button mx={"5px"} onClick={()=>{activeUser()}} mt={"10px"} backgroundColor={"skyblue"}>Active</Button>
            <Button disabled={!toggleBtnNewCode} onClick={()=>{getNewCodeActive()}} mt={"10px"} backgroundColor={"skyblue"}>New Code</Button>
            </Flex>
            {toggleStartTimer &&
            <Flex my={"6px"} fontSize={"20px"}>
                <Center>
                {timericon[iconshow]}
                <Text>{timerCodeGen}</Text>
                </Center>
            </Flex>
            }
            </Center>
            </>
        )
    }

    const signUpGUI = () => {
        return (
            <>
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
            </>
        )
    }

    const trigger = <Button>Open Modal</Button>;

    const ModelShow = () => {
        return (
            <>
            <Modal header="Modal Header" trigger={trigger}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Modal>
            </>
        )
    }

    return (
       <Flex  w={"400px"} m={"auto"} boxShadow={"0px 0px 10px black"} marginTop={"50px"} padding={"20px"}>
           {
                toggleActiveWin === false ? 
                    signUpGUI()
                    :
                    activeGUI()
           }  
        </Flex>
          
    )

    
}
