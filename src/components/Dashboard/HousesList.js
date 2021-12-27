import React , {useState , useEffect}from 'react'
import axios from 'axios'

export default function HousesList({serverUrl , token}) {
    const [houseArr, setHouseArr] = useState([])

    useEffect(() => {
        axios.get(serverUrl + "/house" , 
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => setHouseArr(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            HouseList
        </div>
    )
}
