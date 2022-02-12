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
  Button,
} from '@chakra-ui/react'
import{Navbar, Page} from '../components/components.js'
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
            <Text as={'span'} color={'green.400'}>
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
              colorScheme={'green'}
              bg={'green.400'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}
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
      </>;
  };
  
  export default NoPage;