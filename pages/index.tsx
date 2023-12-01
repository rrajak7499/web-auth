import Head from 'next/head'
import fetch from 'node-fetch';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);

  const userHome = async () => { 
    try {
      const res = await fetch('http://localhost:8080/getdata', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
      });

      const data = await res.json();
      setUserName({...data});
      setShow(data)
     
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    userHome();
  }, [])

  return (
    <>
      <Head>
        <title>Full Stack</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className=" h-full ">
        <div className="flex  flex-col justify-center items-center h-full min-h-screen -mt-14 w-full gap-4 ">
          <p className='text-xl font-bold uppercase text-blue-400'>WELCOME</p>
          {show ? (
            <>
            <h1 className='text-3xl font-semibold text-gray-700 capitalize'>User name: {userName.name}</h1>
          <h1 className='text-3xl font-semibold text-gray-700 capitalize'>User email: {userName.email}</h1>
          {/* <h1 className='text-lg font-bold text-gray-700 capitalize'>Password: {userName.password}</h1> */}
         
            </>
          ) : (null)}
          <h2 className='text-2xl font-semibold text-gray-700'>
          {show ? 'Happy to see you back.' : 'We are the MERN Developer'}
          </h2>
        </div>
      </section>
    </>
  )
}

