import React , {useState , useEffect} from 'react'
import axios from 'axios'

export default function Fav({token , serverUrl}) {
    const [fav, setFav] = useState([])

    useEffect(() => {
        axios.get(serverUrl + "/fav" , 
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => setFav(res.data))
        .catch(error => console.log(error))

        console.log(fav);
    }, [token])

    return (
        <div>
            {fav && fav.map((house , i) => {
                return <div>
                    <div>{house._id}</div>
                </div>
            })}
            fav
        </div>
    )
}
