import React , {useState , useEffect} from "react";
import { useHistory , useParams } from "react-router-dom";
import axios from "axios";

import "../styles/houseSelect.css"

export default function HouseSelect({token , userId}) {
    const [house, setHouse] = useState({})
    const [startDate, setStartDate] = useState("")
    const [expDate, setExpDate] = useState("")
    const [priceTotal, setPriceTotal] = useState(0)
    const [serviceFee, setServiceFee] = useState(0)
    const { id } = useParams()

    useEffect(() => {
        axios.get("http://localhost:5000/house/" + id , 
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => {
            setHouse(res.data[0]);
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }, [token])

    const addBooking = () => {
        axios.post("http://localhost:5000/booking/" , 
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

   

    return (
        <div>
            <div className="containerHouseSelect">

                <div id="toBooking">
                    <input onChange={(e)=>{setStartDate(e.target.value)}} type="date" name="" id="" placeholder="From"/>
                    <input onChange={(e)=>{setExpDate(e.target.value)}} type="date" name="" id="" 
                    placeholder="To"/>
                    <hr></hr>
                    <span><b>Service fee 8% : </b> {serviceFee} S.R</span>
                    <span><b>Price Total :</b> {priceTotal} S.R</span>
                    <button onClick={()=>{addBooking()}} id="bookingBtn">Add Booking</button>
                </div> 

                <div id="houseSelect">
                    <div id="gridinfo39824">

                    <div id="imgSelect2319">
                        <img id="imgHouseSelect" src={house.img} alt="" />
                    </div>
                    </div>
                    <div id="infoHouse847938">
                        <p><b>Price : </b>{house.price} S.R</p>
                        <p><b>User : </b>{house.user&&house.user.name}</p>
                    </div>
                   

                    <div id="description29369">
                        <p>{house.description}</p>
                    </div>

                    <div id="show-comments">

                    </div>

                    <div id="comments-div">
                        <div id="rate"></div>
                        <input onChange={()=>{}} type="text" placeholder="comments" />
                        <button onClick={()=>{}}>Add Comment</button>
                    </div>
                    
                </div> 

            </div>
               
        </div>
    )
}
