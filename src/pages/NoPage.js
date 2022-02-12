import {
  ChakraProvider,
  Box,
  Text,
  Grid,
  theme,
  Flex,
  Link,
  useColorModeValue,
  Spacer,
  Container,
  Stack,
  Heading,
  Button,
} from '@chakra-ui/react'
import{Navbar, Page, Footer} from '../components/components.js'
import React from "react";
import { ColorModeSwitcher } from '../ColorModeSwitcher.js';
const NoPage = () => {
    return <>
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
            <Text as={'span'} color={useColorModeValue('teal.600', 'teal.200')}>
              404
            </Text>
              <br />
              Page not found
          </Heading>
          <Text color={'gray.500'}>
            This page could have been moved, renamed, or doesn't exist.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              colorScheme={'teal'}
              px={6}
              onClick={function(){
                  window.location.href = '/'
              }}
              >
              Home
            </Button>
          </Stack>
        </Stack>
      </Container>
      </Page>
      <Footer/>
      </>;
  };
  
  export default NoPage;