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
  Wrap,
  WrapItem,
  Container,
  Stack,
  HStack,
  Avatar,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'
import{Card, Navbar, Page,Sidenav, SideNavlink, Footer} from '../components/components.js'
import React from "react";
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
import $ from 'jquery'
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

  return (
    <>
      <Navbar/>
      <Stack direction={'row'} h={'100%'}>
      <Box minHeight={'100%'}>
      <Sidenav>
        <HStack cursor={'pointer'} spacing={'20px'} onClick={
                        function(){
                          window.location.href = `/admin`
                        }
                      }>
                        <Avatar borderRadius={'15px'} src={'https://cdn.discordapp.com/icons/875172026195783751/18b3375d7c882f35e1713fc9ef54ab9b.webp'} name={'Somelist'}/><Text fontSize={'27px'}>Somelist</Text>
                      </HStack>
                      <SideNavlink icon={FiLayout} href={'/admin'} active label='Dashboard'/>
                      <SideNavlink icon={FaRobot} href={'/admin/bots'} label='Bots'/>
                      <SideNavlink icon={FiUsers} href={'/admin/users'} label='Users'/>
        </Sidenav> 
        </Box> 
        <Page>
            <Wrap padding={'50px'} spacing={'30px'}>
                <WrapItem>
                      <Box textAlign={'center'} paddingTop={'100px'} paddingBottom={'100px'} width='300px' mar bg={useColorModeValue('gray.100', 'gray.800')} padding='30px;' borderRadius={'10px'}>
                        <Text fontSize={'23px'}>Unapproved Bots</Text>
                        <Text color={'gray.500'} fontSize={'20px'}>
                            00000
                        </Text>
                      </Box>
                </WrapItem>
                <WrapItem>
                      <Box textAlign={'center'} paddingTop={'100px'} paddingBottom={'100px'} width='300px' mar bg={useColorModeValue('gray.100', 'gray.800')} padding='30px;' borderRadius={'10px'}>
                        <Text fontSize={'23px'}>Approved Bots</Text>
                        <Text color={'gray.500'} fontSize={'20px'}>
                            00000
                        </Text>
                      </Box>
                </WrapItem>
            </Wrap>
        </Page>
      </Stack>
      <Footer/>
      <Outlet />
    </>
  )
};

export default Layout;