import { SimpleGrid, Box, Stack, Heading, Flex, Spacer, Center, Image, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Tooltip, PopoverHeader, Text, PopoverFooter, Button } from '@chakra-ui/react'
import React from 'react'

function Card({ pokemon, icon1, icon2 }) {

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const typeDescriptions = {
    bug: "Most Bug Pokémon grow quickly and evolve sooner than other types. As a result, they are often very weak. In Generation I, bugs were almost useless since the few Bug type moves available were very weak. The situation improved in later games with better moves and an advantage against the Dark type.",
    electric: "There are relatively few Electric Pokémon; in fact only four were added in the third generation. Most are based on rodents or inanimate objects. Electric  Pokémon are very good defensively, being weak only to Ground moves. Elektross is the only Pokémon to have no type disadvantages due to its ability, Levitate ",
    fairy: "The Fairy type was introduced in Generation 6 - the first new type for more than 12 years! Its main intention was to balance the type chart by reducing the power of dragons, while also giving an offensive boost to the Poison and Steel types. Several old Pokémon were retyped and new Pokémon introduced. There are only around 60 Fairy type Pokémon (depending on how you count alternate forms or mega evolutions), in total slightly above Ice.",
    fire: "Fire is one of the three basic elemental types along with Water and Grass, which constitute the three starter Pokémon. This creates a simple triangle to explain the type concept easily to new players. Fire types are notoriously rare in the early stages of the games so choosing the Fire variation starter is often a plus.",
    flying: "Most Flying type Pokémon are based on birds or insects, along with some mythical creatures like dragons. On average they are faster than any other type. Nearly every Flying type has Flying as the secondary type, usually with Normal. There are only three pure Flying type Pokémon (Tornadus, Rookidee, Corvisquire), and four Pokémon with Flying as a primary type (Noibat, Noivern, Corviknight, Cramorant). As of Generation 6, the type has also been paired with every other type.",
    grass: "Grass is one of the three basic elemental types along with Fire and Water, which constitute the three starter Pokémon. This creates a simple triangle to explain the type concept easily to new players. Grass is one of the weakest types statistically, with 5 defensive weaknesses and 7 types that are resistant to Grass moves. Furthermore, three type combos paired with Grass have 7 weaknesses: Grass/Psychic, Grass/Ice, and Grass/Dark.",
    ground: "Ground is one of the strongest types offensively: it is super-effective against five other types (as is Fighting) and Earthquake is one of the strongest moves in the game with power and accuracy both 100. Unfortunately, many Ground type Pokémon are dual Rock types, lumbering them with 4x Grass and Water disadvantages.",
    normal: "The Normal type is the most basic type of Pokémon. They are very common and appear from the very first route you visit. Most Normal Pokémon are single type, but there is a large contingent having a second type of Flying. Pokémon X/Y add several Normal dual-type Pokémon.",
    poison: "The Poison type is regarded as one of the weakest offensively. Prior to Pokémon X/Y it was super-effective only against Grass (many of which are dual Poison so neutralizes the effect). It now has an extra advantage against the new Fairy type. In the first generation it was also super-effective against Bug but this was changed. It fares a little better defensively but its best advantage is through status moves like Toxic.",
    water: "Water is one of the three basic elemental types along with Fire and Grass, which constitute the three starter Pokémon. This creates a simple triangle to explain the type concept easily to new players. Water is the most common type with over 100 Pokémon, which are based on a wide variety of fish and other sea-dwelling creatures.",
    steel: "The Steel type was introduced in the second generation of Pokémon games. It is the strongest type defensively, with 10 types being not very effective against it and the Poison type having no effect. From Pokémon X/Y onwards, it lost its Ghost and Dark resistance, those types now dealing neutral damage. The Steel type also has the highest average Defense stat in the games.",
    psychic: "The Psychic type has few outright strengths, however, it also has few weaknesses. In the first generation it ended up being massively overpowered, mainly due to a complete lack of powerful Bug moves, its only weakness. Furthermore, a mistake in the game meant that Ghost-type moves had no effect on Psychic (although this only affected the low-powered Lick). Generation 2 rectified the situation with the addition of the Dark type along with better Pokémon and moves of all types.",
    fighting: "Fighting Pokémon are strong and muscle-bound, often based on martial artists. Fighting moves are super-effective against five other types (as is Ground), making them very good offensively. Most Fighting type moves are in the Physical category, for obvious reasons.",
    rock: "Rock is a solid type as one might expect. Like Steel, Rock Pokémon usually have high defense - however, since many Rock Pokémon are part Ground they have a 4x weakness to both Grass and Water whose moves often come as Special type.",
    ice: "Ice type Pokémon are now the rarest of all types: there are only around 60 in total (depending on how you count alternate forms or mega evolutions). They are ranked quite well defensively in terms of stats, although multiple type weaknesses let them down. Some are based on typical Arctic creatures like seals or yaks, while others are more mythical.",
    ghost: "Ghosts are rare Pokémon, and the only type to have two immunities. In total there are just 34 Ghost type Pokémon (not including Megas/Formes), slightly above Ice. In the first generation, Ghost moves has no effect on Psychic Pokémon, however, it was later changed to be super-effective. When paired with the Dark type it was the only type combination to have no weaknesses prior to Gen 6.",
    dragon: "Dragons are among the most elusive and powerful of all Pokémon. Nine legendary Pokémon are part Dragon type and four have legendary-like stats. They are notoriously difficult to train due to requiring more EXP points per level than most non-legendary Pokémon, and the fact they evolve much later and thus are in their weaker forms for longer. Interestingly, many final-evolution Dragon types have a 4x weakness to the Ice type.",
    dark: "The Dark type was introduced in the second generation of Pokémon games as a measure to balance the types. In particular, its resistance to Psychic cut down that type's advantage by a long way. When paired with the Ghost type it was the only type combination to have no weaknesses prior to Gen 6."
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
              <Popover fontSize="sm" placement = "top" isLazy trigger='hover'>
                <PopoverTrigger>
                  <Center className="icon-container" borderRadius="4px" pt="5px" pb="5px" h="34px" pr="10px" pl="10px" bg="white" mb={2.5}> <span className="icon"><img src={icon1} alt="" /></span> {capitalizeFirstLetter(pokemon.types[0].type.name)}</Center>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow></PopoverArrow>
                  <PopoverCloseButton></PopoverCloseButton>
                  <PopoverHeader>Description</PopoverHeader>
                  <PopoverBody><Text noOfLines={3} >{typeDescriptions[pokemon.types[0].type.name]}</Text></PopoverBody>
                  <PopoverFooter>
                    <Button size="sm">Learn More</Button>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>

              {pokemon.types[1] ? <Popover fontSize="sm" placement = "top" isLazy trigger='hover'>
                <PopoverTrigger>
                  <Center className="icon-container" borderRadius="4px" pt="5px" pb="5px" h="34px" pr="10px" pl="10px" bg="white" mb={2.5}> <span className="icon"><img src={icon2} alt="" /></span> {capitalizeFirstLetter(pokemon.types[1].type.name)}</Center>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow></PopoverArrow>
                  <PopoverCloseButton></PopoverCloseButton>
                  <PopoverHeader>Description</PopoverHeader>
                  <PopoverBody><Text noOfLines={3} >{typeDescriptions[pokemon.types[1].type.name]}</Text></PopoverBody>
                  <PopoverFooter>
                    <Button size="sm">Learn More</Button>
                  </PopoverFooter>
                </PopoverContent>
              </Popover> : null}

            </Box>
            <Box mt="20px">
              <Image src={`${pokemon.sprites.other['official-artwork'].front_default}`} boxSize='120px'></Image>
            </Box>
          </Flex>
        </Stack>
      </Box>
    </div>
  )
}

export default Card