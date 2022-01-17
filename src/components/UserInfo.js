import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { useHistory , useParams } from "react-router-dom";
import { Container , Input , Text , InputLeftAddon , useToast ,FormControl , InputGroup , InputLeftElement , Button , Select , Center , Flex , Box  , FormLabel , Slider , Alert , AlertIcon, AlertTitle , Tabs , TabList , Tab , TabPanels , TabPanel, Textarea,
    SliderTrack, AlertDescription, CloseButton,useDisclosure,ScaleFade ,SlideFade,
    SliderFilledTrack,Avatar, Tag,
    SliderThumb, WrapItem,Divider,
    HStack , Img , Tooltip , AccordionPanel  , Accordion , AccordionIcon , AccordionItem,
    AccordionButton} from "@chakra-ui/react";
import { FaStar , FaRegCommentAlt , FaHotel , FaRegCalendarCheck , FaRocketchat , FaWhatsapp } from "react-icons/fa";
import Houses from './Houses';



export default function UserInfo({token , userId , serverUrl}) {
    const [showUser, setShowUser] = useState("")
    const [isOnline, setIsOnline] = useState(false)
    const [hotelsUser, setHotelsUser] = useState([])
    const [favUser, setFavUser] = useState([])
    const {id} = useParams()

    useEffect(() => {
        axios.get(serverUrl + "/get-user-info/" + id, 
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => {
            setShowUser(res.data)
            getAllFav()
            getAllHouse()
        })
        .catch(err => console.log(err))
    }, [])

    const getAllFav = () => {
        axios.get(serverUrl + "/get-favs/"+id , 
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => setFavUser(res.data))
        .catch(err => console.log(err))
    }
    
    const getAllHouse = () => {
        axios.get(serverUrl + "/get-houses/"+id , 
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => setHotelsUser(res.data))
        .catch(err => console.log(err))
    }

    const displayHotels = () => {
        return <> 
            {hotelsUser.length ? hotelsUser.map((elem , i) => { 
                return <Box key={i}>
                    {elem._id}
                </Box>
            }) 
            :
            "no Have Hotels"
        }
        </>
        
    }

    const displayFavs = () => {
        return <> 
        {favUser.length ? favUser.map((elem , i) => { 
            return <Box key={i}>
                {elem._id}
            </Box>
        }) 
        :
        "no Have Hotels"
    }
    </>
    }

    return (
      <div>
        {showUser && (
          <Flex>
            <Box
              boxShadow={"0px 0px 10px black"}
              w={[350, 500, 600]}
              h={"400px"}
              margin={"auto"}
              my={"10px"}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Flex
                w={"100%"}
                h={"100px"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                my={"10px"}
                flexDirection={"column"}
                // border={"1px solid black"} 
            >
                
                <Accordion 
             allowToggle
                w={"100%"}
                my={"5px"}>
                  <AccordionItem>
                    <h2>
                      <AccordionButton
                         borderBottom={"1px solid black"}
                      >
                        <Box 
                        flex="1" 
                        textAlign="Center"
                        fontWeight={"bold"}
                        >
                            hotels for this member
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel >
                        {displayHotels()}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                <Accordion 
                allowToggle
                w={"100%"}
                my={"5px"}
                >
                  <AccordionItem>
                      <AccordionButton
                         borderBottom={"1px solid black"}
                      >
                        <Box 
                        flex="1" 
                        textAlign="Center"
                        fontWeight={"bold"}
                        >
                            Fav for this member
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    <AccordionPanel>
                        {displayFavs()}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

              </Flex>
              <Center height="500px">
                <Divider orientation="vertical" />
              </Center>
              <Flex
                flexDirection={"column"}
                justifyContent={"flex-start"}
                w={"100px"}
                h={"130px"}
                m={"10px"}
              >
                <Text 
                fontWeight={"bold"}
                textAlign={"center"}
                margin={"auto"}
                >{showUser.name}</Text>
                <Img
                  src={showUser.img}
                  alt="User Image"
                  w={"50px"}
                  h={"50px"}
                  margin={"auto"}
                  border={"1px solid black"}
                  borderRadius={"100%"}
                  bg={"gray"}
                />
                <Button my={"5px"} colorScheme={"blue"}>
                  {<FaRocketchat />}
                </Button>
                <Button colorScheme={"whatsapp"}>{<FaWhatsapp />}</Button>
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  w={"90px"}
                >
                  {isOnline ? (
                    <>
                      <Box
                        w={"20px"}
                        h={"20px"}
                        bg={"green"}
                        margin={"auto"}
                        my={"5px"}
                        borderRadius={"100%"}
                      ></Box>
                      <Text fontWeight={"bold"}>Online</Text>
                    </>
                  ) : (
                    <>
                      <Box
                        w={"20px"}
                        h={"20px"}
                        bg={"gray"}
                        margin={"auto"}
                        my={"5px"}
                        borderRadius={"100%"}
                      ></Box>
                      <Text fontWeight={"bold"}>Offline</Text>
                    </>
                  )}
                </Flex>
              </Flex>
            </Box>
          </Flex>
        )}
      </div>
    );
}
