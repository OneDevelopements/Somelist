import { useRouter } from "next/dist/client/router"
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {BsBell, BsFillBellFill} from 'react-icons/bs'
import Cookie from 'js-cookie';
import { Menu, Popover, Transition } from '@headlessui/react'
import axios from 'axios'
import Image from "next/image";
import $ from 'jquery'
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
  const [sideNavOpen, setSideNavOpen] = useState(true)
  return(
  <>
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

        <div style={{
            zIndex: '101'
        }}
        className='top-0 bg-slate-900 lg:bg-transparent h-screen py-[3rem]  sidenav w-screen fixed lg:static lg:block lg:w-64 lg:py-[10rem] rounded-lg'>
        <div className='w-screen lg:w-64 backdrop-blur-xl rounded-lg py-10 px-5'>
            <div>
                <button onClick={()=>{
                    router.push('/')
                  }} style={{textAlign: 'left'}} className={router.pathname == '/' ? ' bg-sky-400/70' + ` w-full px-3 py-2 rounded-lg ` : ' hover:bg-sky-400/20' + ` w-full px-3 py-2 rounded-lg`}>Home
                </button>
                <div className='my-2'/>
                <button onClick={()=>{
                    router.push('/explore')
                }} style={{textAlign: 'left'}} className={router.pathname == '/explore' ? ' bg-sky-400/70' + ` w-full px-3 py-2 rounded-lg ` : ' hover:bg-sky-400/20' + ` w-full px-3 py-2 rounded-lg`}>Explore
                </button>

                <div className='my-2'/>
                <button onClick={()=>{
                        router.push('/add')
                    }} style={{textAlign: 'left'}} className={router.pathname == '/add' ? ' bg-sky-400/70' + ` w-full px-3 py-2 rounded-lg ` : ' hover:bg-sky-400/20' + ` w-full px-3 py-2 rounded-lg`}>Add
                </button>
                <div className='my-2'/>
                <button onClick={()=>{
                        router.push('/partners')
                    }} style={{textAlign: 'left'}} className={router.pathname == '/partners' ? ' bg-sky-400/70' + ` w-full px-3 py-2 rounded-lg ` : ' hover:bg-sky-400/20' + ` w-full px-3 py-2 rounded-lg`}>Partners
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
  useEffect(()=>{
    setusername(
      Cookie.getJSON('username')
    )
    setavatar(
      Cookie.getJSON('avatar')
    )
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
<div className="ml-auto">
    <Menu as="div" className="relative inline-block text-left">
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
              className={`text-md font-semibold ${active ? 'text-white/90' : 'text-white/70'}`}
              onClick={()=>{router.push('/profile/'+Cookie.get('id'))}}
            >
              Profile
            </button>
          )}
          </Menu.Item>
          <br/>
          <Menu.Item>
          {({ active }) => (
            <button
              className={`mt-3 text-md font-semibold ${active ? 'text-white/90' : 'text-white/70'}`}
              onClick={()=>{router.push('/logout')}}
            >
              Logout
            </button>
          )}
          </Menu.Item>
          {/* ... */}
        </Menu.Items>
      </Transition>
    </Menu>
    </div>
    <Popover className="relative ml-3">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? 'text-white/90' : 'text-white/70'}
                hidden ml-auto text-lg font-semibold hover:text-white/90`}
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
                      <a
                        key={item.name}
                        href={item.href}
                        className={`flex ${item.unread && 'outline outline-2 outline-[#6d28d9]/30'} items-center p-2 m-3 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-zinc-500/5 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50`}
                      >
                        <div className={`bg-[#6d28d9]/10 p-3 rounded flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12`}>
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
                      </a>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
    </Popover>
  </>
}

export default Header;

