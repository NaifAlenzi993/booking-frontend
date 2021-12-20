import React , {useState , useEffect} from "react";
import { useHistory , useParams } from "react-router-dom";
import axios from "axios";
import {Button} from "@chakra-ui/react";

import "../styles/Booking.css"

export default function Booking({token}) {
    const [tickets, setTickets] = useState("")
    
    useEffect(() => {
            axios.get("http://localhost:5000/booking/" , {headers: { authorization: `Bearer ${token}` }})
            .then(res => {
                console.log(res.data);
                setTickets(res.data)
               
            })
            .catch(err => console.log(err))

    }, [token])

    const payment = async () => {

    }

    const cancelBooking = (id) => {
        axios.delete(`http://localhost:5000/booking/${id}`,
            {headers: { authorization: `Bearer ${token}` }}).then(res => {
                setTickets(res.data);
            }).catch(err => {
                console.log(err);
            })

        
       
    }

    return (
        <div>
            {tickets && tickets.map((elem , index)=> {
                return <div id="booking-box">
                        <img id="booking-img" src={elem.house.img} alt="" />
                        
                        <div id="booking-info">
                            <h3>{elem.house.name}</h3>
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

                        
                        
                        {/* <h1>{token}</h1> */}
                   </div>
                
            })}
        </div>
    )
}
