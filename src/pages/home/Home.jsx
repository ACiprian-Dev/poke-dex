import { SimpleGrid, Box, Stack, Heading, Flex, Spacer, Center, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Search from '../../components/Search/Search'
import '../../shared/pokemonTypes.css'
import '../../components/Cards/Card.css'
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
import Card from '../../components/Cards/Card'
import { useFetch } from '../../hooks/useFetch'
import axios from 'axios'


function Home() {

  // const [pokemons, setPokemons] = useState([{
  //   name: "bulbasaur",
  //   id: "001",
  //   type1: "grass",
  //   type2: "poison",
  //   image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
  // } , {
  //   name: "ivysaur",
  //   id: "002",
  //   type1: "grass",
  //   type2: "poison",
  //   image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
  // }]);
  
  // const auxPokemons = [{
  //   name: "bulbasaur",
  //   id: "001",
  //   type1: "grass",
  //   type2: "poison",
  //   image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
  // } , {
  //   name: "ivysaur",
  //   id: "002",
  //   type1: "grass",
  //   type2: "poison",
  //   image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
  // }];

  const [pokemons, setPokemons] = useState([]);
  const [auxPokemons, setAuxPokemons] = useState([]);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  const [sortType, setSortType] = useState("idUp");

  const {data} = useFetch('https://pokeapi.co/api/v2/pokemon?limit=20');

  useEffect(async () => {
    if(data) {
      const promises = data.results.map((result) => axios.get(result.url));
      const resolved = await Promise.all(promises);
      setPokemons([...pokemons, ...resolved.map((answer) => answer.data)])
      setAuxPokemons([...auxPokemons, ...resolved.map((answer) => answer.data)])
    }
  }, [data]);

  const icons = [bug, electric, fairy, fire, flying, grass, ground, normal, poison, water];
  const iconsString = ["bug", "electric", "fairy", "fire", "flying", "grass", "ground", "normal", "poison", "water"]
  const [searchFilter, setSearchFilter] = useState('');

  // console.log(pokemons[0].name.includes(filter))

  useEffect(() => {
    setAuxPokemons(filterPokemons(pokemons, searchFilter))
  }, [searchFilter])

  const filterPokemons = (pokemons, filter) => {
    if(filter==="") {
      return pokemons;
    }

    return pokemons.filter((pokemon) => {
      const pokemonName = pokemon.name.toLowerCase();
      const pokemonID = pokemon.id.toString();
      const pokemonType1 = pokemon.types[0].type.name.toLowerCase();
      const pokemonType2 = pokemon.types[1] ? pokemon.types[1].type.name.toLowerCase() : null;
      filter = filter.toLowerCase();

      if(pokemonType2 !=null)
        return pokemonName.includes(filter) || pokemonID.includes(filter) || pokemonType1.includes(filter) || pokemonType2.includes(filter);
      else 
        return pokemonName.includes(filter) || pokemonID.includes(filter) || pokemonType1.includes(filter)
    })
  }

  useEffect(() => {
    setAuxPokemons(sortPokemons(pokemons, sortType))
  }, [sortType])

  const sortPokemons = (pokes, sort) => {

    switch (sort) {
      case "idUp" :
        return pokes.slice().sort((a,b) => {
          if(a.id < b.id)
            return -1;
          if(a.id > b.id)
            return 1;
          return 0;
        })

      case "idDown" :
        return pokes.slice().sort((a,b) => {
          if(a.id < b.id)
            return 1;
          if(a.id > b.id)
            return -1;
          return 0;
        })
      
      case "nameUp" :
        return pokes.slice().sort((a,b) => {
          if(a.name < b.name)
            return -1;
          if(a.name > b.name)
            return 1;
          return 0;
        })
    }

    
  } 

  // const handleOnChange = (newFilter) => {
  //   setFilter(newFilter);
  // }

  

  return (
    <>
      <Search setValue = {setSearchFilter} searchFilter = {searchFilter} sortType = {sortType} setSortType = {setSortType}></Search>
      {console.log(sortType)}
      <SimpleGrid columns={3} mt={5}>
        {
        auxPokemons.map(pokemon => (

          <Card key = {pokemon.id} pokemon={pokemon} icon1 = {icons[iconsString.indexOf(pokemon.types[0].type.name)]} icon2 = {pokemon.types[1] ? icons[iconsString.indexOf(pokemon.types[1].type.name)] : null } ></Card>
          
        ))}
      </SimpleGrid>
    </>
  )
}

export default Home