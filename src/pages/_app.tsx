import '@/styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import LoadingScreen from '@/components/LoadingScreen'

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {isLoading && <LoadingScreen />}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-200'}>
        <Component {...pageProps} />
      </div>
    </>
  )
}
