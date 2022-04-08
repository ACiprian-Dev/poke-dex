import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import flute from '../../images/pokeflute_404.png'
import snorlax from '../../images/snorlax_404.png'
import './NotFound.css'

export default function NotFound() {
  return (
    <Flex h="100vh" direction="column" justifyContent="center" alignItems="center">
      <Text>Hi! I'm Snorlax. I'm blocking the path.</Text>
      <Image src={snorlax} w="500px" m="40px"></Image>
      <Flex alignItems="center" ><Text>Click <Link className="link" to="/">here</Link> to go back!</Text> <Image src={flute} h="fit-content" maxW="20px" pl="5px"></Image></Flex>
    </Flex>
  )
}
