import { Outlet } from "react-router-dom";
import * as yup from 'yup';
import $ from 'jquery'; 
import {
    ChakraProvider,
    Box,
    Text,
    Grid,
    theme,
    NumberInput,
    Textarea,
    NumberInputField,
    Input,
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
    useToast
  } from '@chakra-ui/react'
import { Formik, Field, Form} from 'formik';
import{Card, Navbar} from '../components/components.js'
import React from "react";
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
const Submission = () => {
    if (!localStorage.getItem('token')){
      window.location.href = 'https://api.somelist.tk/login'
    }
    const toast = useToast()
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
              url: 'https://api.somelist.tk/submitbot?owner='+localStorage.getItem('id'),
              'method': 'POST',
              'data': values
            })
            .then((json) => {
              if (json.reply === 'exists'){
                toast({
                    title: 'Error',
                    description: "That ID is already registered.",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
                return actions.setSubmitting(false)
              }
              setTimeout(() => {
                actions.setSubmitting(false)
                toast({
                  title: 'Success',
                  description: "Your bot was submitted.",
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                })
                setTimeout(()=>{
                  window.location.hef = `/bot/${json.id}`
                }, 100)
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
    return (
        <>
        <Navbar/>
    <Box padding={'150px'} margin={'100px'} paddingTop = {'75px'} marginTop={'50px'} borderRadius={'30px'} bg={useColorModeValue('gray.100', 'gray.800')}>
    <Heading fontSize={'50px'}>
        Bot submission
    </Heading>
    <br/>
        <Formik
      initialValues={{id: '', shortdesc: '', longdesc: ''}}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        validateSubmission(values, actions)
      }}
    >
      {(props) => (
        <Form>
          <Field name='id' validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.id && form.touched.id}>
                <FormLabel htmlFor='id'>Bot ID</FormLabel>
                <Input {...field} id='id' placeholder='Bot ID' />
                <FormErrorMessage>{form.errors.id}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <br />
          <Field name='shortdesc' validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.shortdesc && form.touched.shortdesc}>
                <FormLabel htmlFor='shortdesc'>Short Description</FormLabel>
                <Input {...field} id='shortdesc' placeholder='A brief description about your bot.' />
                <FormErrorMessage>{form.errors.shortdesc}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <br/>
          <Field name='longdesc' validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.longdesc && form.touched.longdesc}>
                <FormLabel htmlFor='longdesc'>Long Description (Markdown and HTML supported)</FormLabel>
                <Textarea h={'200px'} {...field} id='longdesc' placeholder='A long and lengthy description about your bot.' />
                <FormErrorMessage>{form.errors.longdesc}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <br/>
          <Field name='banner'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.banner && form.touched.banner}>
                <FormLabel htmlFor='banner'>Banner</FormLabel>
                <Input {...field} id='banner' placeholder='https://i.imgur.com/abcdef' />
                <FormErrorMessage>{form.errors.banner}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <br/>
          <Field name='website'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.website && form.touched.website}>
                <FormLabel htmlFor='website'>Website</FormLabel>
                <Input {...field} id='website' placeholder='https://somelist.tk' />
                <FormErrorMessage>{form.errors.website}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='github'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.github && form.touched.github}>
                <FormLabel htmlFor='github'>Github Repository</FormLabel>
                <Input {...field} id='github' placeholder='https://github.com/somelist/somelist' />
                <FormErrorMessage>{form.errors.github}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <br/>
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
    </Box>
        <Outlet />
        </>
    )
};

export default Submission;