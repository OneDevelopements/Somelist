import { Outlet } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Text,
  HStack,
  Grid,
  VStack,
  Alert,
  Wrap,
  Icon,
  AlertIcon,
  theme,
  Input,
  Spinner,
  Tooltip,
  Flex,
  Link,
  Spacer,
  Container,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  useColorModeValue,
  useToast,
  WrapItem,
  Skeleton
} from '@chakra-ui/react'
import { FaRegStar, FaCaretUp, FaStar } from 'react-icons/fa';
import { mode } from '@chakra-ui/theme-tools'
import{Card, Navbar, Cards, Page} from '../components/components.js'
import {React, useState , useEffect} from "react";
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
import '../styles.css';
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
              fetch('https://api.somelist.tk/bots') 
              .then((res) => res.json())
              .then((json) => {
                console.log(json.bots)
                if (json.bots == null){
                  return setbot(
                    <Alert status='warning' h={'50px'} borderRadius={'10px'}>
                    <AlertIcon />
                    There isn't any bots.
                  </Alert>
                  )
                }
                setbot(json.bots.map(data => <Card name={data.name} id={data.id} avatar={data.avatar} description={data.shortdesc}/>));
              })
              .catch(function(error){
                console.error(error)
                setbot(
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
      bots();
  }, []);
  return bot;
}
const GetFeaturedBots = () => {
  const [featuredbot, setFeatured] = useState([]);
  const bg = useColorModeValue('teal.500', 'teal.200')
  useEffect( () => { 
      async function featuredbots() {
          try {
            setFeatured(
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
              fetch('https://api.somelist.tk/bots?type=featured') 
              .then((res) => res.json())
              .then((json) => {
                if (json.bots == null){
                  return setFeatured(
                    <Alert status='warning' h={'50px'} borderRadius={'10px'}>
                    <AlertIcon />
                    There isn't any bots.
                  </Alert>
                  )
                }
                setFeatured(json.bots.map(data => <Card name={data.name} id={data.id} avatar={data.avatar} description={data.shortdesc} featured={<Tooltip openDelay={100} label='Featured' hasArrow  fontSize='18px' paddingLeft={'20px'} paddingRight={'20px'} borderRadius={'10px'} placement='top'><span><Icon as={FaStar}/></span></Tooltip>}/>));
              })
              .catch(function(error){
                console.error(error)
                setFeatured(
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
      featuredbots();
  }, []);
  return featuredbot;
}
const Home = () => {
    const toast = useToast()
    fetch('https://api.somelist.tk/bots')
    .then((res) => res.json())
    .then((json) => {
      localStorage.setItem('bots', json.bots)
    });
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
        <Page>
        <Cards>
        <Text fontSize={'40px'}><span><Icon as={FaStar}/></span> Featured Bots</Text>
          <br/>
          <br/>
          <Wrap>
          {GetFeaturedBots()}
          </Wrap>
        </Cards>
        <Cards>
        <Text fontSize={'40px'}><span><Icon as={FaCaretUp}/></span> Top Voted Bots</Text>
          <br/>
          <br/>
          <Wrap>
          {GetBots()}
          </Wrap>
        </Cards>
        </Page>
    </>
  )
};

export default Home;