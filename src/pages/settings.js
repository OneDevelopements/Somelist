import { Outlet, useParams } from "react-router-dom";
import{Card, Navbar, Page, Footer, SideNavlink,Sidenav} from '../components/components.js'
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import $ from 'jquery'; 
import {
  useToast,
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Button,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  NumberInput,
  Textarea,
  NumberInputField,
  Input,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  Stack,
  Skeleton,
  MenuItem,
  MenuList,
  useColorMode,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useMediaQuery,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiPenTool,
  FiList,
} from 'react-icons/fi';
import { Formik, Field, Form} from 'formik';


export default function Edit() {
  const toast = useToast()
  const { id } = useParams();
  console.log(id)
  const GetBot = () => {
      const [user, setuser] = useState([]);
      useEffect( () => { 
          async function userfunc() {
              try {
                  setuser(
                  <>
                      <Skeleton minH='100%'>
                      <Sidenav />
                      </Skeleton>
                  </>
                  )
                  fetch(`https://api.somelist.tk/bot?user=${id}`) 
                  .then((res) => res.json())
                  .then((json) => {
                    if (json.result == null){
                      return setuser(
                        
                      )
                    }
                    console.log(json.result)
                    setuser(
                      <Sidenav>
                      <HStack cursor={'pointer'} spacing={'20px'} onClick={
                        function(){
                          window.location.href = `/bot/${json.result.id}`
                        }
                      }>
                        <Avatar borderRadius={'15px'} src={json.result.avatar} name={json.result.name}/><Text fontSize={'27px'}>{json.result.name}</Text>
                      </HStack>
                      <SideNavlink icon={FiTrendingUp} href={'/bot/'+id+'/edit/analytics'} label='Analytics'/>
                      <SideNavlink icon={FiList} href={'/bot/'+id+'/edit'} label='Edit'/>
                      <SideNavlink icon={FiSettings} href={'/bot/'+id+'/edit/settings'} active label='Settings'/>
                    </Sidenav>                      
                    );
                  })
                  .catch(function(error){
                    console.error(error)
                    setuser(
                      
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
  const GetBotData = () => {
    const [user, setuser] = useState([]);
    useEffect( () => { 
        async function userfunc() {
            try {
                setuser(
                <>
                    <Skeleton minHeight={'100vh'} >
                    <Sidenav />
                    </Skeleton>
                </>
                )
                fetch(`https://api.somelist.tk/bot?user=${id}`) 
                .then((res) => res.json())
                .then((json) => {
                  if (json.result == null){
                    return setuser(
                      
                    )
                  }
                  console.log(json.result)
                  setuser(
                    <>
                    <Text fontSize={'30px'}>Ownership</Text>
                    <br/>
                    <Button  onClick={onOpen} variant={'outline'} colorScheme={'red'}>Delete Bot</Button>
                    </>
                  );
                })
                .catch(function(error){
                  console.error(error)
                  setuser(
                    
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
  function validateName(value) {
    let error
    if (!value) {
      error = 'Field is required'
    }
    return error
  }
  function validateSubmission (values, actions){
    console.log(values)
    values['longdesc'] = values['longdesc'].replace(/"/g, "'");
        $.ajax({
          url: 'https://api.somelist.tk/editbot?owner='+localStorage.getItem('id')+ `&id=${id}`,
          'method': 'POST',
          'data': values
        })
        .then((json) => {
          setTimeout(() => {
            actions.setSubmitting(false)
            toast({
              title: 'Success',
              description: "Your bot was edited.",
              status: 'success',
              duration: 2000,
              isClosable: true,
            })
          }, 500)
        })
        .catch((error)=>{
            console.log(error)
            setTimeout(() => {
                toast({
                  title: 'Error',
                  description: "Please check your submission again.",
                  status: 'error',
                  duration: 2000,
                  isClosable: true,
                })
                actions.setSubmitting(false)
            }, 500)
    });

}
const validationSchema = yup.object().shape({
  shortdesc: yup.string()
    .min(25, 'Minimum of 25 characters')
    .max(100, 'Maximum of 100 characters'),
  longdesc: yup.string()
    .min(300, 'Minimum of 300 characters')
});
const { isOpen, onOpen, onClose } = useDisclosure()
const [phone] = useMediaQuery('(max-width: 800px)')

  return (
    <>
    <Navbar/>
    <Stack direction={'row'} h={'100%'}>
      <Box minHeight={'100%'}>
      {GetBot()}
      </Box>
      <Page>
      <Box padding={!phone && '100px'} paddingLeft={phone && '50px'} paddingRight={phone && '20px'} width={'100%'}>
        {GetBotData()}
    </Box>
    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Are you sure?</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        <Text fontSize={'17px'} marginBottom={'10px'} marginTop={'10px'}>
                          This action is irreversable!
                        </Text>
                        </ModalBody>

                        <ModalFooter>
                        <Button marginRight={'20px'} colorScheme = 'red' variant='outline' onClick={function(){
                          $.ajax({
                            url: 'https://api.somelist.tk/delete/'+ id,
                            method: 'POST',
                            'data': {'token': localStorage.getItem('token'), 'id': localStorage.getItem('id')}
                          })
                          .then(function(result){
                            if (result.reply === 'invalid token'){
                              toast({
                                title: 'Error',
                                description: "Your token is invalid. Please log out to refresh your token.",
                                status: 'error',
                                duration: 2000,
                                isClosable: true,
                              })
                            } else {
                              window.location.href = '/'
                            }
                          })
                          .catch(function(){
                            toast({
                              title: 'Error',
                              description: "We couldn't delete your bot.",
                              status: 'error',
                              duration: 2000,
                              isClosable: true,
                            })
                          })
                        }}>Delete</Button>
                          <Button colorScheme='blue' variant={'outline'} mr={3} onClick={onClose}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
    </Page>
    </Stack>
    <Footer/>
    </>
  );
}
