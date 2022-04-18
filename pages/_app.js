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
    <NextNProgress color='var(--700)'/>
    <Component {...pageProps} />
  </>
  
}


export default MyApp
