import React from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  return (
    <>
      <section className="container justify-center py-10 w-3/4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md px-2 py-3 flex items-center">
            <div className="bg-blue-500 rounded-md text-white w-10 h-10 flex items-center justify-center">
              <FaPhone />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Phone</h3>
              <p className="text-gray-500">+91-7004469843</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md px-2 py-3 flex items-center">
            <div className="bg-blue-500 rounded-md text-white w-10 h-10 flex items-center justify-center">
              <FaEnvelope />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Email</h3>
              <p className="text-gray-500">rrajak7499@gamil.com</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md px-2 py-3 flex items-center">
            <div className="bg-blue-500 rounded-md text-white w-10 h-10 flex items-center justify-center">
              <FaMapMarkerAlt />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Address</h3>
              <p className="text-gray-500">Darbhanga bihar</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center mt-10 w-3/4 mx-auto">
          <h2 className="text-lg font-medium mb-4">Get in Touch</h2>
          <form action="submit" method="post">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <input type="text" placeholder="Your name" className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="email" placeholder="Your email" className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="tel" placeholder="Your phone number" className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <textarea name="message" id="" cols="30" rows="10" className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div className="flex justify-center items-center">
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Send Message</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}