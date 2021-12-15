import React , {useState , useEffect} from "react";
import { useHistory } from 'react-router-dom';
import { Input , Text ,InputLeftAddon ,useToast ,FormControl , InputGroup , InputLeftElement , Button , Select ,Center , Flex ,Box  , FormLabel} from "@chakra-ui/react";
import axios from "axios";
import "../style.css"

export default function AddHouse() {
    const [inputName, setInputName] = useState("")
    const [inputCity, setInputCity] = useState("")
    const [inputRooms, setInputRooms] = useState("")
    const [guests, setGuests] = useState("")
    const [img, setImg] = useState("")
    const [description, setDescription] = useState("")
    const [city, setCity] = useState("")


   


    return (
        <div className="container py-5">
            <FormControl width={"400px"} margin={"auto"} >
                <FormLabel >City : </FormLabel>
                <Select onChange={(e)=>{setInputCity(e.target.value)}} placeholder='Select City' className="px-5">
                    <option value='Ryadh'>Riyadh</option>
                    <option value='Jeddah'>Jeddah</option>
                    <option value='Dammam'>Dammam</option>
                    <option value='Aljubil'>Aljubil</option>
                </Select>

                <InputGroup marginTop={"5px"}>
                <InputLeftElement
                pointerEvents='none'
                />
                <FormLabel >Image upluad</FormLabel>
                <Input name="inputImgUpload" type="file" placeholder='Upload Image' onChange={(e)=>{}}/>
                </InputGroup>

                <FormLabel>Rooms</FormLabel>
                    <Select onChange={(e)=>{setInputRooms(e.target.value)}} name="" id="">
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                     </Select>
                </FormControl>
        </div>
        
    )
}
