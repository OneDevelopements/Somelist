import { Outlet, useParams } from "react-router-dom";
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
  NumberInput,
  Textarea,
  NumberInputField,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
import { Formik, Field, Form} from 'formik';

const Layout = () => {
    const { id } = useParams();
    const toast = useToast()
    function validateName(value) {
        let error
        if (!value) {
          error = 'Reason is required'
        }
        return error
      }
    function validateSubmission (values, actions){
        console.log(values)
            $.ajax({
              url: `https://api.somelist.tk/deny/${id}/${localStorage.getItem('token')}`,
              'method': 'POST',
              'data': values
            })
            .then((json) => {
              setTimeout(() => {
                actions.setSubmitting(false)
                toast({
                  title: 'Success',
                  description: "Bot was denied.",
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                })
                setTimeout(function(){
                  if (window.opener != null && !window.opener.closed) {
                    console.log(window.opener)
                  }
                  window.close();
                }, 1000)
              }, 500)
            })
            .catch((error)=>{
                console.log(error)
                setTimeout(() => {
                    toast({
                      title: 'Error',
                      description: "Bot could not be denied.",
                      status: 'error',
                      duration: 2000,
                      isClosable: true,
                    })
                    actions.setSubmitting(false)
                    setTimeout(function(){
                      if (window.opener != null && !window.opener.closed) {
                        window.opener.location.reload()
                      }
                      window.close();
                    }, 1000)
                }, 500)
        });
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
          <br/>
          <br/>
        <Page>
        <Formik
            initialValues={{ reason: '' }}
            onSubmit={validateSubmission}
            >
            {(props) => (
                <Form>
                <Field name='reason' validate={validateName}>
                    {({ field, form }) => (
                    <FormControl isInvalid={form.errors.reason && form.touched.reason}>
                        <FormLabel htmlFor='reason'>Reason</FormLabel>
                        <Input {...field} id='reason' placeholder='reason' />
                        <FormErrorMessage>{form.errors.reason}</FormErrorMessage>
                    </FormControl>
                    )}
                </Field>
                <Button
                    mt={4}
                    colorScheme='teal'
                    isLoading={props.isSubmitting}
                    type='submit'
                >
                    Submit
                </Button>
                </Form>
            )}
            </Formik>
        </Page>
        </Box>
      </Stack>
      <Footer/>
      <Outlet />
    </>
  )
};

export default Layout;