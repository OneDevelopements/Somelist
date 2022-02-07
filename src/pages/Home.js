import { Outlet } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Text,
  Grid,
  theme,
  Flex,
  Link,
  Spacer,
  Container,
  Stack,
  Heading,
  useColorModeValue
} from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import{Card, Navbar, ServerList} from '../components/components.js'
import React from "react";
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
const Home = () => {
  return (
    <>
      <Navbar/>
        <Box
        padding={'150px'}
        paddingTop={'100px'}
        paddingBottom={'200px'}
        paddingLeft={'75px'}
        bg={useColorModeValue('gray.100', 'gray.900')}
        >
        <Heading
              fontWeight={600}
              fontSize={'75px'}
              lineHeight={'110%'}
              >
                Somelist
        </Heading>
        <Text fontSize={'30px;'}> Discovering new, and exciting bots. </Text>
        
        </Box>
      <Outlet />
    </>
  )
};

export default Home;