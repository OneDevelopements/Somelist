import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Redirect, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Callback from './pages/callback';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Submission from './pages/submit';
import Admin from './pages/admin';
import AdminBots from './pages/adminbots';
import AdminBotsApproved from './pages/adminbotsapproved';
import Deny from './pages/deny';
import Profile from './pages/profile';
import Bot from './pages/bot';
import Edit from './pages/edit.js'
import Settings from './pages/settings'
import $ from 'jquery'; 
import {flashless, FlashlessScript} from 'chakra-ui-flashless';

import { AnimatePresence, motion } from "framer-motion"
import {
  ChakraProvider,
  extendTheme,
  useColorMode,
  Box,
} from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { getAutomaticTypeDirectiveNames } from 'typescript';



const ForceDarkMode = props => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === "light"){
      if(!localStorage.getItem('chakra-ui-color-mode')){
        toggleColorMode();
      }
    };
  }, [colorMode]);

  return props.children;
}
const AdminRoute = props =>{
  $.ajax({
    url: 'https://api.somelist.tk/isadmin'
  })
  .then((result)=>{
    <Route exact path={props.path}>
      {result.admin ? <Navigate to="/error?code=403?desc=You are not allowed to view this page." /> : props.element}
    </Route>
  }
  )
}
function App() {
  if(localStorage.getItem('token')){
    if (window.location.pathname === '/callback'){
      console.log('callback')
    } else {    
      $.ajax({
        url: 'https://api.somelist.tk/verify/token?token='+ localStorage.getItem('token')
      }).then((result)=>{
        console.log(result)
        if (result.reply === 'noexist'){
          window.location.href = '/logout'
        }
      })
    }
  }
  return (
    <ChakraProvider>
    <ForceDarkMode>
    <BrowserRouter>
    <AnimatePresence>
      <Routes>
          <Route index element={<Home />}/>
          <Route path='/callback' element={<Callback/>} />
          <Route path='/error' element={<Error/>} />
          <Route path='/bot/:id/edit' element={<Edit/>} />
          <Route path='/bot/:id/edit/settings' element={<Settings/>} />
          <Route path='/add-bot' element={<Submission/>} />
          <Route path="/deny/:id" element={<Deny />} />
          <Route path='/logout' element={<Logout/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/admin/bots' element={<AdminBots/>} />
          <Route path='/admin/bots/approved' element={<AdminBotsApproved/>} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/bot/:id" element={<Bot />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
      </AnimatePresence>
    </BrowserRouter>
    </ForceDarkMode>
  </ChakraProvider>
  );
}

export default App;

