import axios from 'axios'
import React , {useEffect , useState} from 'react'
import { Spinner , Box  , Image , Center ,Flex , Modal , Text,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton} from "@chakra-ui/react";


export default function Profile({token , serverUrl}) {
    const [myProfile, setMyProfile] = useState([])

    useEffect(() => {
        axios.get(serverUrl + "/user" ,
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => setMyProfile(res.data))
        .catch(err => console.log(err))
    }, [token])


    return (
        <div>

            {myProfile && 
            <Center>
            <Box id='profile-info' maxW='sm' borderWidth='1.5px' borderRadius='lg' overflow='hidden'>
                <div ><img id='img-profile' src={myProfile.img} alt="" /></div>
                <Box fontSize={"17px"}>
                    <Text>ID : {myProfile._id}</Text> 
                    <Text>UserName : {myProfile.name}</Text> 
                    <Text>Email : {myProfile.email}</Text>
                    <Text>Role : {myProfile.role == 0 ? "Admin" : "User"}</Text>
                    <Text>Date Create : {myProfile.dateCreateAcc}</Text> 
                </Box>
            </Box>
            </Center>

            }
            
        </div>
    )
}
