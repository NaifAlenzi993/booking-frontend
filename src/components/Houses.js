import React , {useState , useEffect} from "react";
import { Spinner , Box  , Image , Center ,Flex} from "@chakra-ui/react";
import { FaStar , FaHeart } from "react-icons/fa";
import { useHistory , useParams } from "react-router-dom";
import axios from "axios";
import "../style.css"
import style from '../styles/Houses.module.css'

export default function Houses({token}) {

    const [houses, setHouses] = useState([])
    const [fav, setFav] = useState([])
    const [toggleSpiinner, setToggleSpiinner] = useState(false)

    const history = useHistory()

    useEffect(() => {
        setToggleSpiinner(true)
        axios.get("http://localhost:5000/houses" ,  
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => {
            setToggleSpiinner(false)
            setHouses(res.data)
        }).catch(err => console.log(err))

        axios.get("http://localhost:5000/fav" , 
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => {
            setFav(res.data)
        })
        .catch(err => console.log(err))
    }, [token])



    const addToFav =  (id) => {
        // console.log(fav , "state Fav");
        axios.post("http://localhost:5000/fav" , 
        {house : id} ,
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => {
            setFav(res.data)
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }

    const heartFav = (id)=> {
        for (let i = 0; i < fav.length; i++) {
            if (fav[i].house._id === id) {
                return <>
                <FaHeart style={{color:"red"}} onClick={()=>{addToFav(id)}} id="icon-fav"/>
                </>
            }
        }
        return <>
        <FaHeart style={{color:"white"}} onClick={()=>{addToFav(id)}} id="icon-fav"/>
        </>
    }
    

    const renderHouses = ()=> {
        return (
            houses.map((elem,i) => {
                return <Box key= {i} id="box-houses" maxW='sm' borderWidth='1.5px' borderRadius='lg' overflow='hidden' >
                    
                    <div id="img-house">
                        <Image onClick={()=>{history.push("/house/" + elem._id)}} id="img-responsive" src={elem.img} alt=""/>
                        <span style={{fontSize : "19px"}}>{elem.name}</span>

                        {heartFav(elem._id)}
                        
                    </div>
                    <div id="info-house">
                        <p style={{fontSize : "12px" , color : "gray"}} >
                            {elem.city} . {elem.rooms} rooms  .
                            {elem.beds} beds. {elem.baths} baths
                        </p>
                    </div>

                    <span className={style.pricehouse}>{elem.price} S.R</span>
                        
                    <div id="stars-rate">
                    {Array(5)
                    .fill('')
                    .map((_, i) => (
                    <FaStar
                    key={i}
                    color={i < elem.rating ? 'gold' : 'gray.300'}
                    />
                    ))}
                    </div>
                   
                </Box>
            })
        )
    }

    return (
        <div>
        {toggleSpiinner ? 
       
         <Flex justifyContent={"center"} alignItems={"center"}>
         <Center mt="3rem" display={"flex"} justifyContent={"center"}>
             <Spinner width="10rem" height="10rem" margin={"auto"}/>
         </Center>
         </Flex>
         :
        <div id = "container-houses">
            {renderHouses()}  
        </div>
         }
    </div>
    )
}


