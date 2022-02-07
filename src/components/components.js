import React from 'react';
import {useColorModeValue, Box, GridItem, Button,   Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  Grid,
  Flex,
  MenuDivider, 
  Spacer,
  Image, } from '@chakra-ui/react';
import "../styles.css";
import { ColorModeSwitcher } from '../ColorModeSwitcher.js';

export const Card = props => {
  const bg = useColorModeValue('gray.100', 'gray.700');
  return (
    <GridItem>   
    <Box padding='50px;' h='300px;' className='Cardhover' borderRadius={'60px;'} bg={bg} margin={'20px'} transform={'translateY(0px)'} transition={'linear all 0.3s'} _hover={{transform: 'translateY(-20px)'}} textAlign={'center'}>
        {props.children}
    </Box>
    </GridItem>
  );
};
export const Navlink = props => {
  return (
    <Box marginLeft={'20px'} marginRight={'20px'} fontSize={'20px'}>
  <Button h={'40px'} margin={'0'} fontSize={'19px'}onClick={function(){
    window.location.href = props.href
  }} colorScheme='teal' variant='ghost'>
    {props.children}
  </Button>
    </Box>
  );
};
export const Navbrand = props => {
  return (
  <Box fontSize={'25px'}>
  <a href={props.href}>
    {props.children}
  </a>
  </Box>
  );
};
export const Profile = props => {
  var id = localStorage.getItem('id')
  if (id == null){
    return(
    <Button colorScheme='teal' variant='solid' onClick={function(){
      window.location.href = 'https://api.somelist.tk/login'
    }}>
      Login
    </Button>
    )
  }
  const name = localStorage.getItem('name')
  const avatar = localStorage.getItem('avatar')
  return (
    <Menu colorScheme='teal'>
    <MenuButton colorScheme='teal' as={Button}>
    <Flex>
    <Image
        height={'25px'}
        borderRadius="full"
        src={avatar}
        alt="User avatar"
        width={'25px'}
        margin={'0'}
        padding={'0'}
        marginRight={'10px'}
      />{name}
    </Flex>
    </MenuButton>
    <MenuList fontSize={'17px'}>
      <MenuItem onClick={function(){
        window.location.href = '/profile/' + id
      }}>Profile</MenuItem>
      <MenuItem onClick={function(){
        window.location.href = '/admin'
      }}>Admin Panel</MenuItem>
      <MenuDivider/>
      <MenuItem onClick={function(){
        window.location.href ='/logout'
      }}>Logout</MenuItem>
    </MenuList>
  </Menu>
  );
};
export const Navbar = props => {
  return (
    <nav>
    <Box textAlign="center" fontSize={'23px'} bg={useColorModeValue('gray.100', 'gray.900')}>
      <Grid p={3}>
        <Flex h='60px;'>
        <Navbrand href='/'>
          <Image src='https://cdn.discordapp.com/icons/875172026195783751/18b3375d7c882f35e1713fc9ef54ab9b.webp' h={'50px'} w={'50px'} borderRadius={'100%'}/>
        </Navbrand>
        <Navlink href='/'>Home</Navlink>
        <Navlink href='/invite'>Bots</Navlink>
        <Navlink href='/support'>Add bot</Navlink>
        <Navlink href='/docs'>Servers</Navlink>
        <Spacer />
        <Profile></Profile>
        <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>

      </Grid>
    </Box>
    </nav>
  );
};
export const ServerList = props => {
  var id = localStorage.getItem('id')
  if (id == null){
    return(
    <Button colorScheme='teal' variant='solid' onClick={function(){
      window.location.href = 'https://api.ava-bot.xyz/login'
    }}>
      Login
    </Button>
    )
  }
  const name = localStorage.getItem('name')
  const avatar = localStorage.getItem('avatar')
  return (
    <Menu>
    <MenuButton as={Button}>
    <Flex>
    <Image
        height={'25px'}
        borderRadius="full"
        src={avatar}
        alt="User avatar"
        width={'25px'}
        margin={'0'}
        padding={'0'}
        marginRight={'10px'}
      />{name}
    </Flex>
    </MenuButton>
    <MenuList>
      <MenuItem isDisabled>Profile</MenuItem>
      <MenuItem isDisabled>Servers</MenuItem>
      <MenuDivider/>
      <MenuItem onClick={function(){
        window.location.href ='/logout'
      }}>Logout</MenuItem>
    </MenuList>
  </Menu>
  );
};