import { SearchIcon } from '@chakra-ui/icons'
import { Button, Flex, Input, InputGroup, InputRightElement, Select } from '@chakra-ui/react'
import React from 'react'

function Search({setValue, searchFilter, sortType, setSortType}) {
  return (
    <div>
      <Flex>
        <InputGroup w="300px">
          <Input value={searchFilter} onChange={(event) => setValue(event.target.value)} w="100%" size='md' variant="outline" bg="white" pr={8} type="text" placeholder="Search Pokemon name, type or id"/>
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
      </Flex>
    </div>
  )
}

export default Search