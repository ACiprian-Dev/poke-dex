import { Box, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import TypeTag from '../../components/Tags/TypeTag';
import { useFetch } from '../../hooks/useFetch';
import NotFound from '../404/NotFound';
import { capitalizeFirstLetter, typeDescriptions } from '../../shared/helpers';
import { getIcon } from '../../shared/icons';

function Pokemon() {

  const [pokemon, setPokemon] = useState();
  const { id } = useParams();

  const { data } = useFetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const species = useFetch(`https://pokeapi.co/api/v2/pokemon-species/1`).data;

  console.log(data);
  console.log(species)

  // useEffect(async () => {
  //   if (data) {
  //     const promises = data.results.map((result) => axios.get(result.url));
  //     const resolved = await Promise.all(promises);
  //     setPokemon(resolved[0].data)
  //     console.log(data);
  //   }
  // }, [data]);






  if (Number.isNaN(+id) || Number(id) < 1 || Number(id) > 811) {
    return <NotFound />;
  }





  return (
    <div>
      { data ? (
        <Flex width="1080px" direction="column">
          <Flex justifyContent="center" direction="column">
            <Flex direction="column">
              <Flex>
                <Stack mr="auto">
                  <Heading>{capitalizeFirstLetter(data.name)}</Heading>
                  <Text fontFamily="Space Mono">#{data.id}</Text>
                </Stack>
                <TypeTag type={capitalizeFirstLetter(data.types[0].type.name)} typeDescription={typeDescriptions[data.types[0].type.name]} icon={getIcon(data.types[0].name)}></TypeTag>

                {data.types[1] ? <TypeTag type={capitalizeFirstLetter(data.types[0].type.name)} typeDescription={typeDescriptions[data.types[0].type.name]} icon={getIcon(data.types[0].name)}></TypeTag> : null}
              </Flex>
            </Flex>
            <Image boxSize="400px" src={`${data.sprites.other['official-artwork'].front_default}`}></Image>
            <Flex></Flex>
          </Flex>
        </Flex>
      ) : <Text>Loading...</Text>
      }
    </div>
  )
}

export default Pokemon;