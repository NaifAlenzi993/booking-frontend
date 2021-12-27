import axios from 'axios'
import React , {useEffect , useState} from 'react'
import { Spinner , Box  , Image , Center ,Flex , Modal ,
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
                <div>ID : {myProfile._id}</div> 
                <div>UserName : {myProfile.name}</div> 
                <div>Email : {myProfile.email}</div>
                <div>Role : {myProfile.role == 0 ? "Admin" : "User"}</div>
                <div>Date Create : {myProfile.dateCreateAcc}</div> 
            </Box>
            </Center>

            }
            
        </div>
    )
}
