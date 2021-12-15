import React , {useState , useEffect} from "react";
import { Spinner , Box  , Image , Center ,Flex} from "@chakra-ui/react";
import { FaStar , FaHeart } from "react-icons/fa";
import { useHistory , useParams } from "react-router-dom";
import axios from "axios";
import "../style.css"
import style from '../styles/Houses.module.css'

export default function Houses({token}) {

    const [houses, setHouses] = useState([])
    const [toggleSpiinner, setToggleSpiinner] = useState(false)

    const history = useHistory()

    useEffect(() => {
        setToggleSpiinner(true)
       axios.get("http://localhost:5000/houses" ,  
       {headers: { authorization: `Bearer ${token}` }})
       .then(res => {
        setTimeout(()=>{
            setToggleSpiinner(false)
            setHouses(res.data)
        } , 1000)
            
          
    })
       .catch(err => console.log(err))
    }, [token])


    

    const renderHouses = ()=> {
        return (
            houses.map((elem,i) => {
                return <Box id="box-houses" maxW='sm' borderWidth='1.5px' borderRadius='lg' overflow='hidden' >
                    
                    <div id="img-house">
                        <Image onClick={()=>{history.push("/house/" + elem._id)}} id="img-responsive" src={elem.img} alt=""/>
                        <span style={{fontSize : "19px"}}>{elem.name}</span>

                        <FaHeart id="icon-fav"/>
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


