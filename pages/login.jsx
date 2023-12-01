import Image from "next/image";
import router, { useRouter } from "next/router";
import fetch from "node-fetch";
import React, { useState } from "react";
import { HiMail, HiLockClosed } from "react-icons/hi";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    router.push("/");
    if (res.status === 401 || !data) {
      window.alert("Invalid Credentials");
    } else {
      const token = data.token; // assume that the token is returned under the 'token' property
      document.cookie = `jwtoken=${token}; path=/; expires=${new Date(Date.now() + 3600000)}; secure=true; sameSite=strict`;
      window.alert("Login Successfully");
      router.push("/");
    }
  };
  

  return (
    <>
      <section className=" flex items-center justify-center mt-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className=" rounded-md shadow-lg border-gray-700 max-w-2xl w-full mx-auto my-8 bg-slate-100">
          <div className="flex flex-col-reverse md:flex-row ">
            <div className="p-6 sm:p-8 w-full md:w-1/2">
              <h2 className="text-4xl font-semibold px-2 my-1 mb-4">Login</h2>
              <form
                onSubmit={handleSubmit}
                action="POST"
                className="p-2 flex-col "
              >
                <div className="mb-5">
                  <label className="relative block">
                    <span className="sr-only">Email</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <HiMail className="w-6 h-6 text-gray-600" />
                    </span>
                    <input
                      className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-b-slate-300 outline-none rounded-md py-2 pl-9 pr-3 shadow-sm sm:text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      type="email"
                      name="email"
                    />
                  </label>
                </div>
                <div className="mb-5">
                  <label className="relative block">
                    <span className="sr-only">Password</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <HiLockClosed className="w-6 h-6 text-gray-600" />
                    </span>
                    <input
                      className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-b-slate-300 outline-none rounded-md py-2 pl-9 pr-3 shadow-sm sm:text-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      type="password"
                      name="password"
                    />
                  </label>
                </div>
                <div className="flex justify-center items-center-w-full">
                  <input
                    type="submit"
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    value="Login"
                  />
                </div>
              </form>
            </div>
            <div className="w-full hidden md:flex md:w-1/2 justify-center items-center">
              <Image
                src={"/svgs/Mobile-login-pana.svg"}
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
  );
}
