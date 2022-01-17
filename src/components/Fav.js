import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { Container , Input , Text , InputLeftAddon , useToast ,FormControl , InputGroup , InputLeftElement , Button , Select , Center , Flex , Box  , FormLabel , Slider , Alert , AlertIcon, AlertTitle , Tabs , TabList , Tab , TabPanels , TabPanel, Textarea,
    SliderTrack, AlertDescription, CloseButton,useDisclosure,ScaleFade ,SlideFade,
    SliderFilledTrack,Avatar, Tag,
    SliderThumb, WrapItem,Divider,
    HStack , Img , Tooltip} from "@chakra-ui/react";
    import {FaHeart  } from "react-icons/fa";

export default function Fav({token , serverUrl}) {
    const [fav, setFav] = useState([])

    useEffect(() => {
        axios.get(serverUrl + "/fav" , 
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => setFav(res.data))
        .catch(error => console.log(error))

        console.log(fav);
    }, [token])


    const unLike = (id) => {
         axios.post("http://localhost:5000/fav" , 
        {house : id} ,
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => {
            setFav(res.data)
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }

    return (
      <Flex
        w={"700px"}
        margin={"auto"}
        justifyContent={"center"}
        flexDirection={"column"}
        my={"10px"}
      >
        {fav.length ? (
          fav &&
          fav.map((fav, i) => {
            return (
              <Box
              margin={"10px"}
              >
                <Flex 
                justifyContent={"space-between"}
                borderRadius={"5px"}
                boxShadow={"0px 0px 10px black"}
                margin={"10px"}
                >
                  <Flex
                  alignItems={"center"}
                  >
                  <Img src={fav.house.img} alt="" w={"100px"} h={"100px"} margin={"10px"} />
                  <Flex flexDirection={"column"}>
                  <Text fontSize={"20px"}>{fav.house.name}</Text>
                  <Text fontSize={"12px"}>{fav.house.description}</Text>
                  </Flex>
                  
                  </Flex>
                  
                  <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  marginRight={"10px"}
                  >
                    
                    <FaHeart
                      style={{ 
                          color: "red" ,
                          fontSize : "30px"
                    }}
                      onClick={() => {
                        unLike(fav.house._id);
                      }}
                    />
                  </Flex>
                </Flex>
              </Box>
            );
          })
        ) : (
          <Flex 
          justifyContent={"center"} 
          alignItems={"center"}
          bg={"blackAlpha.100"}
          w={"700px"}
          h={"400px"}
          >
            <Text
            fontSize={"20px"}
            >No Have Favirte</Text>
          </Flex>
        )}
      </Flex>
    );
}
