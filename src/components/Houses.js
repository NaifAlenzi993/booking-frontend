import React , {useState , useEffect} from "react";
import { Spinner , Box  , Image , Center ,Flex , Modal ,Grid ,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton , 
    InputLeftElement,
    InputGroup,

    Input,
    } from "@chakra-ui/react";
    
import { FaStar , FaHeart , FaRegEye , FaWindowClose ,FaSistrix } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../style.css"
import style from '../styles/Houses.module.css'

export default function Houses({token , serverUrl , role , userId}) {

    const [houses, setHouses] = useState([])
    const [buckup, setBuckup] = useState([])
    const [fav, setFav] = useState([])
    const [toggleSpiinner, setToggleSpiinner] = useState(false)
    const [search, setSearch] = useState("")

    const history = useHistory()

    

    useEffect(() => {
        setToggleSpiinner(true)
        axios.get(serverUrl + "/houses" ,  
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => {
            setToggleSpiinner(false)
            setHouses(res.data)
        }).catch(err => console.log(err))

        axios.get(serverUrl + "/fav" , 
        {headers: { authorization: `Bearer ${token}` }})
        .then(res => {
            setFav(res.data)
        })
        .catch(err => console.log(err))
    }, [token])


    



    const addToFav =  (id) => {
        // console.log(fav , "state Fav");
        axios.post(serverUrl + "/fav" , 
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

    const searchHouse = (Text) => {
        if (Text.length > 1 ) {
            if (!buckup.length) setBuckup(houses)
            const cpyArr = [...houses]
            const searchArr = cpyArr.filter((elem , i)=>{
                return elem.name.toLowerCase().includes(Text.toLocaleLowerCase())
            })  
            setHouses(searchArr)
        }else if (Text.length === 0){
            setHouses(buckup)
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
                return <Box key= {i} 
                id="box-houses" 
                // maxW='sm' 
                borderWidth='1.5px' 
                borderRadius='lg'
                _hover={
                    {
                        boxShadow : "0px 0px 10px black"
                    }
                } 
                overflow='hidden'
                w={[280 , 200 , 330]}
                margin={"auto"}
                >
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
      <Flex 
        flexDirection={"column"}
      >
        <InputGroup
            w={[250 , 400]}
            margin={"auto"}
            my={"20px"}>
          <InputLeftElement
            pointerEvents="none"
            children={<FaSistrix color="gray.300" />}
          />
          <Input
            type="tel"
            placeholder="Search Hotel"
            onChange={(e) => {
              searchHouse(e.target.value);
            }}
          />
        </InputGroup>

        <Box
        w={"90%"}
        m={"auto"}
        display={"flex"}
        justifyContent={"center"}
        >
          {toggleSpiinner ? (
            spiinner()
          ) : (
            <Grid  
            templateColumns={
                {lg : 'repeat(3, 320px)' , md : 'repeat(2, 320px)' ,sm :'repeat(1, 200px)' }
            }
            gap={2}
            m={"5px"}
            margin={"auto"}
            >
                {renderHouses()}
            </Grid >
          )}
        </Box>
      </Flex>
    );
}


