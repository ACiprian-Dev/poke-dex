import { SimpleGrid, Box, Stack, Heading, Flex, Spacer, Center, Image } from '@chakra-ui/react'
import React from 'react'

function Card({pokemon, icon1, icon2}) {

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } 

  return (
    <div>
      <Box p="20px" h="225px" w="300px" m={4} className={`card ${pokemon.types[0].type.name}`} >
            <Stack>
              <Flex color="white">
                <Heading size={4}>{capitalizeFirstLetter(pokemon.name)}</Heading>
                <Spacer></Spacer>
                <Heading size={4}>#{pokemon.id}</Heading>
              </Flex>
              <Flex justifyContent="space-between" align="center">
                <Box mt="20px" direction="column" justifyContent="center">
                  <Center className="icon-container" borderRadius="4px" pt="5px" pb="5px" h="34px" pr="10px" pl="10px" bg="white" mb={2.5}> <span className="icon"><img src={icon1} alt="" /></span> {capitalizeFirstLetter(pokemon.types[0].type.name)}</Center>

                  {pokemon.types[1] ? <Center className="icon-container" borderRadius="4px" h="34px" pt="5px" pb="5px" pr="10px" pl="10px" bg="white"> <span className="icon"><img src={icon2} alt="" /></span> {capitalizeFirstLetter(pokemon.types[1].type.name)}</Center> : null}
                  
                </Box>
                <Box mt="20px">
                  <Image src = {`${pokemon.sprites.other['official-artwork'].front_default}`} boxSize='120px'></Image>
                </Box>
              </Flex>
            </Stack>
          </Box>
    </div>
  )
}

export default Card