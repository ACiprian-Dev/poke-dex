import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import '../../shared/colors.css';

function Layout({children}) {
  return (
    <>
    <Box ml={8}>
      <Link to="/"><Heading size='xl' mt={8} mb={8}>Pokedex</Heading></Link>
      <Box>{children}</Box>
    </Box>
    </>
  )
}

export default Layout