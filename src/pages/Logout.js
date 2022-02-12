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
import{Card, Page, Navbar} from '../components/components.js'
import React from "react";
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
import {    useLocation
  } from "react-router-dom";

const Logout = () => {
  localStorage.removeItem('name')
  localStorage.removeItem('avatar')
  localStorage.removeItem('id')
  localStorage.removeItem('token')
  localStorage.removeItem('ptoken')
  window.location.href='https://api.somelist.tk/logout'
  return (
    <>
      <Navbar/>
      <Page>
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
        </Page>
      <Outlet />
    </>
  )
};

export default Logout;