import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import fetch from "node-fetch";

export default function Navbar() {
  const router = useRouter();
  const [data, setData] = useState<string | undefined>(undefined);

  const checkLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json", 
        },
        // credentials: "include",
      });
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const userLogout = async () => {
    try {
      const res = await fetch("http://localhost:8080/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // credentials: "include",
      });

      setData(undefined);
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);


  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between px-10 h-14  items-center bg-gray-100">
        <div className="">
          <p className="text-xl font-extrabold text-blue-600 drop-shadow-md shadow-blue-600/50">Web Auth</p>
        </div>
        <div className="">
          <ul className="flex list-none gap-4">
            <li className="cursor-pointer ">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="cursor-pointer text-gray-600 hover:text-black">
              <Link href={"/pages/about"}>About</Link>
            </li>
            <li className="cursor-pointer text-gray-600 hover:text-black">
              <Link href={"/pages/contact"}>Contact</Link>
            </li>
            {data ? (
              <li className="cursor-pointer text-gray-600 hover:text-black">
                <button onClick={userLogout} className="cursor-pointer">
                <Link href={"/"}>Log out</Link>
                </button>
              </li>
            ) : (
              <>
                <li  className="cursor-pointer text-gray-600 hover:text-black">
                  <Link href={"/login"}>Log in</Link>
                </li>
                <li className="cursor-pointer text-gray-600 hover:text-black">
                  <Link href={"/signup"}>Registration</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
