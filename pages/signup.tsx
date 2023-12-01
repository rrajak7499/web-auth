import Image from 'next/image'
import router, { useRouter } from 'next/router';
import React, { useState } from 'react'
import { BiUserCircle } from 'react-icons/bi';
import { HiMail, HiLockClosed } from 'react-icons/hi'
import { NextPage } from "next";
import fetch from 'node-fetch';

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  });
  
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(user);  
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = user;
    const url = "http://localhost:8080/register";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };


    try {
      const res = await fetch(url, requestOptions);
  
      const data = res.json();
      if (data.status === 422 || !data) {
        window.alert("Invalid credentials")
        console.log("Invalid credentials");
        
      } else {
        window.alert("Sucessfully Registered")
        console.log("Sucessfully Registered");
        router.push('/login')
      }
       
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className=" flex items-center justify-center mt-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className=" rounded-md shadow-lg border-gray-700 max-w-2xl w-full mx-auto my-8 bg-slate-100">
          <div className="flex flex-col-reverse md:flex-row ">
            <div className="p-6 sm:p-8 w-full md:w-1/2">
              <h2 className="text-4xl font-semibold px-2 my-1 mb-4">Sign up</h2>
              <form onSubmit={handleSubmit} action="POST" className="p-2 flex-col ">
                <div className="mb-5">
                  <label className="relative block">
                    <span className="sr-only">Full Name</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <BiUserCircle className='w-6 h-6 text-gray-600' />
                    </span>
                    <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-b-slate-300 outline-none rounded-md py-2 pl-9 pr-3 shadow-sm sm:text-sm"
                      value={user.name} onChange={handleInput}
                      placeholder="Full Name" type="text" name="name" />
                  </label>
                </div>
                <div className="mb-5">
                  <label className="relative block">
                    <span className="sr-only">Email</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <HiMail className='w-6 h-6 text-gray-600' />
                    </span>
                    <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-b-slate-300 outline-none rounded-md py-2 pl-9 pr-3 shadow-sm sm:text-sm"
                      value={user.email} onChange={handleInput}
                      placeholder="Email" type="email" name="email" />
                  </label>
                </div>
                <div className="mb-5">
                  <label className="relative block">
                    <span className="sr-only">Password</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <HiLockClosed className='w-6 h-6 text-gray-600' />
                    </span>
                    <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-b-slate-300 outline-none rounded-md py-2 pl-9 pr-3 shadow-sm sm:text-sm"
                      value={user.password} onChange={handleInput}
                      placeholder="Password" type="password" name="password" />
                  </label>
                </div>
                <div className="mb-5">
                  <label className="relative block">
                    <span className="sr-only">Confirm Password</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <HiLockClosed className='w-6 h-6 text-gray-600' />
                    </span>
                    <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-b-slate-300 outline-none rounded-md py-2 pl-9 pr-3 shadow-sm sm:text-sm"
                      value={user.cpassword} onChange={handleInput}
                      placeholder="Confirm Password" type="password" name="cpassword" />
                  </label>
                </div>
                <div className="flex justify-center items-center-w-full">
                  <input type='submit'  className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700" value="Sign up" />

                </div>
              </form>
            </div>
            <div className="w-full hidden md:flex md:w-1/2 justify-center items-center">
              <Image
                src={'/svgs/Mobile-login-pana.svg'}
                width={400}
                height={400}
                alt="image"
                className=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}