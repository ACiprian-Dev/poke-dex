import { CheckIcon, SearchIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, HStack, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuGroup, MenuItem, MenuItemOption, MenuList, MenuOptionGroup, Select, Stack, Tag, TagCloseButton, TagLabel, Text, useCheckbox, useCheckboxGroup } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { chakra } from "@chakra-ui/react"

function CustomCheckbox(props) {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props)

  return (
    <chakra.label
      display='flex'
      flexDirection='row'
      alignItems='center'
      gridColumnGap={2}
      maxW='40'
      rounded='lg'
      px={3}
      py={1}
      cursor='pointer'
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Flex
        alignItems='center'
        justifyContent='center'

        {...getCheckboxProps()}
      >
        {state.isChecked && <CheckIcon></CheckIcon>}
      </Flex>
      <Text {...getLabelProps()}>{props.value}</Text>
    </chakra.label>
  )
}


function Search({ setValue, searchFilter, sortType, setSortType, filters, setFilters }) {

  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
    onChange: () => {setFilters(value)}
  })

  useEffect(() => {
    setFilters(value);
    if(value.length==2)
      setHasReachedMax(true);
    else
      setHasReachedMax(false);
  }, [value, filters])

  const [hasReachedMax, setHasReachedMax] = useState(false);

  const iconsString = ["Bug", "Electric", "Fairy", "Fire", "Flying", "Grass", "Ground", "Normal", "Poison", "Water"]

  return (
    <div>
      <Flex>
        <InputGroup w="300px">
          <Input value={searchFilter} onChange={(event) => setValue(event.target.value)} w="100%" size='md' variant="outline" bg="white" pr={8} type="text" placeholder="Search Pokemon name, type or id" />
          <InputRightElement width={10}>
            <Button bg="white" background="gray.100">
              <SearchIcon></SearchIcon>
            </Button>
          </InputRightElement>
        </InputGroup>
        <Select onChange={(event) => setSortType(event.target.value)} bg="white" variant="filled" ml={4} w="220px">
          <option value="idUp">Sort By Id Ascending</option>
          <option value="idDown">Sort By Id Descending</option>
          <option value="nameUp">Sort Alphabetically</option>
        </Select>
        
        <Menu closeOnSelect={false}>
          <MenuButton ml={4} bg="white" as={Button}>Filters</MenuButton>
          <MenuList ml="-40%" w="fit-content">
            <MenuGroup title = "Types">
            <HStack>

              {iconsString.map((type) => (
                <MenuItem isDisabled={hasReachedMax ? value.includes(type) ? false : true : false} key={type} pl="0px" pr="0px" w="fit-content">
                <CustomCheckbox  {...getCheckboxProps({ value: type })} />
                </MenuItem>
              ))}
            </HStack>
            </MenuGroup>
          </MenuList>
        </Menu>

        <HStack>
          {filters.map((filter) => (
            <Tag ml = {4} size="lg" key={filter} borderRadius="10px" variant="solid" bg="white" color="black">
              <TagLabel>
                {filter}
              </TagLabel>
              <TagCloseButton onClick={() => setFilters(value.splice(value.indexOf(filter), value.indexOf(filter)+1))}></TagCloseButton>
            </Tag>
          ))}
        </HStack>
      </Flex>
    </div>
  )
}

export default Search