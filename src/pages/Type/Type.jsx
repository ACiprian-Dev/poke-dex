import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { typeDescriptions } from '../../shared/helpers'
import grass from '../../images/grass.svg'
import poison from '../../images/poison.svg'
import water from '../../images/water.svg'
import bug from '../../images/bug.svg'
import electric from '../../images/electric.svg'
import fairy from '../../images/fairy.svg'
import fire from '../../images/fire.svg'
import flying from '../../images/flying.svg'
import ground from '../../images/ground.svg'
import normal from '../../images/normal.svg'
import steel from '../../images/steel.svg'
import psychic from '../../images/psychic.svg'
import fighting from '../../images/fighting.svg'
import rock from '../../images/rock.svg'
import ice from '../../images/ice.svg'
import ghost from '../../images/ghost.svg'
import dragon from '../../images/dragon.svg'
import dark from '../../images/dark.svg'
import Card from '../../components/Cards/Card';


function Type() {

  const { type } = useParams();
  const [pokemons, setPokemons] = useState([])
  const [auxPokemons, setAuxPokemons] = useState([]);
  const [url, setUrl] = useState(`https://pokeapi.co/api/v2/type/${type}`);
  let filter = 'nothing';
  const { data } = useFetch(url);
  const icons = [bug, electric, fairy, fire, flying, grass, ground, normal, poison, water, steel, psychic, fighting, rock, ice, ghost, dragon, dark];
  const iconsString = ["bug", "electric", "fairy", "fire", "flying", "grass", "ground", "normal", "poison", "water", "steel", "psychic", "fighting", "rock", "ice", "ghost", "dragon", "dark"]

  const getPokes = (url) => {
    if (url)
      return axios.get(url)
    return null
  }

  useEffect(async () => {
    if (data) {

      let cevaaux= [];

      for(const poke of data.pokemon) {
        const response = await getPokes(poke.pokemon.url)
        cevaaux.push(response.data)
      }
      console.log(cevaaux)
      setPokemons(cevaaux) 
      setAuxPokemons(cevaaux) 




      // console.log(data)
      // const promises = data.results.map((result) => axios.get(result.url));
      // const resolved = await Promise.all(promises);
      // let aux = [];
      
      // aux = [...aux, ...resolved.map((answer) => aux.includes(answer.data) ? null : answer.data)]
    
      // setPokemons([...pokemons, ...aux])
      // setAuxPokemons([...auxPokemons, ...aux])
      // aux = filterPokemons(aux, type)
      // console.log(aux)
      // setPokemons(aux)
      // setAuxPokemons(aux)
    }
  }, [data]);

  return (
    <div>
      <Box >
        <Heading mt="20px" mb="20px">Description</Heading>
        <Box p="20px" m="40px" className={`card ${type}`}>
          <Text mt="16px" mb="16px">{typeDescriptions[`${type}`]}</Text>
        </Box>
      </Box>
      <Box >
        <Heading mt="20px" mb="20px">Pokemons with this type: {auxPokemons.length}</Heading>
        <Flex wrap="wrap" mt={5}>
        { auxPokemons ? 
          auxPokemons.map(pokemon => (

            <Card key={pokemon.id} styleClass={type} pokemon={pokemon} icon1={icons[iconsString.indexOf(pokemon.types[0].type.name)]} icon2={pokemon.types[1] ? icons[iconsString.indexOf(pokemon.types[1].type.name)] : null} ></Card>

          )) : <Text>Loading...</Text>}
      </Flex>
      </Box>
    </div>
  )
}

export default Type