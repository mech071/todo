import React from 'react'
import { useState } from 'react'
import { IoIosMenu } from "react-icons/io";
import { LuSunDim } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";

const Navbar = ({ toggleTheme, theme, toggleSidebar }) => {
  return (
    <>
      <div className="bg-zinc-100 dark:bg-zinc-800 h-18 flex justify-between items-center text-4xl px-2.5 py-5 ">

        <div onClick={toggleSidebar} 
        className="p-2.5 text-black dark:text-white cursor-pointer transition-transform duration-200 ease-out hover:scale-110">
          <IoIosMenu />
        </div>

        <div className="font-semibold font-['Alata'] text-teal-500 cursor-pointer flex">
          <img src='8832119.png' alt='logo' className='h-10 pr-1'/>
          <span className='text-stone-900 dark:text-white'>My</span>Life
        </div>

        <button
          onClick={toggleTheme}
          className="p-1.5 cursor-pointer bg-transparent flex items-center justify-center rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-100/10 dark:text-white transition-transform duration-200 ease-out hover:scale-105">
          {theme === "dark" ? <LuSunDim /> : <IoMoonOutline />}
        </button>

      </div>
      <div className="h-0.5 bg-teal-500"></div>
    </>
  )
}

export default Navbar