import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  ChakraProvider,
  theme,
  Box,
  Grid,
  Flex,
  Spacer,
  createStandaloneToast,
} from '@chakra-ui/react'
import React from "react";
import{Card, Navbar, Page,} from '../components/components.js'
const Contact = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()
    return <>
      <Navbar/>
      <Page>
          <Button colorScheme='red' onClick={() => setIsOpen(true)}>
        Delete Customer
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={
                function(){
                  toast({
                    title: 'Account deleted.',
                    description: "That account has been deleted.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
                  onClose()
                }} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </Page>
    </>;
  };
  const toast = createStandaloneToast()

  export default Contact;