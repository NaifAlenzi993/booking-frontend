import React , {useState , useEffect} from "react";
import { useHistory , useParams } from "react-router-dom";
import axios from "axios";

export default function HouseSelect({token}) {
    const [house, setHouse] = useState({})
    const { id } = useParams()

    useEffect(() => {
        axios.get("http://localhost:5000/house/" + id , 
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => {
            setHouse(res.data[0])
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }, [token])

    return (
        <div>
            <div className="containerHouseSelect">

                <div id="houseSelect">
                    <img src={house.img} alt="" />

                </div>

                <div id="booking">

                </div> 

            </div>
        </div>
    )
}
