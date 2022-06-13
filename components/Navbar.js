import { useRouter } from "next/dist/client/router"
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {BsBell, BsFillBellFill} from 'react-icons/bs'
import Cookie from 'js-cookie';
import { Menu, Popover, Switch, Transition } from '@headlessui/react'
import axios from 'axios'
import Image from "next/image";
import $ from 'jquery'
import isScrolledIntoView from "./isScrolledIntoView";
import Tippy from "@tippyjs/react";
import { AnimatePresence, motion } from "framer-motion";
import getConfig from 'next/config';
import ToggleSwitch from "./ToggleSwitch";

class Header extends React.Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool
    };

    UNSAFE_componentWillMount() {
        if(this.props.isLoggedIn){
            return this.isLoggedIn = this.props.isLoggedIn;
        }else{
            if(this.props.children) return this.isLoggedIn = this.props.children.isLoggedIn;
        }
    }
    render(){
        return(
          <div className="fixed py-6 bg-[#0B0A15]/50 px-4 flex w-full h-20 items-center" style={{zIndex: '101', top:'0'}} >      
            <div className='hidden lg:block'>
            <NormalNav/>
            </div>
            <div>

            <SideNav/>
            </div>
            { this.isLoggedIn ?
              <SecretNav/>
              :
              <button className='ml-auto text-lg font-semibold text-white/70 hover:text-white/90' onClick={() => { window.location.replace(`https://api.somelist.tk/login`)}}>
                 Login
              </button>                      
            }
          </div>
                    
        )

    }
}

const SideNav= (props) =>{
  const router = useRouter()
  return(
  <>
            

        <div style={{
            zIndex: '99'
        }}
        className='top-0 bg-[#0B0A15]/50 backdrop-blur-xl lg:bg-transparent h-screen py-[3rem]  sidenav w-screen fixed lg:static lg:hidden lg:w-64 lg:py-[10rem] rounded-lg'>
        <div className='w-screen lg:w-64 backdrop-blur-xl rounded-lg py-10 px-5'>
            <div>
                <button onClick={()=>{
                    router.push('/')
                  }} style={{textAlign: 'left'}} className={router.pathname == '/' ? ' bg-sky-400/70' + ` w-full px-3 py-4 rounded-lg text-lg` : ' hover:bg-sky-400/20' + ` w-full px-3 py-4 rounded-lg text-lg`}>Home
                </button>
                <div className='my-5'/>
                <button onClick={()=>{
                    router.push('/explore')
                }} style={{textAlign: 'left'}} className={router.pathname == '/explore' ? ' bg-sky-400/70' + ` w-full px-3 py-4 rounded-lg text-lg` : ' hover:bg-sky-400/20' + ` w-full px-3 py-4 rounded-lg text-lg`}>Explore
                </button>

                <div className='my-5'/>
                <button onClick={()=>{
                        router.push('/add')
                    }} style={{textAlign: 'left'}} className={router.pathname == '/add' ? ' bg-sky-400/70' + ` w-full px-3 py-4 rounded-lg text-lg` : ' hover:bg-sky-400/20' + ` w-full px-3 py-4 rounded-lg text-lg`}>Add
                </button>
                <div className='my-5'/>
                <button onClick={()=>{
                        router.push('/partners')
                    }} style={{textAlign: 'left'}} className={router.pathname == '/partners' ? ' bg-sky-400/70' + ` w-full px-3 py-4 rounded-lg text-lg` : ' hover:bg-sky-400/20' + ` w-full px-3 py-4 rounded-lg text-lg`}>Partners
                </button>
            </div>
        </div>
        </div>
      </>
    )
}

const NormalNav = (props) =>{
  const router = useRouter()
  return (<>
    <button onClick={() => {router.push('/')}} className='text-lg font-semibold text-white/70 hover:text-white/90'>
      Home
    </button>
    <button onClick={() => {router.push('/explore')}} className='ml-5 text-lg font-semibold text-white/70 hover:text-white/90'>
      Explore
    </button>
    <button onClick={() => {router.push('/add')}} className='ml-5 text-lg font-semibold text-white/70 hover:text-white/90'>
      Add
    </button>
    <button onClick={() => {router.push('/partners')}} className='ml-5 text-lg font-semibold text-white/70 hover:text-white/90'>
      Partners
    </button>
  </>)
}


