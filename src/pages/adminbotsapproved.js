import { Outlet } from "react-router-dom";
import $ from 'jquery'
import {
  ChakraProvider,
  Box,
  Text,
  Grid,
  theme,
  Flex,
  Link,
  Spacer,
  Wrap,
  WrapItem,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  TableCaption,
  Container,
  Stack,
  Skeleton,
  Alert,
  AlertIcon,
  HStack,
  Avatar,
  Heading,
  useColorModeValue,
  toast,
  useToast,
} from '@chakra-ui/react'
import{Card, Navbar, Page,Sidenav, SideNavlink, Footer} from '../components/components.js'
import React, {useState, useEffect} from "react";
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
import {
    FiLayout, FiUsers
  } from 'react-icons/fi';
import {
    FaRobot
} from 'react-icons/fa'
const Layout = () => {
  $.ajax({
    url: 'https://api.somelist.tk/isadmin',
    method: 'POST',
    data: {token: localStorage.getItem('token')}
  }).then((data)=>{
  if(data.admin !== true){
    window.location.href = '/error?code=403&desc=You are not allowed to visit the Admin Portal. Please check your roles, or join our Support Server for help.'

  }
  })
  .catch(()=>[
    window.location.href = '/error?code=500&desc=Your access to the Admin Portal could not be validated. Please check that you are signed in, and have a valid token.'

  ])
  const toast = useToast()
  const GetBots = () => {
    const [featuredbot, setFeatured] = useState([]);
    useEffect( () => { 
        async function featuredbots() {
            try {
              setFeatured(
                <>
                <Tr>
                  <Td><Skeleton>Test bot</Skeleton></Td>
                  <Td><Skeleton>10000000</Skeleton></Td>
                  <Td><HStack spacing={'10px'}><Skeleton><Button colorScheme={'green'}>Feature</Button></Skeleton><Skeleton><Button colorScheme={'red'}>Delete</Button></Skeleton></HStack></Td>
                </Tr>
                </>
                )
                  fetch('https://api.somelist.tk/approved/'+localStorage.getItem('token')) 
                  .then((res) => res.json())
                  .then((json) => {
                    if (json.bots == null){
                      return setFeatured(
                      <Tr>
                        <Td>-</Td>
                        <Td>-</Td>
                        <Td>-</Td>
                      </Tr>                    
                      )
                    }
                    setFeatured(json.bots.map(data =>                
                    <Tr>
                      <Td>{data.name}</Td>
                      <Td>{data.id}</Td>
                      <Td><HStack spacing={'10px'}>
                      <Button colorScheme={'blue'} onClick={function(){
                        $.ajax({
                          url: `https://api.somelist.tk/feature/${localStorage.getItem('token')}`,
                          method: 'POST',
                          data: {'bot': data.id, 'reviewer': localStorage.getItem('id')}
                        }).then(()=>{
                          toast({
                            title: 'Success',
                            description: `${data.name} was updated.`,
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                          })
                          setTimeout(function(){
                            window.location.reload()
                          }, 500)
                        }).catch(()=>{
                          toast({
                            title: 'Error',
                            description: `${data.name} could not be featured due to an error.`,
                            status: 'error',
                            duration: 2000,
                            isClosable: true,
                          })
                          setTimeout(function(){
                            window.location.reload()
                          }, 500)
                        })
                      }}>{data.featured ? (
                        'Unfeature'
                      ):(
                        'Feature'
                      )}</Button><Button colorScheme={'red'} onClick={function(){
                        window.open(`/deny/${data.id}`).focus();
                      }}>Delete</Button></HStack></Td>
                    </Tr>));
                  })
                  .catch(function(error){
                    console.error(error)
                    setFeatured(
                      <Tr>
                        <Td>Error</Td>
                        <Td>Error</Td>
                        <Td>Error</Td>
                      </Tr>
                    )
                  })
              }
            catch(err){
              console.log(err)
            }
        }
          featuredbots();
    }, []);
    return featuredbot;
  }
  return (
    <>
      <Navbar/>
      <Stack direction={'row'} h={'100%'} minWidth='100%'>
      <Box minHeight={'100%'}>
      <Sidenav>
        <HStack cursor={'pointer'} spacing={'20px'} onClick={
                        function(){
                          window.location.href = `/admin`
                        }
                      }>
                        <Avatar borderRadius={'15px'} src={'https://cdn.discordapp.com/icons/875172026195783751/18b3375d7c882f35e1713fc9ef54ab9b.webp'} name={'Somelist'}/><Text fontSize={'27px'}>Somelist</Text>
                      </HStack>
                      <SideNavlink icon={FiLayout} href={'/admin'} label='Dashboard'/>
                      <SideNavlink icon={FaRobot} href={'/admin/bots'} active label='Bots'/>
                      <SideNavlink icon={FiUsers} href={'/admin/users'} label='Users'/>
        </Sidenav> 
        </Box> 
        <Box padding='50px' width={'100%'}>
          <HStack spacing={'10px'}>
          <Button borderRadius={'20px'} onClick={function(){
            window.location.href = '/admin/bots'
          }}>Unapproved</Button>
          <Button borderRadius={'20px'} colorScheme={'teal'}>Approved</Button>
          </HStack>
          <br/>
          <br/>
        <Page>
        <Table variant='simple' minWidth={'100%'}>
          <Thead>
            <Tr>
              <Th>Bot Name</Th>
              <Th>ID</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
              {GetBots()}
          </Tbody>
        </Table>
        </Page>
        </Box>
      </Stack>
      <Footer/>
      <Outlet />
    </>
  )
};

export default Layout;