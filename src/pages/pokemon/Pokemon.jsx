import { Box, Flex, Grid, Heading, Image, Progress, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import TypeTag from '../../components/Tags/TypeTag';
import { useFetch } from '../../hooks/useFetch';
import NotFound from '../404/NotFound';
import { capitalizeFirstLetter, typeDescriptions } from '../../shared/helpers';
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
import { ArrowRightIcon } from '@chakra-ui/icons';

function Pokemon() {

  const { id } = useParams();

  const { data } = useFetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const species = useFetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).data;
  const [evolutions, setEvolutions] = useState([]);
  const [pokemons, setPokemons] = useState([]);

  const icons = [bug, electric, fairy, fire, flying, grass, ground, normal, poison, water, steel, psychic, fighting, rock, ice, ghost, dragon, dark];
  const iconsString = ["bug", "electric", "fairy", "fire", "flying", "grass", "ground", "normal", "poison", "water", "steel", "psychic", "fighting", "rock", "ice", "ghost", "dragon", "dark"]

  const getEvoChain = (species) => {
    if (species.evolution_chain.url)
      return axios.get(species.evolution_chain.url)
    return null
  }

  const getAllEvolutions = (chain) => {
    if (chain) {
      let aux = [[]];
      chain.evolves_to.forEach(evolution => {
        let obj = {
          id: chain.species.url.split('/')[6],
          trigger: chain.evolution_details[0] ? chain.evolution_details[0].trigger.name : null,
          species: chain.species.name
        }

        let obj2 = evolution ? {
          id: evolution.species.url.split('/')[6],
          trigger: evolution.evolution_details[0] ? evolution.evolution_details[0].trigger.name : null,
          species: evolution.species.name
        } : null

        let obj3 = chain.evolves_to[0].evolves_to[0] ? {
          id: chain.evolves_to[0].evolves_to[0].species.url.split('/')[6],
          trigger: chain.evolves_to[0].evolves_to[0].evolution_details[0] ? chain.evolves_to[0].evolves_to[0].evolution_details[0].trigger.name : null,
          species: chain.evolves_to[0].evolves_to[0].species.name
        } : null

        aux.unshift([...obj ? [obj] : [],
        ...obj2 ? [obj2] : [],
        ...obj3 ? [obj3] : []
        ])
        // chain = chain.evolves_to;
      });
      aux.pop();
      return aux;
    }
    return null
  }

  const getPokes = (url) => {
    if (url)
      return axios.get(url)
    return null
  }

  useEffect(async () => {

    if (species) {

      const evoChain = await getEvoChain(species);
      const evos = getAllEvolutions(evoChain.data.chain);

      setEvolutions(evos);
      let cevaux = [];

      for (const element of evos) {
        let aux = [];
        for (const el of element) {
          const response = await getPokes(`https://pokeapi.co/api/v2/pokemon/${el.id}`);
          aux.push(response.data)
        }

        cevaux.unshift(aux);
      }
      console.table(cevaux);
      setPokemons(cevaux)
    }

  }, [species])

  if (Number.isNaN(+id) || Number(id) < 1 || Number(id) > 898) {
    return <NotFound />;
  }

  const setColorScheme = (stat) => {
    if (stat > 255 / 2)
      return 'green'
    if (stat > 255 / 4)
      return 'yellow'
    return 'red'
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const getDescription = () => {
    let descs = [];
    let j = 0;
    for (let i = 0; i < species.flavor_text_entries.length; i++) {
      if (species.flavor_text_entries[i].language.name === "en") {
        j++;
        descs = [...descs, species.flavor_text_entries[i].flavor_text];
      }

    }

    return descs[getRandomInt(0, j)];
  }

  return (
    <div>
      {data && species ? (<>
        <Flex width="100%" justifyContent="center" alignItems="center">
          <Flex alignItems="center" justifyContent="center" direction="column" m="20px" mr="auto" className={`card ${data.types[0].type.name}`}>
            <Flex width="100%" justifyContent="center" direction="column" ml="30px" pt="20px">
              <Flex alignItems="center">
                <Stack mr="auto">
                  <Heading>{capitalizeFirstLetter(data.name)}</Heading>
                  <Text>#{data.id}</Text>
                </Stack>
                <TypeTag mr={data.types[1] ? '0' : "40px"} type={capitalizeFirstLetter(data.types[0].type.name)} typeDescription={typeDescriptions[data.types[0].type.name]} icon={icons[iconsString.indexOf(data.types[0].type.name)]}></TypeTag>

                {data.types[1] ? <TypeTag ml="20px" mr="40px" type={capitalizeFirstLetter(data.types[1].type.name)} typeDescription={typeDescriptions[data.types[1].type.name]} icon={icons[iconsString.indexOf(data.types[1].type.name)]}></TypeTag> : null}
              </Flex>
            </Flex>
            <Image boxSize="400px" src={`${data.sprites.other['official-artwork'].front_default}`}></Image>
            <Flex gap="30" p="30px">
              <Box fontSize="15px">
                <Text fontWeight="100">Weight</Text>
                <Text fontWeight="700">{data.weight / 10} kg</Text>
              </Box>
              <Box fontSize="15px">
                <Text fontWeight="100">Height</Text>
                <Text fontWeight="700">{data.height / 10} meters</Text>
              </Box>
              <Box fontSize="15px">
                <Text fontWeight="100">Color</Text>
                <Text fontWeight="700">{capitalizeFirstLetter(species.color.name)}</Text>
              </Box>
              <Box fontSize="15px">
                <Text fontWeight="100">Habitat</Text>
                <Text fontWeight="700">{species.habitat ? capitalizeFirstLetter(species.habitat.name) : null}</Text>
              </Box>
              <Box fontSize="15px">
                <Text fontWeight="100">Shape</Text>
                <Text fontWeight="700">{capitalizeFirstLetter(species.shape.name)}</Text>
              </Box>
            </Flex>
          </Flex>

          <Flex mr="200px" direction="column" w="500px">
            <Box >
              <Heading mt="20px" mb="20px">Description</Heading>
              <Text mt="16px" mb="16px">{getDescription()}</Text>
            </Box>
            <Box>
              <Heading mt="20px" mb="20px">Stats</Heading>
              <Flex h="200px" className={`card ${data.types[0].type.name}`} width="100%" direction="column" justifyContent="center" w="455px">
                <Grid alignItems="center" ml="20px" mr="20px" templateColumns="180px 190px auto">
                  <Text fontWeight="700" fontSize="16px">Hp</Text>
                  { }
                  <Progress colorScheme={setColorScheme(data.stats[0].base_stat)} w="100%" borderRadius="5px" value={data.stats[0].base_stat} max="255"></Progress>
                  <Text justifySelf="end">{data.stats[0].base_stat}</Text>
                </Grid>
                <Grid alignItems="center" ml="20px" mr="20px" templateColumns="180px 190px auto">
                  <Text fontWeight="700" fontSize="16px">Attack</Text>
                  <Progress colorScheme={setColorScheme(data.stats[1].base_stat)} borderRadius="5px" value={data.stats[1].base_stat} max="255"></Progress>
                  <Text justifySelf="end">{data.stats[1].base_stat}</Text>
                </Grid>
                <Grid alignItems="center" ml="20px" mr="20px" templateColumns="180px 190px auto">
                  <Text fontWeight="700" fontSize="16px">Defense</Text>
                  <Progress colorScheme={setColorScheme(data.stats[2].base_stat)} borderRadius="5px" value={data.stats[2].base_stat} max="255"></Progress>
                  <Text justifySelf="end">{data.stats[2].base_stat}</Text>
                </Grid>
                <Grid alignItems="center" ml="20px" mr="20px" templateColumns="180px 190px auto">
                  <Text fontWeight="700" fontSize="16px">Special-Attack</Text>
                  <Progress colorScheme={setColorScheme(data.stats[3].base_stat)} borderRadius="5px" value={data.stats[3].base_stat} max="255"></Progress>
                  <Text justifySelf="end">{data.stats[3].base_stat}</Text>
                </Grid>
                <Grid alignItems="center" ml="20px" mr="20px" templateColumns="180px 190px auto">
                  <Text fontWeight="700" fontSize="16px">Special-Defense</Text>
                  <Progress colorScheme={setColorScheme(data.stats[4].base_stat)} borderRadius="5px" value={data.stats[4].base_stat} max="255"></Progress>
                  <Text justifySelf="end">{data.stats[4].base_stat}</Text>
                </Grid>
                <Grid alignItems="center" ml="20px" mr="20px" templateColumns="180px 190px auto">
                  <Text fontWeight="700" fontSize="16px">Speed</Text>
                  <Progress colorScheme={setColorScheme(data.stats[5].base_stat)} borderRadius="5px" value={data.stats[5].base_stat} max="255"></Progress>
                  <Text justifySelf="end">{data.stats[5].base_stat}</Text>
                </Grid>
              </Flex>
            </Box>
          </Flex>

        </Flex>

        <Box>
          <Heading>Evolutions</Heading>
          {
            pokemons.map(pokemon => (
              <Flex key={getRandomInt(1, 20000)} mr="auto" ml="auto" alignItems="center"  mt="40px" w="fit-content" className={`card default`}> 
                {

                  pokemon.map(poke => (<>
                    {evolutions[0][pokemon.indexOf(poke)].trigger ? (
                      <Stack color="white" display="flex" alignItems="center">
                        <Text>{evolutions[0] ? capitalizeFirstLetter(evolutions[0][pokemon.indexOf(poke)].trigger) : null}</Text>
                        <ArrowRightIcon></ArrowRightIcon>
                      </Stack>) : null}

                    <Card key={poke.id} styleClass={data.types[0].type.name} pokemon={poke} icon1={icons[iconsString.indexOf(poke.types[0].type.name)]} icon2={poke.types[1] ? icons[iconsString.indexOf(poke.types[1].type.name)] : null} ></Card>
                  </>

                  ))
                }
              </Flex>
            ))
          }

        </Box>

      </>) : <Text>Loading...</Text>
      }
    </div>
  )
}

export default Pokemon;