const SecretNav = (props) =>{
  const router = useRouter()
  const [username, setusername] = useState('')
  const [avatar, setavatar] = useState('')
  const [settingsIsOpen, setSettingsIsOpen] = useState(false)
  const [highgraphs, sethighgraphics] = useState(false)
  const { generateBuildId } = getConfig();
  useEffect(()=>{
    setusername(
      Cookie.getJSON('username')
    )
    setavatar(
      Cookie.getJSON('avatar')
    )
    Cookie.get('HighGraphics') ? sethighgraphics(true) : sethighgraphics(false)
    console.log(highgraphs)
  }, [])
  const solutions = [
    {
      name: 'Warning',
      description: 'You have been warned...',
      unread : true,
    },
    {
      name: 'Bot approved',
      description: 'Your bot has been approved on Somelist!',
      href:'/bot/undefined'
    },
    {
      name: 'Bot submitted',
      description: 'Your bot has been submitted! Our reviewers will loom through it.',
    },
  ]
  return <>
  <AnimatePresence>
  {settingsIsOpen && 
  <div className={'w-screen h-screen'}>
    <motion.div 
      key='settingsbackdrop'
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}>      
      <div style={{zIndex: '100'}} className={'left-0 top-0 fixed items-center justify-center w-screen h-screen bg-[#0B0A15]/70 backdrop-blur-lg'}>
      <motion.div 
      key='settingsmodal'
      initial={{ opacity: 0, y: -300 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 500 }}>
      <div className='flex items-center justify-center w-screen h-screen'>
            <div className='relative p-6 pt-2 rounded-lg bg-[#0B0A15] w-screen max-w-[800px] flex items-center justify-center flex-col'>
            <div className="w-full flex items-center">
              <h1 className='mt-4 text-2xl font-semibold'>Settings</h1>
              <button onClick={()=> setSettingsIsOpen(false)} className="ml-auto text-2xl text-white/50 hover:text-white"><i className="fas fa-times"></i></button>
            </div>
            <div className="mt-5 h-[300px] overflow-auto w-full">
              <div className="w-full flex items-center">
                <p>Turn on High Graphics <Tippy content='Set a background image as the background' placement='top'><i className="far fa-question-circle text-white/50 hover:text-white"></i></Tippy></p>
                <Switch
                  checked={highgraphs}
                  onChange={(e) => {sethighgraphics(e); e == true ? Cookie.set('HighGraphics', true) : Cookie.remove('HighGraphics'); window.location.reload()}}
                  className={`${highgraphs ? 'bg-sky-600' : 'bg-gray-900'}
                    ml-auto inline-flex h-[30px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span className="sr-only">Toggle switch</span>
                  <span
                    aria-hidden="true"
                    className={`${highgraphs ? 'translate-x-6' : 'translate-x-0'}
                      pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
              <div className="w-full flex items-center mt-4">
                <ToggleSwitch label='Use DirectVoice' tooltip='Triggers Voice Control when you say "Hey Cosmic. This is not reccommended as this is in BETA.' defaultSelected={Cookie.get('directVoice')} onChange={(e) => {
                if(Cookie.get('directVoice')){
                  Cookie.remove('directVoice')
                } else {
                  Cookie.set('directVoice', true)
                }
                window.location.reload()
                }
              }
                />
              </div>
              <p className="mt-4 text-white/50">Current branch: {process.env.NEXT_PUBLIC_BRANCH.toUpperCase()}</p>
            </div>
          </div>
        </div>
        </motion.div>
      </div>
      </motion.div>
  </div>

  }
  </AnimatePresence>
  <div className="ml-auto flex items-center">
    <Popover className="hidden relative ml-3">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? 'text-white/90' : 'text-white/70'}
                ml-auto text-lg font-semibold hover:text-white/90`}
            >
              <BsFillBellFill size={25} />
            </Popover.Button>
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="backdrop-blur absolute right-0 w-96 mt-2 origin-top-right bg-[#E3E5E8] dark:bg-[#080712]/60 rounded p-3 py-4">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="flex flex-col">
                    {solutions.map((item) => (
                      <div
                        key={item.name}
                        onClick={() =>{
                          if (item.href) {
                            window.location.href = item.href
                          }
                        }}
                        className={`flex ${item.href && 'cursor-pointer'}  ${item.unread && 'outline outline-2 outline-blue-500'} items-center p-2 m-3 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-zinc-500/5 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50`}
                      >
                        <div className={`bg-blue-500/20 p-3 rounded flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12`}>
                          <BsBell size={50}/>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-white/90">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
    </Popover>
    <Menu as="div" className="ml-4 relative inline-block text-left">
      <Menu.Button className='ml-auto text-lg font-semibold text-white/70 hover:text-white/90'>
        <img src={avatar} width='50' height='50' className='rounded-full' />
      </Menu.Button>
      {/* Use the Transition component. */}
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className={'backdrop-blur absolute right-0 w-56 mt-2 origin-top-right bg-[#E3E5E8]/70 dark:bg-[#080712]/70 rounded p-3 py-4'} style={{position: 'aboslute'}}>
          <Menu.Item>
          {({ active }) => (
            <button
              className={`my-2 w-full text-left text-lg ${active ? 'text-blue-500' : 'text-white/70'}`}
              onClick={()=>{router.push('/profile/'+Cookie.get('id'))}}
            >
              <i className="far fa-user text-blue-500"/> Profile
            </button>
          )}
          </Menu.Item>
          <br/>
          <Menu.Item>
          {({ active }) => (
            <button
              className={`my-2 w-full text-left text-lg ${active ? 'text-blue-500' : 'text-white/70'}`}
              onClick={()=>setSettingsIsOpen(true)}
            >
              <i className="far fa-cog text-blue-500"/> Settings
            </button>
          )}
          </Menu.Item>
          <br/>
          <Menu.Item>
          {({ active }) => (
            <button
              className={`my-2 w-full text-left text-lg ${active ? 'text-blue-500' : 'text-white/70'}`}
              onClick={()=>{router.push('/store')}}
            >
              <i className="far fa-store-alt text-blue-500"/> Store
            </button>
          )}
          </Menu.Item>
          <br/>
          <Menu.Item>
          {({ active }) => (
            <button
              className={`my-2 w-full text-left text-lg ${active ? 'text-blue-500' : 'text-white/70'}`}
              onClick={()=>{router.push('/logout')}}
            >
              <i className="far fa-sign-out text-blue-500"/> Logout
            </button>
          )}
          </Menu.Item>
          {/* ... */}
        </Menu.Items>
      </Transition>
    </Menu>
    </div>
  </>
}

const HeaderB = ({isLoggedIn}) => {
  const [navbar, setNavbar] = useState(false)
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const changeBackground = ()=>{
    if (window.scrollY >= 5) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  useEffect(()=>{
    window.addEventListener("scroll", changeBackground)
  }, [])
  useEffect(()=>{
    if(!isLoggedIn){
      if(process.env.NEXT_PUBLIC_BRANCH == 'beta'){
        window.location.href = 'https://api.somelist.tk/login?branch=beta'
      }
    }
  }, [])
          console.log(isLoggedIn)
          return(
          <>
          <SideNav sideNavOpen={sideNavOpen}/>
          <div className={`transiton ease-in-out duration-300 ${navbar ? `${navigator.userAgent.indexOf("Firefox") > 0 ? 'bg-gray-900' : 'bg-gray-600/20'} backdrop-blur-xl py-3 px-12 rounded-full top-10 left-5 right-5` : 'rounded-none py-6 px-4 w-full left-0 right-0 top-0'} fixed flex h-20 items-center`} style={{zIndex: '101', top:'0'}} >      
            <div className='hidden lg:block'>
            <NormalNav/>
            </div>
            <div>
            <button
              onClick={
                sideNavOpen ? 
                ()=>{
                      $('.sidenav').removeClass('sidenav-show')
                      setSideNavOpen(false)
                  } : 
                () =>{
                    $('.sidenav').addClass('sidenav-show')
                  setSideNavOpen(true)
              }}
              style={{
                  zIndex: '102'
              }}
              className={'relative block lg:hidden bg-sky-600 text-xl rounded-lg p-4 w-14 h-min-content'}
              >            
              {!sideNavOpen ? 
              <i className='fas fa-bars'/> 
              : 
              <i className='fas fa-times'/> 
              }
            </button>
            </div>
            { isLoggedIn ?
              <SecretNav/>
              :
              <button className='ml-auto text-lg font-semibold text-white/70 hover:text-white/90' onClick={() => { window.location.replace(`https://api.somelist.tk/login?branch=`+process.env.NEXT_PUBLIC_BRANCH)}}>
                 Login
              </button>                      
            }
          </div>
          </>
          )
}



export default HeaderB;

