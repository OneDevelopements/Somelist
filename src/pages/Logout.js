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
} from '@chakra-ui/react'
import{Card, Navbar} from '../components/components.js'
import React from "react";
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
import {    useLocation
  } from "react-router-dom";

const Logout = () => {
  localStorage.removeItem('name')
  localStorage.removeItem('avatar')
  localStorage.removeItem('id')
  window.location.href='https://api.ava-bot.xyz/logout'
  return (
    <>
      <Navbar/>
      <Container maxW={'3xl'}>
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}>
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}>
                Logging
                <br />
                <Text as={'span'} color={'green.400'}>
                You Out..
              </Text>
            </Heading>
            <Text color={'gray.500'}>
              Please be patient. THis process usually takes a short time.
            </Text>
          </Stack>
        </Container>
      <Outlet />
    </>
  )
};

export default Logout;