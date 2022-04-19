import { useEffect } from 'react';
import '../styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    document.documentElement.classList.add('dark')
    document.documentElement.setAttribute("data-theme", "violet")
  }, [])
  return  <>
    <head>
      <title>Somelist | Discord Bots</title>
      <meta name="description" content="Improve your online presense with Somelist. Advertise, Explore, and Interact with Discord Bots on this Vast, and Stunning Discord Bot List." />
      <meta property="og:image" content="../public/embed.png" />
    </head>
    <NextNProgress color='var(--700)'/>
    <Component {...pageProps} />
  </>
  
}


export default MyApp
