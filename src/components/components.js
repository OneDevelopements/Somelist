import React from 'react';
import $ from 'jquery'; 
import {useColorModeValue, Box, WrapItem, Button,   Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  Container,
  Link,
  MenuGroup,
  Center,
  useToast,
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
  IconButton,
  Icon,
  } from '@chakra-ui/react';
import "../styles.css";
import { ColorModeSwitcher } from '../ColorModeSwitcher.js';
import {Col} from 'react-bootstrap'
import { motion } from "framer-motion"
import {FaDiscord, FaEllipsisH, FaEllipsisV} from 'react-icons/fa'
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
export const Footer = props =>{
return (
<Box
  bg={useColorModeValue('gray.50', 'gray.900')}
  color={useColorModeValue('gray.700', 'gray.200')}>
  <Container
    as={Stack}
    maxW={'6xl'}
    py={4}
    spacing={4}
    justify={'center'}
    align={'center'}>
    <Image src='https://cdn.discordapp.com/icons/875172026195783751/18b3375d7c882f35e1713fc9ef54ab9b.webp' w={'50px'} h={'50px'} borderRadius={'10px'} />
    <Stack direction={'row'} spacing={6}>
      <Link href={'/'}>Home</Link>
      <Link href={'/bots'}>Bots</Link>
      <Link href={'https://docs.somelist.tk'}>Documentation</Link>
      <Link href={'/support'}>Support</Link>
    </Stack>
  </Container>

  <Box
    borderTopWidth={1}
    borderStyle={'solid'}
    borderColor={useColorModeValue('gray.200', 'gray.700')}>
    <Container
      as={Stack}
      maxW={'6xl'}
      py={4}
      direction={{ base: 'column', md: 'row' }}
      spacing={4}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'center' }}>
      <Text>© 2022 Somelist. All rights reserved</Text>
      <Stack direction={'row'} spacing={6}>
        <Link href='/discord'>
          <FaDiscord/>
        </Link>
      </Stack>
    </Container>
  </Box>
</Box>
)
}
export const BotProfileLayout = props=>{
  const toast = useToast()
  const bg = useColorModeValue('gray.100', 'gray.900');
  return (
    <Box w={'100%'} bg={bg} padding={'50px'} borderRadius={'20px'}>
      <HStack spacing={'20px'} width='100%'>
        <Avatar src={props.avatar} name={props.username} h='150px' w='150px' borderRadius={'15px'}  bg={useColorModeValue('teal.500', 'teal.200')} color={useColorModeValue('white', 'black')} size={'2xl'}/>
        <Box width='100%'>
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
          <Spacer/>
          <Button colorScheme={'teal'} size={'lg'}>Invite</Button>
          <Button size={'lg'} colorScheme={'gray'} onClick={function(){
                if (!localStorage.getItem('token')){
                  toast({
                    title: 'Warning',
                    description: 'You need to be logged in to vote!',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                  })
                } else {
                $.ajax({
                  url: `https://api.somelist.tk/vote/${props.id}`,
                  method: 'POST',
                  data: {'usertoken': localStorage.getItem('token')}
                }).then((data)=>{
                  if (data.result === 'already'){
                    return toast({
                      title: 'Warning',
                      description: "You already voted in the past 12 hours.",
                      status: 'warning',
                      duration: 2000,
                      isClosable: true,
                    })
                  }
                  toast({
                    title: 'Success',
                    description: "Your vote was successfully added.",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                  })
                  setTimeout(function(){
                    window.location.reload()
                  }, 800)
                }).catch(() => {
                  toast({
                    title: 'Error',
                    description: "An unknown error occured.",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                  })
                })
                }
          }}>Vote ( {props.votes} )</Button>
          <Menu>
            <MenuButton as={Button} padding={'24px'} leftIcon={<Icon as={FaEllipsisH}/>} w={'30px'} paddingRight={'25px'} paddingLeft={'30px'}>
            </MenuButton>
            <MenuList border={'none'} fontSize={'18px'}>
            {props.owner && <MenuItem onClick={function(){ window.location.href= `/bot/${props.id}/edit`}}>
            Edit</MenuItem>}
            {props.owner && <MenuItem>Refresh</MenuItem>}
            {!props.owner && <MenuItem>Report</MenuItem>}
            </MenuList>
          </Menu>
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
    <Box borderRadius={'10px'}  padding='50px' width={'100%'} dangerouslySetInnerHTML={{__html:props.description}}  className="break longdesc" bg={useColorModeValue('gray.100', 'gray.900')} />
    </Flex>
  )
}
export const Page = props=>{
  return (
<motion.div transition={{ ease: "easeOut", duration: .4 }} initial={{opacity: 0}} animate={{ y: -40, opacity: 1}}>
      <Box marginBottom={'40px'}/>
      {props.children}
    </motion.div>
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