import { CheckIcon, SearchIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuItemOption, MenuList, MenuOptionGroup, Select, Stack, Text, useCheckbox, useCheckboxGroup } from '@chakra-ui/react'
import React, { useEffect } from 'react'
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
  }, [value])

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
          <MenuList>
            <Stack>

              <CustomCheckbox  {...getCheckboxProps({ value: 'Grass' })} />
              <CustomCheckbox  {...getCheckboxProps({ value: 'Poison' })} />
              <CustomCheckbox  {...getCheckboxProps({ value: 'Normal' })} />
            </Stack>
          </MenuList>
        </Menu>
      </Flex>
    </div>
  )
}

export default Search