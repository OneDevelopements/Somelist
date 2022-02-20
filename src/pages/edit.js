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
  const [phone] = useMediaQuery('(max-width: 800px)')
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
                      <SideNavlink icon={FiList} href={'/bot/'+id+'/edit/'} active label='Edit'/>
                      <SideNavlink icon={FiSettings} href={'/bot/'+id+'/edit/settings'} label='Settings'/>
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
                    <Formik
                    initialValues={{shortdesc: json.result.shortdesc, longdesc: json.result.longdesc, website: json.result.website, github: json.result.github, banner: json.result.banner}}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                      validateSubmission(values, actions)
                    }}
                  >
                    {(props) => (
                      <Form>
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
                        <br/>
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
    </Page>
    </Stack>
    <Footer/>
    </>
  );
}
