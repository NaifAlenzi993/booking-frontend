import React , {useEffect , useState} from 'react'
import axios from 'axios'
import { Input , Text ,InputLeftAddon , Button ,Center , Flex ,Box} from "@chakra-ui/react";

export default function Requests({serverUrl , token}) {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        axios.get(serverUrl + "/request" , 
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => setRequests(res.data))
        .catch(err => console.log(err))
    }, [])

    const accapte =  (id) => {
        axios.post(serverUrl + "/request/" , 
        {id : id}
        ,
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => setRequests(res.data))
        .catch(err => console.log(err))

    }

  

    const reject =  (id) => {
        axios.delete(serverUrl + "/request/" + id ,
        {headers: { authorization: `Bearer ${token}` }} )
        .then(res => setRequests(res.data))
        .catch(err => console.log(err))
    }

    return (
        <div>
            <Center>
            <Box id='resuestList' className='container' width={"60%"}>
                <Flex flexDirection={"column"}>
                {requests.map((elem , i)=> {
                    return <Box boxShadow={"0px 0px 10px black;"}>
                        <img src={elem.img} alt="" width={"100"}/>
                        <div>Name House : {elem.name}</div>
                        <div>Price : {elem.price} S.R</div>
                        <div>userName : {elem.user.name}</div>
                        <Button onClick={()=>{accapte(elem._id)}}>Accept</Button>
                        <Button onClick={()=>{reject(elem._id)}}>Reject</Button>
                    </Box>
                })}
                </Flex>
            </Box>
            </Center>
        </div>
    )
}
