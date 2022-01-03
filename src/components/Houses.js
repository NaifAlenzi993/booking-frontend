import React , {useState , useEffect} from "react";
import { Spinner , Box  , Image , Center ,Flex , Modal ,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton} from "@chakra-ui/react";
import { FaStar , FaHeart , FaRegEye , FaWindowClose } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../style.css"
import style from '../styles/Houses.module.css'

export default function Houses({token , serverUrl , role , userId}) {

    const [houses, setHouses] = useState([])
    const [fav, setFav] = useState([])
    const [toggleSpiinner, setToggleSpiinner] = useState(false)

    const history = useHistory()

    

    useEffect(() => {
        setToggleSpiinner(true)
        axios.get(serverUrl + "/houses" ,  
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => {
            setToggleSpiinner(false)
            setHouses(res.data)
        }).catch(err => console.log(err))

        axios.get(serverUrl+"/fav" , 
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

    const showHouseById = (id)=>  {
        if (token){
            history.push("/house/" + id)
        }else{
            
        }
    }

    const deleteHouse = (id)=>{
        axios.delete(serverUrl + "/house/" + id , 
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => setHouses(res.data))
        .catch(err => console.log(err))

        
    }

    
    const renderHouses = ()=> {
        return (
            houses.map((elem,i) => {
                return <Box key= {i} id="box-houses" maxW='sm' borderWidth='1.5px' borderRadius='lg' overflow='hidden'>
                    <div id="img-house">
                        <Image onClick={()=>{showHouseById(elem._id)}} id="img-responsive" src={elem.img} alt=""/>
                        <span style={{fontSize : "19px"}}>{elem.name}</span>
                        {heartFav(elem._id)} 
                        {
                            role === 0 || userId === elem.user._id && token !== ""  ?
                            <FaWindowClose id="deleteHouse"  onClick={()=>{deleteHouse(elem._id)}}/>
                            :
                            ""
                        }
                        
                    </div>

                    <div id="info-house">
                        <p style={{fontSize : "12px" , color : "gray" , display : "flex"}}>
                            {elem.city} . {elem.rooms} rooms  .
                            {elem.beds} beds. {elem.baths} baths   
                        </p>

                        <Box id="viewDiv" width={"50px"}>
                        {<FaRegEye/>} <span style={{fontSize : "15px"}}>{" " + elem.views}</span> 
                        </Box>
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

    const spiinner = () => {
        return (
            <> 
            <Flex justifyContent={"center"} alignItems={"center"}>
            <Center mt="3rem" display={"flex"} justifyContent={"center"}>
            <Spinner width="10rem" height="10rem" margin={"auto"}/>
            </Center>
            </Flex>
            </>
        )
    }

    return (
        <div>
        {toggleSpiinner ? 
            spiinner()
        :
        <div id = "container-houses">
            {renderHouses()}  
        </div>
         }
    </div>
    )
}


