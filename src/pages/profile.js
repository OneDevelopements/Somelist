import { Outlet, useParams } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Text,
  Grid,
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
import{Card, Cards, Profile,  Navbar, ProfileLayout} from '../components/components.js'
import {React, useState, useEffect} from "react";
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
const Layout = () => {
    const { id } = useParams();
    const GetUser = () => {
        const [user, setuser] = useState([]);
        const bg = useColorModeValue('teal.500', 'teal.200')
        useEffect( () => { 
            async function userfunc() {
                try {
                    setuser(
                    <>
                        <Skeleton width={'100%'}>
                        <ProfileLayout username='Test' avatar='Avatar' website='Website' github='Github' description='description' />
                        </Skeleton>
                    </>
                    )
                    fetch(`https://api.somelist.tk/info?user=${id}`) 
                    .then((res) => res.json())
                    .then((json) => {
                      console.log(json.bots)
                      if (json.result == null){
                        return setuser(
                          <Alert status='warning' h={'100px'} fontSize={'20px'} borderRadius={'20px'}>
                          <AlertIcon />
                          There isn't any bots.
                        </Alert>
                        )
                      }
                      console.log(json.result)
                      setuser(
                        <ProfileLayout username={json.result.name} avatar={json.result.avatar} website={json.result.website} github={json.result.github} description={json.result.description} />
                      );
                    })
                    .catch(function(error){
                      console.error(error)
                      setuser(
                        <Alert status='error' h={'100px'} fontSize={'20px'} borderRadius={'20px'}>
                        <AlertIcon />
                        Failed to process your request.
                      </Alert>
                      )
                    })
                } catch (err) {
                    console.error(err);
                }
            }
            userfunc();
        }, []);
        return user;
    }
    const GetBots = () => {
        const [bot, setbot] = useState([]);
        const bg = useColorModeValue('teal.500', 'teal.200')
        useEffect( () => { 
            async function bots() {
                try {
                  setbot(
                    <>
                      <WrapItem>
                        <Skeleton>
                        <Card name='loading' id='000' avatar='avatar' description='descrptioneee' />
                        </Skeleton>
                      </WrapItem>
                      <WrapItem>
                        <Skeleton>
                        <Card name='loading' id='000' avatar='avatar' description='descrptioneee' />
                        </Skeleton>
                      </WrapItem>
                      <WrapItem>
                        <Skeleton>
                        <Card name='loading' id='000' avatar='avatar' description='descrptioneee' />
                        </Skeleton>
                      </WrapItem>                
                    </>
                    )
                    fetch(`https://api.somelist.tk/userbots?id=${id}`) 
                    .then((res) => res.json())
                    .then((json) => {
                      console.log(json.bots)
                      if (json.bots == null){
                        return setbot(
                          <Alert status='warning' h={'50px'} borderRadius={'10px'}>
                          <AlertIcon />
                          This user does not own any bots.
                        </Alert>
                        )
                      }
                      setbot(json.bots.map(data => <Card name={data.name} id={data.id} avatar={data.avatar} description={data.shortdesc}/>));
                    })
                    .catch(function(error){
                      console.error(error)
                      setbot(
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
            bots();
        }, []);
        return bot;
      }
  return (
    <>
      <Navbar/>
      <VStack spacing={'30px'} padding={'50px'}>
      {GetUser()}
            <Text w={'100%'} fontSize={'40px'}>User's Bots</Text>
          <Wrap w={'100%'}>
            {GetBots()}
          </Wrap>
      </VStack>
      <Outlet />
    </>
  )
};

export default Layout;