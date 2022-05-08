import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'

export default function Document() {
  return (
    <Html>
      <Head>
      <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet"/> 
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}