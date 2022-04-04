import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import '../../shared/colors.css';

function Layout({children}) {
  return (
    <>
    <Box ml={8}>
      <Heading size='xl' mt={8} mb={8}>Pokedex</Heading>
      <Box>{children}</Box>
    </Box>
    </>
  )
}

export default Layout