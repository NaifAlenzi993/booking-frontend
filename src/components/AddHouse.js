import React , {useState , useEffect} from "react";
import { useHistory } from 'react-router-dom';
import { Input , Text , InputLeftAddon , useToast ,FormControl , InputGroup , InputLeftElement , Button , Select , Center , Flex , Box  , FormLabel , Slider , Alert , AlertIcon, AlertTitle , 
SliderTrack, AlertDescription, CloseButton,
SliderFilledTrack,
SliderThumb,} from "@chakra-ui/react";
import axios from "axios";
import "../style.css"

export default function AddHouse({token}) {
    const [inputName, setInputName] = useState("")
    const [price, setPrice] = useState("100")
    const [inputCity, setInputCity] = useState("")
    const [inputRooms, setInputRooms] = useState("1")
    const [guests, setGuests] = useState("1")
    const [img, setImg] = useState("")
    const [beds, setBeds] = useState("1")
    const [baths, setBaths] = useState("1")
    const [description, setDescription] = useState("")

    const [type, setType] = useState("")

    const [msgWarining, setMsgWarining] = useState("")


    const readFromPat = async (e)=> {
        getBase64(e.target.files[0]) 
    }
  
      function getBase64(fileinfo) {
          const reader = new FileReader();
          reader.readAsDataURL(fileinfo);
          reader.onload = () => {
            setImg(reader.result)
          };
          reader.onerror = (error) => {
            console.log('Error: ', error);
          };
       }

       const addHouse = async () => {
           try {
            const response = await axios.post("http://localhost:5000/houses" , 
            {   name : inputName,
                price : price,
                city : inputCity,
                rooms : inputRooms,
                guests : guests,
                img : img,
                beds : beds,
                baths : baths,
                description : description ,
                typeHouse : type},
            {headers: { authorization: `Bearer ${token}` }})
            // console.log(response);
             setMsgWarining(response.data)
             setTimeout(()=>{
                 setMsgWarining("")
             } , 2500)
             window.scrollTo(0, 0)
           } catch (error) {
               console.log(error);
           }
       }


    return (
        <div className="container py-5 border">

            <Center width={"100%"}>{msgWarining && <Alert status='success'>
            <AlertIcon />
            {msgWarining}
             </Alert>}</Center>

            
        
            
            <FormControl width={"400px"} margin={"auto"} >

            <InputGroup marginTop={"5px"}>
            <Input type="text" placeholder='Name House' onChange={(e)=>{setInputName(e.target.value)}}/>
            </InputGroup>

            <InputGroup marginTop={"5px"}>
            <Input type="text" placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}}/>
            </InputGroup> 
            <br />
            <Box>
            <Slider onChange={(e)=>{setPrice(e)}} defaultValue={100} min={0} max={1400} >
                    <SliderTrack  bg='red.100'>
                        <Box position='relative' right={10} />
                        <SliderFilledTrack bg='tomato' />
                    </SliderTrack>
                    <SliderThumb boxSize={4} />   
            </Slider>

            <FormLabel >{price} S.R</FormLabel>
            <hr />
            </Box>
            
                <FormLabel >City : </FormLabel>
                <Select onChange={(e)=>{setInputCity(e.target.value)}} placeholder='Select City' className="px-5">
                    <option value='Ryadh'>Riyadh</option>
                    <option value='Jeddah'>Jeddah</option>
                    <option value='Dammam'>Dammam</option>
                    <option value='Aljubil'>Aljubil</option>
                </Select>


                <InputGroup marginTop={"5px"}>
                <FormLabel >Image</FormLabel>
                <Input name="inputImgUpload" type="file" placeholder='Upload Image' onChange={readFromPat}/>
                </InputGroup>

                <FormLabel >Type House : </FormLabel>
                <Select onChange={(e)=>{setType(e.target.value)}} placeholder='Select City' className="px-5">
                    <option value='room'>room|غرفة</option>
                    <option value='apartment'>apartment|شقة</option>
                    <option value='tents'>tents|خيام</option>
                    <option value='houses'>houses|بيوت</option>
                </Select>

                <FormLabel>Rooms</FormLabel>
                    <Select onChange={(e)=>{setInputRooms(e.target.value)}} name="" id="">
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                     </Select>

                     <FormLabel>guests</FormLabel>
                    <Select onChange={(e)=>{setGuests(e.target.value)}} name="" id="">
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                     </Select>

                     <FormLabel>beds</FormLabel>
                    <Select onChange={(e)=>{setBeds(e.target.value)}} name="" id="">
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                     </Select>
                     
                     <FormLabel>baths</FormLabel>
                    <Select onChange={(e)=>{setBaths(e.target.value)}} name="" id="">
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                     </Select>


                    <br />
                     <Button onClick={addHouse}>Add House</Button>

                </FormControl>


        </div>
        
    )
}
