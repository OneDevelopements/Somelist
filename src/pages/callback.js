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
function UseQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
const Callback = () => {
  let query = UseQuery();
  localStorage.setItem('id', query.get("id"))
  const id = query.get('id')
  fetch(
    `https://api.ava-bot.xyz/info/${id}`)
    .then((res) => res.json())
    .then((json) => {
      if (json.user === 'noauth'){
        return window.location.href = 'https://api.ava-bot.xyz/login'
      }
      localStorage.setItem('name', json.username)
      localStorage.setItem('avatar', json.avatar)
      window.location.href = '/'
    })
    .catch((error)=>{
      return window.location.href = '/error?code=500&desc=An error occured while you were logging in. If you think that this was a mistake, please join our Support Server regarding this issue.'
    });
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
                You In..
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

export default Callback;