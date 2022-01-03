import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { useHistory , useParams } from "react-router-dom";

export default function UserInfo({token , userId , serverUrl}) {
    const [showUser, setShowUser] = useState("")
    const {id} = useParams()

    useEffect(() => {
        axios.get(serverUrl + "/get-user-info/" + id, 
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            {showUser && <div>{showUser._id}</div>}
            {/* {id} */}
        </div>
    )
}
