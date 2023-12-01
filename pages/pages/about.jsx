import fetch from "node-fetch";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


export default function About() {
  const router = useRouter();
  const [data, setData] = useState("");

  const callAboutPage = async () => {
    try {
      const res = await fetch("http://localhost:8080/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
      });

      if (res.ok) {
        console.log("res.ok", res.ok);
        
      }
  
      const data = await res.json();
      console.log(data);
  
      if (res.status === 200) {
        setData(data);
      } 
    } catch (error) {
      console.log(error);
      router.push("/login");  
      return;
    }
  };
  
  useEffect(() => {
    callAboutPage();
  }, []);

  return (<div>
    This is secured page </div>);
}
