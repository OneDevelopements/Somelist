import { useEffect } from 'react';
import '../styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import NextNProgress from "nextjs-progressbar";
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    document.documentElement.classList.add('dark')
    document.documentElement.setAttribute("data-theme", "violet")
  }, [])
  return  <>

    <Head>
        <title>Somelist | Discord Bots</title>
        <meta name="google-site-verification" content="7gLQjji2gsG8jRarJfqdouJwnovmJCLM-Kbnv4CVLxw" />
        <meta name="description" content="Improve your online presence with Somelist. Advertise, Explore, and Interact with Discord Bots on this Vast, and Stunning Discord Bot List." />
        <meta name="twitter:image" content="https://i.imgur.com/KYL5iuC.png" />
    </Head>
    <NextNProgress color='var(--700)'/>
    <Component {...pageProps} />
  </>
  
}


export default MyApp
