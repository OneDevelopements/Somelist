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
        <link rel="shortcut icon" type="image/png" href="https://i.imgur.com/eSgi8jm.png" />
        <meta name="google-site-verification" content="7gLQjji2gsG8jRarJfqdouJwnovmJCLM-Kbnv4CVLxw" />
        <meta name="description" content="Improve your online presence with Somelist. Advertise, Explore, and Interact with Discord Bots on this Vast, and Stunning Discord Bot List." />
        <meta name="twitter:image" content="https://media.discordapp.net/attachments/895953876296040468/967286226195472404/0D5BA416-09FF-4164-8C97-591AABE3BD85.png" />
    </Head>
    <NextNProgress color='var(--700)'/>
    <Component {...pageProps} />
  </>
  
}


export default MyApp
