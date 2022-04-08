import { Button, Center, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Text } from '@chakra-ui/react'
import React from 'react'

function TypeTag({type, typeDescription, icon, ml, mr}) {
  return (
    <Popover fontSize="sm" placement="top" isLazy trigger='hover'>
      <PopoverTrigger>
        <Center mr={mr} ml={ml} className="icon-container" borderRadius="4px" pt="5px" pb="5px" h="34px" pr="10px" pl="10px" bg="white" mb={2.5}> <span className="icon"><img src={icon} alt="" /></span> {type}</Center>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow></PopoverArrow>
        <PopoverCloseButton></PopoverCloseButton>
        <PopoverHeader>Description</PopoverHeader>
        <PopoverBody><Text fontSize="12px" noOfLines={3} >{typeDescription}</Text></PopoverBody>
        <PopoverFooter>
          <Button size="sm">Learn More</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default TypeTag