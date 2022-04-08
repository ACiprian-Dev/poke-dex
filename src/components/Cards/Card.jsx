import { SimpleGrid, Box, Stack, Heading, Flex, Spacer, Center, Image, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Tooltip, PopoverHeader, Text, PopoverFooter, Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';
import TypeTag from '../Tags/TypeTag';
import {capitalizeFirstLetter, typeDescriptions} from '../../shared/helpers'

function Card({ pokemon, icon1, icon2, styleClass }) {

  return (
    <div>
      <Link key={pokemon.id * 5000} to={`/${pokemon.id}`}>
        <Box p="20px" h="225px" w="300px" m={4} className={`card ${styleClass}`} >
          <Stack>
            <Flex color="white">
              <Heading size={4}>{capitalizeFirstLetter(pokemon.name)}</Heading>
              <Spacer></Spacer>
              <Heading size={4}>#{pokemon.id}</Heading>
            </Flex>
            <Flex justifyContent="space-between" align="center">
              <Box mt="20px" direction="column" justifyContent="center">
                <TypeTag type={capitalizeFirstLetter(pokemon.types[0].type.name)} typeDescription={typeDescriptions[pokemon.types[0].type.name]} icon={icon1}></TypeTag>

                {pokemon.types[1] ? <TypeTag type={capitalizeFirstLetter(pokemon.types[1].type.name)} typeDescription={typeDescriptions[pokemon.types[1].type.name]} icon={icon2}></TypeTag> : null}

              </Box>
              <Box mt="20px">
                <Image src={`${pokemon.sprites.other['official-artwork'].front_default}`} boxSize='120px'></Image>
              </Box>
            </Flex>
          </Stack>
        </Box>
      </Link>
    </div>
  )
}

export default Card