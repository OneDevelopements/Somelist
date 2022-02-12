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
    useColorModeValue,
  } from '@chakra-ui/react'
  import {    useLocation
  } from "react-router-dom";
  import{Navbar, Page} from '../components/components.js'
  import React from "react";
  import { ColorModeSwitcher } from '../ColorModeSwitcher.js';
  function UseQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
  const ErrorPage = () => {
      let query = UseQuery();
      const code = query.get('code')
      const desc = query.get('desc')
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
                An error occured.
                <br />
                <Text as={'span'} color={useColorModeValue('teal.600', 'teal.200')}>
                {code}
              </Text>
            </Heading>
            <Text color={'gray.500'}>
              {desc}
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
        </>;
    };
    
    export default ErrorPage;