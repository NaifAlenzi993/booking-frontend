import React , {useState , useEffect} from "react";
import { useHistory , useParams , Link} from "react-router-dom";
import axios from "axios";
import { Container , Input , Text , InputLeftAddon , useToast ,FormControl , InputGroup , InputLeftElement , Button , Select , Center , Flex , Box  , FormLabel , Slider , Alert , AlertIcon, AlertTitle , Tabs , TabList , Tab , TabPanels , TabPanel, Textarea,
    SliderTrack, AlertDescription, CloseButton,useDisclosure,ScaleFade ,SlideFade,
    SliderFilledTrack,Avatar, Tag,
    SliderThumb, WrapItem,Divider,
    HStack , Img , Tooltip} from "@chakra-ui/react";

import ReactStars from "react-rating-stars-component";
import { FaStar , FaRegCommentAlt , FaHotel , FaRegCalendarCheck } from "react-icons/fa";

import "../styles/houseSelect.css"

export default function HouseSelect({token , userId , serverUrl , role}) {
    const today = new Date()
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    
    let todayA = new Date().toISOString().slice(0, 10)
    todayA = todayA.split("-")
    todayA = todayA[0] + "-" + todayA[1] + "-" + todayA[2]
   

    const [house, setHouse] = useState({})
    const [startDate, setStartDate] = useState(`${todayA}`)
    const [expDate, setExpDate] = useState(`${todayA}`)
    const [priceTotal, setPriceTotal] = useState(0)
    const [serviceFee, setServiceFee] = useState(0)
    const [commentText, setCommentText] = useState("")
    const [commentsArr, setCommentsArr] = useState([])
    const { id } = useParams()

    const history = useHistory()
    
    
    const [toggleRating, setToggleRating] = useState(false)
    const [toggleComment, setToggleComment] = useState(false)

    const [reatingChange, setReatingChange] = useState(false)

    const [commentIsDisabled, setCommentIsDisabled] = useState(true)
    const [commentTimer, setCommentTimer] = useState(15)

    useEffect(() => {
        if (commentIsDisabled == false){
            setTimeout(()=>{
                if (commentTimer > 1){
                    setCommentTimer(commentTimer - 1)
                }else{
                    setCommentIsDisabled(true)
                    setCommentTimer(15)
                }
                
            },1000)
        }
    })

    const ratingSet =  (newRating) => {
        console.log(newRating);
        setReatingChange(newRating);
      };

    useEffect(() => {
        axios.get(serverUrl+"/house/" + id , 
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => {
          console.log(res.data);
            setHouse(res.data[0]);
            // console.log(res.data);
        })
        .catch(err => console.log(err))

        axios.get(serverUrl+"/comment/" + id,
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => {
            setCommentsArr(res.data)
        })
        .catch(err => console.log(err)) 
    }, [token])

    const addBooking = () => {
        axios.post(serverUrl+"/booking/" , 
        {
            startDate: startDate,
            expiryDate: expDate ,
            user: userId,
            priceTotal: priceTotal,
            house: house._id,
            isBooked: false
        },
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const addComment = ()=> {
        if (reatingChange === false) {
            setToggleRating(true)
            setTimeout(()=>{
                setToggleRating(false)
            },2000)
            return
        }
        if (commentText.length < 3) {
            setToggleComment(true)
            setTimeout(()=>{
                setToggleComment(false)
            },2000)
            return
        }
       

        

        axios.post(serverUrl+"/comment" , 
        {house : id , 
        text : commentText,
        rate : reatingChange ,

    },
    {headers: { authorization: `Bearer ${token}` }})
    .then(res => {
        setCommentsArr(res.data)
        if (role !== 0){
            console.log(role);
            setCommentIsDisabled(false)
        }
    })
    .catch(err => console.log(err))
    }

    useEffect(() => {
       if (startDate !== "" && expDate !== ""){
           const date1 = startDate.split("-")
           const date2 = expDate.split("-")
           const df = date1[1] +"-"+ date1[2] +"-"+ date1[0]
           const ds = date2[1] +"-"+ date2[2] +"-"+date2[0]
     
           const price = Math.round(house.price * getDays(df, ds))
           const fel = Math.round((price / 100) * 8)
           const total = Math.round(price + fel)

           setServiceFee(fel)
           setPriceTotal(total)
       }
    }, [expDate])

    const getDays = (start, end) => {
        const date1 = new Date(start);
        const date2 = new Date(end);
        const oneDay = 1000 * 60 * 60 * 24;
        const diffInTime = date2.getTime() - date1.getTime();
        const diffInDays = Math.round(diffInTime / oneDay);
        return diffInDays;
    }

    const goProfile = (id)=>{
        // console.log(serverUrl +"/user/"+house.user._id);
        // history.go("user/"+house.user._id)
        history.push("user/"+house.user._id);
    }

    const hotels = () => {
        return  <Flex my={"2px"} justifyContent={"flex-end"} flexDirection={"column"} alignItems={"center"}>
            <Flex flexDirection={"column"} justifyContent={"flex-end"} alignItems={"center"}>
                <Img 
                objectFit={"cover"}
                w={"300px"}
                h={"200px"} 
                borderRadius={"10px"}
                src={house.img} 
                alt="" 
                />
                <Flex 
                boxShadow={"0px 0px 5px black"}
                borderRadius={"10px"}
                w={"200px"} 
                justifyContent={"space-around"} 
                alignItems={"center"}
                my={"10px"}
               >
                           <span>Created By</span> 
                            {house.user && <Link to={"/user/"+house.user._id}>
                            <Box 
                            w={"100px"}
                            display={"flex"} 
                            // onClick={()=>{goProfile(house.user._id)}}
                            justifyContent={"space-around"} 
                            border={"solid black 1px"}
                            alignItems={"center"}
                            borderRadius={"10px"}
                            my={"5px"}
                            _hover={{
                                boxShadow : "0px 0px 10px blue",
                                cursor : "pointer"
                            }}
                            >
                                {house.user.name} 
                                <Img 
                                src={house.user.img} 
                                objectFit={"cover"}
                                alt="" 
                                w={"35px"} 
                                h={"35px"}/>
                            </Box>
                            </Link>}
                           </Flex>
            </Flex>
            
                {house.user&&
                    <Box>
                <Flex w={"250px"} justifyContent={"start"} flexDirection={"column"} alignItems={"flex-start"} >
                    <Box><b>Price : </b>{house.price} S.R</Box>

                    <Flex justifyContent={"center"} alignItems={"center"}>
                       <b>Rate : </b>
                        {Array(5)
                        .fill('')
                        .map((_, i) => (
                        <FaStar
                        key={i}
                        color={i < house.rating ? 'gold' : 'gray.300'}
                        />
                        ))}
                    </Flex>
                </Flex>
                <Text> <b>description :</b> {house.description}</Text>
                </Box>
                            
                    }
        </Flex>
    }

    const booking = () => {
        return (
          <>
            <Flex 
            justifyContent={"center"} 
            flexDirection={"column"}
            my={"5px"}>
              <Input
              my={"5px"}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                type="date"
                name=""
                id=""
                placeholder="From"
                value={startDate}
              />
              <Input
              my={"5px"}
                onChange={(e) => {
                  setExpDate(e.target.value);
                }}
                type="date"
                name=""
                id=""
                value={expDate}
              />
              <Divider my={"5px"} />
              <Text my={"5px"}>
                <b>Service fee 8% : </b> {serviceFee} S.R
              </Text >
              <Text my={"5px"}>
                <b>Price Total :</b> {priceTotal} S.R
              </Text>
              <Button
              my={"5px"}
                onClick={() => {
                  addBooking();
                }}
                colorScheme={"facebook"}
              >
                Add Booking
              </Button>
            </Flex>
          </>
        );
    }

    const { isOpen, onToggle } = useDisclosure()

    const comments = ()=> {
        return <Flex flexDirection={"column"}>
            {
                    commentsArr.length ? 
                    <Flex flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    w={"100%"}
                    margin={"auto"}
                    >
                        {commentsArr.map((comment , i) => {
                        return (
                        <SlideFade 
                        offsetY='1400px'
                        rounded='md'
                        shadow='md'
                        in={true}
                        style={{width: "100%"}}
                        >
                          <Flex
                            key={i}
                            w={"100%"}
                            borderRadius={"10px"}
                            mt={"5px"}
                            bg={"blackAlpha.100"}
                          >
                              
                            <Flex flexDirection={"column"} w={"100%"}>
                              <Flex
                                alignItems={"center"}
                                justifyContent={"space-between"}
                              >
                                <Tag 
                                size='lg' 
                                colorScheme={"orange"}
                                borderRadius='full'
                                margin={"5px"}>
                                    <Link to={"/user/"+comment.user._id}>
                                    <Avatar
                                    // onClick={()=>{goProfile(comment.user._id)}}
                                    cursor={"pointer"}
                                    size="sm"
                                    name="Kent Dodds"
                                    margin={"5px"}
                                    src={comment.user.img}
                                    />{" "}
                                    </Link>
                                
                                <Flex
                                  justifyContent={"space-between"}
                                  flexDirection={"column"}
                                >
                                  <Flex 
                                  flexDirection={"row"} 
                                  w={"80px"}
                                  justifyContent={"space-around"}
                                  alignItems={"center"}
                                    >
                                    <Text fontWeight={"bold"}>
                                      {comment.user.name}
                                    </Text>
                                    <Text 
                                    color={"red.500"}
                                    fontSize={"14px"}>
                                      {comment.user.role === 0
                                        ? "admin"
                                        : "user"}
                                    </Text>
                                  </Flex>
                                </Flex>
                                </Tag>
                                <Flex alignItems={"center"}>
                                    {Array(5)
                                      .fill("")
                                      .map((_, i) => (
                                        <FaStar
                                          key={i}
                                          fontSize={"14px"}
                                          color={
                                            i < comment.rate
                                              ? "gold"
                                              : "gray.300"
                                          }
                                        />
                                      ))}
                                  </Flex>
                              </Flex>

                              <Flex
                                justifyContent={"center"}
                                alignItems={"center"}
                                margin={"5px"}
                                fontSize={"16px"}
                                fontWeight={"bold"}
                              >
                                {comment.text}
                              </Flex>
                            </Flex>
                            
                          </Flex>
                          </SlideFade>
                        );
                    })}
                    </Flex>
                    : 
            <Box 
            my={"5px"} 
            w={"100%"} 
            h={"100px"} 
            bg={"gray.100"} 
            border={"black"} 
            m={"auto"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}> 
                    <Text>No Comment</Text>
            </Box>
            }
            
            <Center w={"100%"} h={"50px"}>
                <Divider/>
            </Center>

            {toggleRating === true ?
            <Tooltip hasArrow label='Please Reting befor Add Comment' bg='red.500' isOpen placement='right'>
            <WrapItem w={"100px"}>
            <ReactStars
                count={5}
                onChange={ratingSet}
                size={24}
                activeColor="gold"
            />
            </WrapItem>
            </Tooltip>
            :
            <Box>
            <ReactStars
                count={5}
                onChange={ratingSet}
                size={24}
                activeColor="gold"
            />
            </Box>
           }

            {
            toggleComment === true ?
            <Tooltip hasArrow label='Fill in the coment more than 3 letters' bg='red.500' isOpen placement='top-end'>
           <Textarea onChange={(e)=>{setCommentText(e.target.value)}} my={"5px"} placeholder='Write Comment Here' value={commentText}/>
            </Tooltip>
            :
            <Textarea onChange={(e)=>{setCommentText(e.target.value)}} my={"5px"} placeholder='Write Comment Here' value={commentText}/>
           }
            
            <Button
            onClick={()=>{
                addComment();
                onToggle();
            }} 
            colorScheme = {"facebook"}
            boxShadow={"0px 0px 5px blue"} 
            mt={"10px"}
            disabled = {!commentIsDisabled}
            >{commentIsDisabled === false ? "wait after " + commentTimer + " sec" : "Add Comment"}</Button>
            
        </Flex>
    }


    return (
      <Container>
        <Tabs 
        isFitted 
        variant="enclosed" 
        my={"10px"} 
        boxShadow={"0px 0px 5px black"}
        >
          <TabList>
            <Tab  display={"flex"} alignItems={"center"} flexDirection={"column"}><FaHotel/> Hotel</Tab>
            <Tab  display={"flex"} alignItems={"center"} flexDirection={"column"}><FaRegCalendarCheck/> Book</Tab>
            <Tab  display={"flex"} alignItems={"center"} flexDirection={"column"}><FaRegCommentAlt/> Comments</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{hotels()}</TabPanel>
            <TabPanel>{booking()}</TabPanel>
            <TabPanel>{comments()}</TabPanel>
          </TabPanels>
        </Tabs>
        {/* <Box className="containerHouseSelect"> */}
        {/* <div id="toBooking">
                    <input onChange={(e)=>{setStartDate(e.target.value)}} type="date" name="" id="" placeholder="From"/>
                    <input onChange={(e)=>{setExpDate(e.target.value)}} type="date" name="" id="" 
                    placeholder="To"/>
                    <hr></hr>
                    <span><b>Service fee 8% : </b> {serviceFee} S.R</span>
                    <span><b>Price Total :</b> {priceTotal} S.R</span>
                    <button onClick={()=>{addBooking()}} id="bookingBtn">Add Booking</button>
                </div>  */}

        {/* <div id="houseSelect">
                    <div id="gridinfo39824">

                    <div id="imgSelect2319">
                        <img id="imgHouseSelect" src={house.img} alt="" />
                    </div>
                    </div>
                    <Flex justifyContent={"end"}>
                        
                        {house.user&&
                        <Box>
                            <Flex justifyContent={"center"} alignItems={"center"}>
                                    <b>User : </b>{house.user.name}
                                    <img src={house.user.img} alt="" width={"30"} height={"30"}/>
                            </Flex>
                            <Flex justifyContent={"center"} alignItems={"center"}>
                                    <p><b>Price : </b>{house.price} S.R</p>
                            </Flex>
                        </Box>
                            
                        }
                    </Flex>
                        
                   

                    <div id="description29369">
                        <p>{house.description}</p>
                    </div>

                    
                    
                </div> 

            </Box>

            <Box>
                    <Flex >

                    </Flex>

                    <Flex justifyContent={"center"} flexDirection={"column"}>
                        <div id="rate"></div>
                        <input onChange={()=>{}} type="text" placeholder="comments" />
                        <button onClick={()=>{}}>Add Comment</button>
                    </Flex>
            </Box> */}
      </Container>
    );
}
