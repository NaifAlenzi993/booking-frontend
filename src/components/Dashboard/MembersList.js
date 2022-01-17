import React , {useState , useEffect} from 'react'
import { useHistory , useParams , Link} from "react-router-dom";
import axios from 'axios'
import { Flex , Avatar , Text , Badge , Box , Button} from "@chakra-ui/react";

export default function MembersList({serverUrl , token}) {

    const [Users, setUsers] = useState([])
    const [usersBlock, setUsersBlock] = useState([])

    useEffect(() => {
        axios.get(serverUrl + "/get-users" , 
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))
    }, [])

    const blockUser = (id)=> {
        axios.post(serverUrl + "/block" , 
        {id : id},
        {headers: { authorization: `Bearer ${token}` }})
        .then(res=> setUsersBlock(res.data))
        .catch(err => console.log(err))
    }

    return (
        <div>
            {Users && Users.map((elem , i) => {
                return <Flex 
                border={"1px solid black"}
                borderRadius={"10px"}
                justifyContent={"space-between"}
                w={[300 , 500 , 800]}
                m={"auto"}
                my={"6px"}
                _hover={
                    {
                        boxShadow : "0px 0px 10px black"
                    }
                }
                >
                <Flex>

                <Link to={"/user/"+elem._id}><Avatar src={elem.img} /></Link>
                <Box ml='3'>
                  <Text fontWeight='bold'>
                    {elem.name}
                    {elem.role == 0 ? <Badge ml='1' colorScheme='red'>
                      admin
                    </Badge> 
                    :
                    <Badge ml='1' colorScheme='red'>
                      user
                    </Badge> }
                   
                  </Text>
                  <Text fontSize='sm'>{elem._id}</Text>
                </Box>
                </Flex>
                
                <Flex 
                alignItems={"center"}
                justifyContent={"center"}
                >
                <Button
                colorScheme={"red"}
                w={[50 , 100 , 100]}
                h={"20px"}
                mx={"9px"}
                onClick={()=>{blockUser(elem._id)}}
                >Block</Button>
                </Flex>
              
              </Flex>
            })}
        </div>
    )
}
