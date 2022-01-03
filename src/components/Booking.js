import React , {useState , useEffect} from "react";
import { useHistory , useParams } from "react-router-dom";
import axios from "axios";
import {Button , Box , Flex , Container , Image , Divider ,Center , 
    StatLabel , StatNumber , StatHelpText ,Stat,Text} from "@chakra-ui/react";
import {FaMoneyBillWave} from "react-icons/fa";

import "../styles/Booking.css"

export default function Booking({token , serverUrl}) {
    const [tickets, setTickets] = useState("")
    
    useEffect(() => {
            axios.get(serverUrl+"/booking/" , {headers: { authorization: `Bearer ${token}` }})
            .then(res => {
                console.log(res.data);
                setTickets(res.data)
               
            })
            .catch(err => console.log(err))

    }, [token])

    const payment = async () => {

    }

    const cancelBooking = (id) => {
        axios.delete(`${serverUrl}/booking/${id}`,
            {headers: { authorization: `Bearer ${token}` }}).then(res => {
                setTickets(res.data);
            }).catch(err => {
                console.log(err);
            })
    }

    

    const bookingGUI = ()=> {
        return <Box m={"10px"} bg={"white"}>
        {tickets && tickets.map((elem , index)=> {
            return (
              <Flex
                borderRadius={"5px"}
                boxShadow={"0px 0px 5px black"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                my={"10px"}
              >
                <Flex flexDirection={"column"} m = {"5px"}>
                  <Image
                    boxSize="150px"
                    objectFit="cover"
                    src={elem.house.img}
                    alt="hotel image"
                  />
                </Flex>

                <Stat mx={"5px"}>
                  <StatLabel>Collected Fees</StatLabel>
                  <StatNumber fontSize={"20px"}>S.R {elem.priceTotal}.00</StatNumber>
                  <StatHelpText>{elem.startDate} - {elem.expiryDate}</StatHelpText>
                </Stat>

                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  w={"150px"}
                >
                  <Center height="150px">
                    <Divider orientation="vertical" />
                  </Center>

                  <Flex flexDirection={"column"} w={"95px"}>
                    <Button
                      w={"100px"}
                      margin={"5px"}
                      colorScheme={"green"}
                      onClick={() => {
                        payment();
                      }}
                      leftIcon={<FaMoneyBillWave />}
                      my={"2px"}
                    >
                      PAY
                    </Button>

                    <Button
                      w={"100px"}
                      margin={"5px"}
                      colorScheme={"red"}
                      onClick={() => {
                        cancelBooking(elem._id);
                      }}
                    >
                      CANCLE
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            );
        })}       
        </Box>
    }

    return (
        <Center
        w={"600px"}
        h={"250px"}
        m={"auto"}
        bg={"#EDF2F7"}
        my={"15px"}
        >
            {tickets.length 
            ? 
            bookingGUI() 
            : 
            <Text fontSize={"19px"}>No Have Booking</Text>}

            {/* {tickets && tickets.map((elem , index)=> {
                return <div id="booking-box">
                        <img id="booking-img" src={elem.house.img} alt="" />
                        
                        <div id="booking-info">
                            <h3>{elem.house.name}</h3>
                            <span>price : {elem.priceTotal} S.R</span>
                            <span>from : {elem.startDate}</span>
                            <span>to :{elem.expiryDate}</span>
                            <div>
                            <Button 
                            onClick={()=>{payment()}} 
                            bg={"green"} 
                            _hover={{ bg: 'black' , color: "white"}} >PAY
                            </Button> 

                            <Button 
                            onClick={()=>{cancelBooking(elem._id)}} 
                            bg={"red"} 
                            marginLeft={"3px"}
                            _hover={{ bg: 'black' , color: "white"}}
                            >CANCEL</Button>
                            </div>
                        </div>

                        
                        
                        
                   </div>
                
            })} */}
        </Center>
    )
}
