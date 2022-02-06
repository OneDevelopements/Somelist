import {
  Button,
  ChakraProvider,
  Box,
  Text,
  Grid,
  theme,
  Container,
  Stack,
  Heading,
} from '@chakra-ui/react'
import{Card, Navbar} from '../components/components.js'
import React from "react";
const Home = () => {
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
            Secure servers with <br />
            <Text as={'span'} color={'green.400'}>
              Ava
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Secure your servers with Ava's state-of-the-art Anti-Raid system, and never worry again when attacks are taking place in your server.
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
              }}>
              Get Started
            </Button>
            <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
              Learn more
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
            textAlign={'center'}
            >
            Ava's best <br />
            <Text as={'span'} color={'green.400'}>
             Unique features
            </Text>
      </Heading>
      <Grid
        templateColumns='repeat(3, 1fr)'
        gap={8}
        padding='100px'
        h='300px'
    >     
    <Card>   
        <Heading
        fontSize={'30px'}
        textAlign={'center'}
        >
          Automation
        </Heading>
        <br />
        <Text>
          Ava automatically detects and solves threats for you. There's 0 intervention needed. 
        </Text>
      </Card>
      <Card>   
        <Heading
        fontSize={'30px'}
        textAlign={'center'}
        >
          Speed
        </Heading>
        <br />
        <Text>
          Ava quickly and swiftly manages everything in seconds. Ava also does everything in the background, such as banning suspicious members, or following dashboard severities! 
        </Text>
      </Card>
      <Card>   
        <Heading
        fontSize={'30px'}
        textAlign={'center'}
        >
          Simplicity
        </Heading>
        <br />
        <Text>
          Ava is extremely simple to use, we even made an interactive dashboard to make it easier! Your server is set-up automatically, and logging channels or more can be set in the dashboard, or in Discord.
        </Text>
      </Card>
    </Grid>
    </>
  )
  };

export default Home;