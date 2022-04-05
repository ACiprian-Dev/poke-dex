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
import steel from '../../images/steel.svg'
import psychic from '../../images/psychic.svg'
import fighting from '../../images/fighting.svg'
import rock from '../../images/rock.svg'
import ice from '../../images/ice.svg'
import ghost from '../../images/ghost.svg'
import dragon from '../../images/dragon.svg'
import dark from '../../images/dark.svg'
import Card from '../../components/Cards/Card'
import { useFetch } from '../../hooks/useFetch'
import axios from 'axios'


function Home() {

  const [pokemons, setPokemons] = useState([]);
  const [auxPokemons, setAuxPokemons] = useState([]);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  const [sortType, setSortType] = useState("idUp");
  const [filters, setFilters] = useState([]);

  const { data } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=100');

  useEffect(async () => {
    if (data) {
      const promises = data.results.map((result) => axios.get(result.url));
      const resolved = await Promise.all(promises);
      setPokemons([...pokemons, ...resolved.map((answer) => answer.data)])
      setAuxPokemons([...auxPokemons, ...resolved.map((answer) => answer.data)])
    }
  }, [data]);

  const icons = [bug, electric, fairy, fire, flying, grass, ground, normal, poison, water, steel, psychic, fighting, rock, ice, ghost, dragon, dark];
  const iconsString = ["bug", "electric", "fairy", "fire", "flying", "grass", "ground", "normal", "poison", "water", "steel", "psychic", "fighting", "rock", "ice", "ghost", "dragon", "dark"]

  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    setAuxPokemons(getPokemons(filters, searchFilter, sortType));
  }, [searchFilter, sortType, filters]);

  const getPokemons = (filters, searchFilter, sortType) => {
    let aux = [];

    aux = filtersPokemons(pokemons, filters);
    aux = filterPokemons(aux, searchFilter);
    aux = sortPokemons(aux, sortType);

    return aux;
  }

  const filterPokemons = (pokemons, filter) => {
    if (filter === "") {
      return pokemons;
    }

    return pokemons.filter((pokemon) => {
      const pokemonName = pokemon.name.toLowerCase();
      const pokemonID = pokemon.id.toString();
      const pokemonType1 = pokemon.types[0].type.name.toLowerCase();
      const pokemonType2 = pokemon.types[1] ? pokemon.types[1].type.name.toLowerCase() : null;
      filter = filter.toLowerCase();

      if (pokemonType2 != null)
        return pokemonName.includes(filter) || pokemonID.includes(filter) || pokemonType1.includes(filter) || pokemonType2.includes(filter);
      else
        return pokemonName.includes(filter) || pokemonID.includes(filter) || pokemonType1.includes(filter)
    })
  }

  const sortPokemons = (pokes, sort) => {

    switch (sort) {
      case "idUp":
        return pokes.slice().sort((a, b) => {
          if (a.id < b.id)
            return -1;
          if (a.id > b.id)
            return 1;
          return 0;
        })

      case "idDown":
        return pokes.slice().sort((a, b) => {
          if (a.id < b.id)
            return 1;
          if (a.id > b.id)
            return -1;
          return 0;
        })

      case "nameUp":
        return pokes.slice().sort((a, b) => {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        })
    }

  }

  const filtersPokemons = (pokes, filts) => {



    if (filts[0] != null) {




      return pokes.filter((pokemon) => {
        const pokemonType1 = pokemon.types[0].type.name.toLowerCase();
        const pokemonType2 = pokemon.types[1] ? pokemon.types[1].type.name.toLowerCase() : null;

        let filt1 = filts[0] ? filts[0].toLowerCase() : null
        let filt2 = filts[1] ? filts[1].toLowerCase() : null

        if (filt2 == null) {
          if (pokemonType2 != null)
            return pokemonType1.includes(filt1) || pokemonType2.includes(filt1);
          else
            return pokemonType1.includes(filt1)
        } else {
          if (pokemonType2 != null) {
            return (pokemonType1.includes(filt1) && pokemonType2.includes(filt2)) || (pokemonType1.includes(filt2) && pokemonType2.includes(filt1))
          } else
              return false
        }
      })
    }
    return pokemons;
  }

  return (
    <>
      <Search setFilters={setFilters} filters={filters} setValue={setSearchFilter} searchFilter={searchFilter} sortType={sortType} setSortType={setSortType}></Search>
      <SimpleGrid columns={3} mt={5}>
        {
          auxPokemons.map(pokemon => (

            <Card key={pokemon.id} pokemon={pokemon} icon1={icons[iconsString.indexOf(pokemon.types[0].type.name)]} icon2={pokemon.types[1] ? icons[iconsString.indexOf(pokemon.types[1].type.name)] : null} ></Card>

          ))}
      </SimpleGrid>
    </>
  )
}

export default Home