import 'regenerator-runtime/runtime'
import { useEffect } from 'react';
import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";
import Head from 'next/head';
import { useState } from 'react';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import BotLayout from '../components/BotLayout';
import { ToastContainer, toast } from 'react-toastify';
import Script from 'next/script';
import $ from 'jquery'
import HeaderB from '../components/Navbar';
import Image from 'next/image';
import 'tippy.js/dist/tippy.css'; // optional
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '../styles/tippy.css';
import { AnimatePresence, motion } from 'framer-motion';
import getConfig, { setConfig } from 'next/config';
import { Bars } from 'react-loader-spinner';
import { route } from 'next/dist/server/router';

function MyApp({ Component, pageProps }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const [notifications, setnotifications] = useState([{icon: '', color: '', title: '', description: ''}])
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState({icon: 'fad fa-sync', color: 'test', title: 'test', description: 'test'})
  const [selectedNotifNumber, setSelectedNotifNumber] = useState(0)
  const [slide, setslide] = useState(0)
  const [voice, setvoice] = useState(false)
  const [message, setmessage] = useState(false)
  const [tryagain, settryagain] = useState(false)
  const directvoice = Cookie.get('directVoice')
  const [help, sethelp] = useState(false)
  const commands = [
    {
      command: [`go to *`, `open *`, `switch to *`,],
      callback: (page) => {
        const pages = [
          'marketplace', 'home', 'store', 'profile', 'add bot', 'bot addition'
        ]
        if(pages.includes(page.toLowerCase())){
          setmessage(`Redirecting to ${page}`)
          const fpage = page.toLowerCase()
          var redirect = ''
          if (fpage == 'marketplace' || fpage == 'store'){
            redirect = 'store'
          } else if (fpage == 'home'){
            redirect = ''
          } else if (fpage == 'profile'){
            if (Cookie.get('token')){
              redirect = 'profile/'+Cookie.get('id')
            } else {
              return setmessage('Login is required to visit this page.')
            }
          } else if (fpage == 'add bot' || fpage == 'bot adittion'){
            if (Cookie.get('token')){
              redirect = '/add'
            } else {
              return setmessage('Login is required to visit this page.')
            }          
          }
          router.push(`/${redirect}`)
          setTimeout(()=>{
            setvoice(false)
          }, 1000)
        } else {
          setmessage(
          `Can't find page: ${page}`
          )
          settryagain(true)
        }
      }
      
    },
    {
      command: [`go to`, `open`, `switch to`],
      callback: () => {
        setmessage('Please specify a page.')
        settryagain(true)
      }
    },
    {
      command: [`search for *`, `look for *`, `find *`],
      callback : (bot) =>{
        setmessage('Redirecting to look for bot')
        if (router.pathname.includes('/')) {
          router.push({
            pathname: '/',
            query: { q: bot }
          }, 
          undefined, { shallow: true }
          )
        } else {
          router.push('/?q='+bot)

        }
        setTimeout(()=>{
          setvoice(false)
        }, 1000)
      }
    },
    {
      command: ['add a bot', 'add a robot'],
      callback: () =>{
        setmessage('Redirecting to add bot')
        router.push('/add')
        setTimeout(()=>{
          setvoice(false)
        }, 1000)
      }
    },
    {
      command: ['i need help', 'help', 'commands', 'view commands', 'view help'],
      callback: () =>{
        setmessage('These are my commands:')
        sethelp(true)
        settryagain(true)
      }
    }
  ]
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands});
  useEffect(()=>{
    if (listening == true){
      setmessage(null)
      sethelp(false)
      settryagain(false)
    }
  }, [listening])
  useEffect(()=>{
    async function Change(){
    resetTranscript()
    if (voice == false){
      if(directvoice){
        await SpeechRecognition.startListening({continuous: true})
      }
    }
  }
  Change()
  }, [voice])
  useEffect(()=>{
    if (transcript != ''){
      if (transcript.toLowerCase().includes('hey cosmic')){
        setvoice(true)
      }
    }
  }, [transcript])
  toast.configure()
  useEffect(()=>{
    document.documentElement.classList.add('dark')
    document.documentElement.setAttribute("data-theme", "violet")
  }, [])
  useEffect(()=>{
    if (!Cookie.get('welcome')){
      setIsOpen(true)
    }
  }, [])
  useEffect(()=>{
    if(Cookie.get('directVoice')){
      SpeechRecognition.startListening({continuous: directvoice})
    }
    if(Cookie.get('HighGraphics')){
      console.log('high graphics active')
      $('#gradient').addClass('high-graphs')
    }
  }, [])
  const [loaded, setloaded] = useState(false)
  
  useEffect(()=>{
    const loadFallback = setTimeout(()=>{
      $('.preloader').addClass('preloaded')
      setloaded(true)
    }, 5000)
    window.addEventListener('load', function () {
      console.log('loaded')
      if (loaded == false){
        clearTimeout(loadFallback)
        $('.preloader').addClass('preloaded')
        setloaded(true)
      }
    }) 
  }, [])
  const nextNotif = () =>{
    setSelectedNotifNumber((number) => number + 1)
    if (selectedNotifNumber + 1 == notifications.length){
      setNotificationsOpen(false)
    } else {
      setSelectedNotification(notifications[selectedNotifNumber])
    }
  }
  useEffect(()=>{
    console.log(selectedNotifNumber)
  }, [selectedNotifNumber])
  useEffect(()=>{
    if (!router.isReady) return;
    if(Cookie.get("token")){
      console.log('running')
      $.ajax({
        url: 'https://api.somelist.tk/users/notifications?token='+Cookie.get('token')
      }).then((res)=>{
        if(res.reply.length >= 1){
          setnotifications(res.reply)
        }
      })
    }
  }, [router.isReady])
  useEffect(()=>{
    setSelectedNotification(notifications[0])
    console.log(notifications)
    if(notifications[0].icon != ''){
      setNotificationsOpen(true)
    }
  }, [notifications])
  if (router.pathname == '/bot/[id]/edit' || router.pathname == '/bot/[id]/analytics'){
    console.log(router.query.id)
  }
  return  <>
    <Head>
        <title>Somelist | Your #1 trusted Discord Bot List</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet"/>
        <link href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css" rel="stylesheet"/>
        <link rel="shortcut icon" type="image/png" href="https://i.imgur.com/eSgi8jm.png" />
        <meta name="google-site-verification" content="7gLQjji2gsG8jRarJfqdouJwnovmJCLM-Kbnv4CVLxw" />
        <meta name="description" content="Somelist. Your favorite and most reliable Discord Bot List. Surf our growing index | Advertise your own bot | Explore and support authors - All on Somelist." />
        <meta name="og:description" content="Somelist. Your favorite and most reliable Discord Bot List. Surf our growing index | Advertise your own bot | Explore and support authors - All on Somelist." />
        <meta name="og:title" content="Somelist | Your #1 trusted Discord Bot List" />
        <meta name="og:image" content="https://media.discordapp.net/attachments/895953876296040468/967286226195472404/0D5BA416-09FF-4164-8C97-591AABE3BD85.png" />
        <meta name="twitter:image" content="https://i.imgur.com/WG1mCrI.png" />
    </Head>
    <NextNProgress color='var(--700)'/>
    <div className={!isOpen && 'hidden' + ' w-screen h-screen'}>
    <div style={{zIndex: '100'}} className={'fixed items-center justify-center w-screen h-screen bg-[#0B0A15]/70 backdrop-blur-lg'}>
      <div className='flex items-center justify-center w-screen h-screen'>
        <div  className='relative p-6 rounded-lg bg-[#0B0A15] w-screen max-w-[800px] flex items-center justify-center flex-col'>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={slide}
              initial={{ y: 10, scale: 0.7, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{scale: 0.7, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {slide == 0 ?
                <div className='w-full flex items-center justify-center flex-col'>
                  <motion.div initial={{scale: 0.5, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{delay: 1}}>
                    <Image src='https://i.imgur.com/WG1mCrI.png' width='250px' height='250px' className='w-max-[100px]'/>
                  </motion.div>
                  <motion.div initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 1}}>
                    <h1 className='mt-4 text-3xl font-semibold'>Welcome to Somelist</h1>
                    <p className='mt-6'>Explore bots on the #1 Trusted Discord Bot List. Learn more about Somelist today.</p>
                  </motion.div>
                  <div className='w-full text-right mt-6'>
                    <button className='py-3 px-6 text-lg rounded-lg bg-sky-600 hover:bg-sky-500' onClick={() => {
                      setslide(prevcount => prevcount + 1)
                    }}>Next</button>
                  </div>
                </div>
              : slide == 1 ?
              <div className='w-full flex items-center justify-center flex-col'>
                <motion.div initial={{scale: 0.5, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{delay: 1}}>
                  <i className='fad fa-compass text-sky-600 text-[200px]'/>
                </motion.div>
                <motion.div initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 1.5}}>

                <h1 className='mt-4 text-3xl font-semibold'>Discover dozens of bots</h1>
                <p className='mt-6'>Explore a wide variety of bots on our growing database of user-submitted data. After all, its your choice to grow your bot.</p>
                </motion.div>
                <div className='w-full flex mt-6'>
                  <button className='py-3 px-6 text-lg rounded-lg bg-gray-600 hover:bg-gray-500' onClick={() => {
                    setslide(prevcount => prevcount - 1)
                  }}>Previous</button>
                  <button className='py-3 ml-auto px-6 text-lg rounded-lg bg-sky-600 hover:bg-sky-500' onClick={() => {
                    setslide(prevcount => prevcount + 1)
                  }}>Next</button>
                </div>
              </div>
              : slide == 2 ? 
                <div className='w-full flex items-center justify-center flex-col'>
                  <motion.div initial={{scale: 0.5, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{delay: 1}}>
                    <i className='fad fa-robot text-sky-600 text-[200px]'/>
                  </motion.div>
                  <motion.div initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 1}}>
                    <h1 className='mt-4 text-3xl font-semibold'>Add your unique bot</h1>
                    <p className='mt-6'>Add your best, and most unique bot to Somelist. We're more than welcomed to approve it. However, rules are still rules, and compliance with our standard is required. How else would we be the #1 Trusted Discord Bot List?</p>
                  </motion.div>
                  <div className='w-full flex mt-6'>
                  <button className='py-3 px-6 text-lg rounded-lg bg-gray-600 hover:bg-gray-500' onClick={() => {
                    setslide(prevcount => prevcount - 1)
                  }}>Previous</button>
                  <button className='py-3 ml-auto px-6 text-lg rounded-lg bg-sky-600 hover:bg-sky-500' onClick={() => {
                    setslide(prevcount => prevcount + 1)
                  }}>Next</button>
                </div>
                </div>
              : slide == 3 ?
              <div className='w-full flex items-center justify-center flex-col'>
                <motion.div initial={{scale: 0.5, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{delay: 1}}>
                  <i className='fad fa-store-alt text-sky-600 text-[200px]'/>
                </motion.div>
                <motion.div initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 1}}>
                  <h1 className='mt-4 text-3xl font-semibold'>Explore the Marketplace</h1>
                  <p className='mt-6'>Gain points from bot votes, or quests <span className='bg-red-600 py-1 px-2 rounded-full text-white'>Implementing</span>. Points can be used to purchase items from the marketplace, such as Developer Previews, or Somelist Premium.</p>
                </motion.div>
                <div className='w-full flex mt-6'>
                  <button className='py-3 px-6 text-lg rounded-lg bg-gray-600 hover:bg-gray-500' onClick={() => {
                    setslide(prevcount => prevcount - 1)
                  }}>Previous</button>
                  <button className='py-3 ml-auto px-6 text-lg rounded-lg bg-sky-600 hover:bg-sky-500' onClick={() => {
                    setslide(prevcount => prevcount + 1)
                  }}>Next</button>
                </div>
              </div>
              : slide == 4 ?
              <div className='w-full flex items-center justify-center flex-col'>
                <motion.div initial={{scale: 0.5, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{delay: 1}}>
                  <i className='fad fa-user-cog text-sky-600 text-[200px]'/>
                </motion.div>
                <motion.div initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 1}}>
                  <h1 className='mt-4 text-3xl font-semibold flex items-center'><span>Edit your profile</span> <span className='ml-4 bg-sky-600 py-2 px-3 text-lg rounded-full text-white'>BETA</span></h1>
                  <p className='mt-6'>Rep your profile with a custom bio, Github link, Website, and etc! Create posts, edit publicity, and much more. All in Profile Editing.</p>
                </motion.div>
                <div className='w-full flex mt-6'>
                  <button className='py-3 px-6 text-lg rounded-lg bg-gray-600 hover:bg-gray-500' onClick={() => {
                    setslide(prevcount => prevcount - 1)
                  }}>Previous</button>
                  <button className='py-3 ml-auto px-6 text-lg rounded-lg bg-sky-600 hover:bg-sky-500' onClick={() => {
                    setslide(prevcount => prevcount + 1)
                  }}>Next</button>
                </div>
              </div>
              : slide == 5 &&
              <div className='w-full flex items-center justify-center flex-col'>
                <motion.div initial={{scale: 0.5, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{delay: 1}}>
                  <i className='fad fa-badge-check text-sky-600 text-[200px]'/>
                </motion.div>
                <motion.div initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 1}}>
                  <h1 className='mt-4 text-3xl font-semibold'>That's it</h1>
                  <p className='mt-6'>Thank you for checking out Somelist. You can now feel free to look around!</p>
                </motion.div>
                <div className='w-full text-right mt-6'>
                  <button className='py-3 px-6 text-lg rounded-lg bg-sky-600 hover:bg-sky-500' onClick={() => {
                    Cookie.set('welcome', true)
                    setIsOpen(false)
                  }}>Start my journey</button>
                </div>
              </div>
              }
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
    </div>

    <AnimatePresence>
            {notificationsOpen && 
            <div className={'w-screen h-screen'}>
              <motion.div 
                key='notifsbackdrop'
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}>      
                <div style={{zIndex: '100'}} className={'flex left-0 top-0 fixed items-center justify-center w-screen h-screen bg-[#0B0A15]/20 backdrop-blur-lg'}>
                <motion.div 
                key='notifsmodal'
                initial={{ opacity: 0, y: -300 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 500 }}
                className='w-screen max-w-[800px]'
                >
                <div className='w-screen p-6 max-w-[800px] flex items-center justify-center flex-col'>
                  <motion.div initial={{scale: 0.5, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{delay: 1}}>
                    <i className={`${selectedNotification.icon} ${selectedNotification.color} text-[170px]`}/>
                  </motion.div>
                  <motion.div initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 1}}>
                    <h1 className='mt-4 text-3xl font-semibold'>{selectedNotification.title}</h1>
                    <p className='mt-6' dangerouslySetInnerHTML={{__html: selectedNotification.description}}></p>
                  </motion.div>
                  <div className='w-full flex mt-6'>
                    <button className='py-3 ml-auto px-6 text-lg rounded-lg bg-sky-600 hover:bg-sky-500' onClick={() => {
                      nextNotif()
                    }}>Next</button>
                  </div>
                </div>
                  </motion.div>
                </div>
                </motion.div>
            </div>

            }
          </AnimatePresence>
    <div id='gradient'></div>
    {process.env.NEXT_PUBLIC_LOADING == 'true' && 
    router.pathname != '/404' &&
    <div className='preloader bg-gray-900 flex items-center justify-center'>
      <div style={{width: '100px', height: '100px'}}>
      <img src='https://i.imgur.com/WG1mCrI.png' width='100' height='100' className='animate-bounce animate-pulse'/>
      </div>
    </div>}
    {router.pathname == '/bot/[id]/edit' || router.pathname == '/bot/[id]/analytics' || router.pathname == '/bot/[id]/settings' ? 
    (
      <BotLayout id={router.query.id}>
        <Component {...pageProps} />
      </BotLayout>
    ) : (
      <>
        <Component {...pageProps} />
        <div className='w-screen py-3 bg-gray-900 text-center'>
          <p className='text-lg'>Somelist</p>
          <div className='w-screen flex lg:flex-row flex-col align-center justify-center mt-4'>
            <a href='/' className='text-gray-400 cursor-pointer hover:text-sky-500 mx-4'>Home</a>
            <a href='/add' className='text-gray-400 cursor-pointer hover:text-sky-500 mx-4'>Add bot</a>
            <a href='/explore' className='text-gray-400 cursor-pointer hover:text-sky-500 mx-4'>Explore</a>
            <a href='/tos' className='text-gray-400 cursor-pointer hover:text-sky-500 mx-4'>Terms</a>
            <a href='https://docs.somelist.tk' className='text-gray-400 cursor-pointer hover:text-sky-500 mx-4'>Developers</a>
            <a href='mailto:support@somelist.tk' className='text-gray-400 cursor-pointer hover:text-sky-500 mx-4'>Support</a>
          </div>
          <p className='my-4 mt-6 text-gray-500'>All rights reserved.</p>
        </div>
      </>
    )

    }
    <AnimatePresence>
    {voice &&
    <motion.div key={'voicedialog'} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <div className='w-screen h-screen bg-gray-900/50 py-10 flex-col backdrop-blur-xl fixed flex items-center' style={{zIndex: 101, top: 0, left: 0}}>
        <h1 className='text-4xl text-white/80'><i className='fad fa-microphone text-5xl mr-4'/>Voice Control</h1>
        <p className='text-white/50 mt-4'>Speak into your mic. What you spoke will be recorded below.</p>
        <p className='text-4xl mt-auto'>{transcript}</p>
        {listening ? 
          <>
          <Bars heigth="100" width="100" color="rgba(2, 132, 199, 0.7)" ariaLabel="loading-indicator" />
          <button className='bg-red-600 rounded-full w-14 h-14 text-2xl mt-4' onClick={()=>{
            SpeechRecognition.stopListening()
          }}><i className='fas fa-square'></i></button>
          </>
          :
          <>
          {message ? 
          <>
            <p className='text-xl text-white/70'>{message}</p>
            {help && 
            <ol>
            <li>
              Help - See this command list
            </li>
            <li>
              Open [page] - Navigates to a page. (Avaliable pages: Home, Marketplace, Profile)
            </li>
            <li>
              Add a robot - Navigates to the Add Bot page
            </li>
            <li>
              Look for [bot_name] - Navigates to the homepage and interacts with the search input.
            </li>
            </ol>
            }
          </>
          :
          (
          <>
          <p className='text-xl text-white/70'>I'm sorry, I could not catch that. Try again.</p>
          <button className='bg-sky-600 rounded-full w-14 h-14 text-2xl mt-4' onClick={()=>{
            SpeechRecognition.startListening()
          }}><i className='fal fa-microphone'></i></button>
          </>
          )
        }

          {tryagain &&
            <button className='bg-sky-600 rounded-full w-14 h-14 text-2xl mt-4' onClick={()=>{
              if (!directvoice) {
                SpeechRecognition.startListening()
              }
            }}><i className='fal fa-microphone'></i></button>
          }
        </>
        }
      </div>
    </motion.div>
    }
    </AnimatePresence>
    <button className='rounded-full fixed bg-sky-700 text-2xl w-14 h-14' style={{bottom: '10px', left: '10px', zIndex: 101}} onClick={()=>{
      if (voice) {
        setvoice(false)
        if (listening){
          SpeechRecognition.stopListening()
        }
      } else {
        setvoice(true)
        SpeechRecognition.startListening()
      }
    }}>
      {voice ? <i className='fal fa-times'></i> : <i className='fal fa-microphone'></i>}
    </button>
<ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
  </>
  
}


export default MyApp
