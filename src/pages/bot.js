import { Outlet, useParams } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Text,
  Grid,
  HStack,
  theme,
  Flex,
  Link,
  Alert,
  Wrap,
  AlertIcon,
  Spacer,
  Container,
  useColorModeValue,
  Skeleton,
  WrapItem,
  Stack,
  Heading,
  VStack,
} from '@chakra-ui/react'
import{Card, Cards, Page,  Profile, BotLayout,  Navbar, BotProfileLayout} from '../components/components.js'
import {React, useState, useEffect} from "react";
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
const Layout = () => {
    const { id } = useParams();
    const cardbg = useColorModeValue('gray.100', 'gray.900')
    const GetUser = () => {
        const [user, setuser] = useState([]);
        const bg = useColorModeValue('teal.500', 'teal.200')
        useEffect( () => { 
            async function botfunc() {
                try {
                    setuser(
                    <>
                        <Skeleton width={'100%'} borderRadius={'20px'}>
                        <BotProfileLayout username='Test' avatar='Avatar' website='Website' github='Github' description='description' />
                        </Skeleton>
                        <Skeleton height={'500px'} width={'100%'} borderRadius={'10px'}>
                        <BotLayout description='30000000000000000'/>
                        </Skeleton>
                    </>
                    )
                    fetch(`https://api.somelist.tk/bot?user=${id}`) 
                    .then((res) => res.json())
                    .then((json) => {
                      console.log(json.bots)
                      if (json.result === 'none'){
                        return setuser(
                          <Alert status='warning' h={'50px'} borderRadius={'10px'}>
                          <AlertIcon />
                          This bot does not exist.
                        </Alert>
                        )
                      }
                      console.log(json.result)
                      if (json.result.owner === localStorage.getItem('id')){
                        setuser(
                          <>
                          {!json.result.approved &&                
                            <Alert status='error' borderRadius={'10px'}>
                            <AlertIcon />
                            <Text>This bot is not approved. <a href="https://docs.somelist.tk/support/faq/bot-approval">Learn More</a>.</Text>
                          </Alert>}
                          <BotProfileLayout id={json.result.id} username={json.result.name} avatar={json.result.avatar} website={json.result.website} github={json.result.github} description={json.result.shortdesc} votes={json.result.votes} owner/>
                          <BotLayout description={json.result.longdesc}/>
                          </>
                          );
                      } else {
                        if (!json.result.approved){
                          window.location.href = '/error?code=403&desc=Authorization required'
                        }
                      setuser(
                        <>
                        <BotProfileLayout id={json.result.id} username={json.result.name} avatar={json.result.avatar} website={json.result.website} github={json.result.github} description={json.result.shortdesc} votes={json.result.votes}/>
                        <BotLayout description={json.result.longdesc}/>
                        </>
                        )};
                    })
                    .catch(function(error){
                      console.error(error)
                      setuser(
                        <Alert status='error' h={'50px'} borderRadius={'10px'}>
                        <AlertIcon />
                        Failed to process your request.
                      </Alert>
                      )
                    })
                } catch (err) {
                    console.error(err);
                }
            }
            botfunc();
        }, []);
        return user;
    }

  return (
    <>
    <Navbar/>
      <Page>
        <VStack spacing={'30px'} padding={'50px'}>
        {GetUser()}
        </VStack>
      </Page>
      <Outlet />
    </>
  )
};

export default Layout;