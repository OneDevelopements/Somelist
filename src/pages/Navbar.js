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
  Container,
  Stack,
  Heading,
} from '@chakra-ui/react'
import{Card, Navbar} from '../components/components.js'
import React from "react";
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
const NavbarPage = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  )
};

export default NavbarPage;