import React , {useState , useEffect} from "react";
import { Button, ButtonGroup , Stack , Box , InputGroup ,Input  , InputLeftElement 
  , Center, Flex , Text} from '@chakra-ui/react'
  import Collapse from './Collapse'

export default function Home() {
  return (
    <Center>
      <Flex 
      flexDirection={"column"}
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          Welcome to Booking App
        </Text>

        <Collapse
        style={{height : "600px"}}
        />
      </Flex>
    </Center>
  );
}
