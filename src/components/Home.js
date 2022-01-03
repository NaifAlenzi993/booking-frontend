import React , {useState , useEffect} from "react";
import { Button, ButtonGroup , Stack , Box , InputGroup ,Input  , InputLeftElement , Center, Flex} from '@chakra-ui/react'

export default function Home() {
  return (
    <Center>
    <Flex>  
        <InputGroup marginTop={"5px"}>
            <InputLeftElement
            pointerEvents='none'
            />
            <Input type="text" placeholder='City' onChange={(e)=>{}}/>
         </InputGroup>

         <InputGroup marginTop={"5px"}>
            <InputLeftElement
            pointerEvents='none'
            />
            <Input type="text" placeholder='City' onChange={(e)=>{}}/>
         </InputGroup>

        
    </Flex>
    </Center>
  );
}
