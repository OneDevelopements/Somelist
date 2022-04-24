import { useEffect } from 'react';
import '../styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import NextNProgress from "nextjs-progressbar";
import Head from 'next/head';
import { useState } from 'react';
import Cookie from 'js-cookie';
function MyApp({ Component, pageProps }) {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  useEffect(()=>{
    document.documentElement.classList.add('dark')
    document.documentElement.setAttribute("data-theme", "violet")
  }, [])
  useEffect(()=>{
    if (navigator.userAgent.indexOf("Firefox") > 0) {
      if (Cookie.get('browserWarning') != 'yes'){
        setIsOpen(true)
      }
  }
  }), []
  return  <>
    <Head>
        <title>Somelist | Discord Bots</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet"/> 
        <link rel="shortcut icon" type="image/png" href="https://i.imgur.com/eSgi8jm.png" />
        <meta name="google-site-verification" content="7gLQjji2gsG8jRarJfqdouJwnovmJCLM-Kbnv4CVLxw" />
        <meta name="description" content="Improve your online presence with Somelist. Advertise, Explore, and Interact with Discord Bots on this Vast, and Stunning Discord Bot List." />
        <meta name="twitter:image" content="https://media.discordapp.net/attachments/895953876296040468/967286226195472404/0D5BA416-09FF-4164-8C97-591AABE3BD85.png" />
    </Head>
    <NextNProgress color='var(--700)'/>
    <div className={!isOpen && 'hidden' + ' w-screen h-screen'}>
    <div style={{zIndex: '100'}} className={'fixed items-center justify-center w-screen h-screen bg-[#0B0A15]/70 backdrop-blur-lg'}>
      <div className='flex items-center justify-center w-screen h-screen'>
        <div style={{width: '25rem'}} className='relative p-6 rounded-lg bg-[#0B0A15]'>
          <h1 className='text-3xl font-semibold'>Hold up!</h1>
          <p className='mt-6'>You're using <b>Firefox</b>, which does not support backdrop blur. Certain content on this site may not appear correctly.</p>
          <div className='w-full text-right mt-6'>
          <button className='p-2 px-3 rounded-lg bg-sky-600 hover:bg-sky-500' onClick={() => {
            Cookie.set('browserWarning', 'yes')
            setIsOpen(false)
          
          }}>Ok, let me in!</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    <Component {...pageProps} />
  </>
  
}


export default MyApp
