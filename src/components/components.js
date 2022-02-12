import React from 'react';
import {useColorModeValue, Box, WrapItem, Button,   Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  Center,
  Avatar,
  Image,
  Wrap,
  Stack,
  HStack,
  MenuOptionGroup,
  Grid,
  Heading,
  GridItem,
  Text,
  Flex,
  MenuDivider, 
  Spacer,
  } from '@chakra-ui/react';
import "../styles.css";
import { ColorModeSwitcher } from '../ColorModeSwitcher.js';
import {Col} from 'react-bootstrap'
export const Card = props => {
  const bg = useColorModeValue('gray.100', 'gray.900');

  return (
  <WrapItem>
    <Box
    w={'300px'}
    bg={useColorModeValue('white', 'gray.800')}
    boxShadow={'2xl'}
    rounded={'md'}
    overflow={'hidden'}>
    <Image
      h={'120px'}
      w={'full'}
      src={
        props.banner
      }
      fallback={
        <Box
        h={'120px'}
        w={'full'}
        bg={bg}
        objectFit={'cover'}
      />
      }
      objectFit={'cover'}
    />
    <Flex justify={'center'} mt={-12}>
      <Avatar
        size={'xl'}
        src={
          props.avatar
        }
        bg={useColorModeValue('teal.500', 'teal.200')}
        color={useColorModeValue('white', 'black')}
        name={props.name}
        alt={'Avatar'}
      />
    </Flex>
    
    <Box p={6}>
      <Stack spacing={0} align={'center'} mb={5}>
        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
          {props.name}
        </Heading>
        <Text color={'gray.500'}>{props.description}</Text>
      </Stack>


      <Flex>
      <Button
        w={'full'}
        marginRight={'10px'}
        mt={8}
        colorScheme={'teal'}
        rounded={'md'}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        onClick={function(){
          window.location.href = `/bot/${props.id}`
        }}
        >
        View
      </Button>
      <Button
        w={'full'}
        mt={8}
        colorScheme={'gray'}
        rounded={'md'}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        onClick={function(){
          window.location.href = `/bot/${props.id}/invite`
        }}
        >
        Invite
      </Button>

      </Flex>
    </Box>
  </Box>
  </WrapItem>
  );
};
export const ProfileLayout = props=>{
  const bg = useColorModeValue('gray.100', 'gray.900');
  return (
    <Box w={'100%'} bg={bg} padding={'50px'} borderRadius={'20px'}>
      <HStack spacing={'20px'}>
        <Avatar src={props.avatar} name={props.username} h='150px' w='150px' borderRadius={'15px'}  bg={useColorModeValue('teal.500', 'teal.200')} color={useColorModeValue('white', 'black')} size={'2xl'}/>
        <Box>
          <Text fontSize={'40px'}>
            {props.username}
          </Text>
          <Text>
            {props.description}
          </Text>
          <HStack spacing={'10px'} marginTop={'50px'}>
            {props.github && <Button size={'lg'} onClick={function(){
            window.location.href= props.github
          }}>Github</Button>}
            {props.website && <Button size={'lg'} onClick={function(){
            window.location.href= props.website
          }}>Website</Button>}
          </HStack>
        </Box>
      </HStack>
    </Box>
  )
}
export const BotProfileLayout = props=>{
  const bg = useColorModeValue('gray.100', 'gray.900');
  return (
    <Box w={'100%'} bg={bg} padding={'50px'} borderRadius={'20px'}>
      <HStack spacing={'20px'}>
        <Avatar src={props.avatar} name={props.username} h='150px' w='150px' borderRadius={'15px'}  bg={useColorModeValue('teal.500', 'teal.200')} color={useColorModeValue('white', 'black')} size={'2xl'}/>
        <Box>
          <Text fontSize={'40px'}>
            {props.username}
          </Text>
          <Text>
            {props.description}
          </Text>
          <HStack spacing={'10px'} marginTop={'50px'}>
            {props.github && <Button size={'lg'} onClick={function(){
            window.location.href= props.github
          }}>Github</Button>}
            {props.website && <Button size={'lg'} onClick={function(){
            window.location.href= props.website
          }}>Website</Button>}
            {props.owner && <Button size={'lg'} onClick={function(){
            window.location.href= `/bot/${props.id}/edit`
          }}>Edit</Button>}
            {props.owner && <Button size={'lg'}>Refresh</Button>}
          </HStack>
        </Box>
      </HStack>
    </Box>
  )
}
export const Cards = props => {
  return (
    <Box padding={'50px'} margin={'50px'} width={'100%'} className='break'>
      {props.children}
    </Box>
  )
}
export const BotLayout = props =>{
  return (
    <Flex width='100%'>
    <Box  padding='50px' width={'100%'} dangerouslySetInnerHTML={{__html:props.description}}  className="break longdesc" bg={useColorModeValue('gray.100', 'gray.900')} />
    </Flex>
  )
}
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
  const color= useColorModeValue('white', 'black')
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
    <Avatar
        width={'25px'}
        height='25px'
        src={avatar}
        name={name}
        alt="User avatar"
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
    <Box width={'100%'} textAlign="center" fontSize={'23px'} bg={useColorModeValue('gray.100', 'gray.900')} zIndex={'1000'}>
      <Grid p={3}>
        <Flex h='60px;'>
        <Navbrand href='/'>
          <Image src='https://cdn.discordapp.com/icons/875172026195783751/18b3375d7c882f35e1713fc9ef54ab9b.webp' h={'50px'} w={'50px'} borderRadius={'100%'}/>
        </Navbrand>
        <Navlink href='/'>Home</Navlink>
        <Navlink href='/invite'>Bots</Navlink>
        <Navlink href='/add-bot'>Add bot</Navlink>
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