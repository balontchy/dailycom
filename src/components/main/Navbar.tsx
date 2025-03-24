"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu, X, Moon, Sun} from 'lucide-react'
import { LoginLink,LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import {useTheme} from "@/components/main/themeProvider"
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { nav } from './link';



function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme,toggleTheme } = useTheme();
  const path = usePathname();
   const { user, isAuthenticated } = useKindeAuth();
   const [showUserInformation,setShowUserInfromation] = useState(false);
 
   const handleChangeUserInformation = () => {
    setShowUserInfromation(!showUserInformation);
   }
   
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <nav
      className={`fixed rounded-2xl top-3 left-0 right-0 w-[95%] md:w-[90%] lg:w-[80%] m-auto backdrop-blur-lg z-50 dark:bg-gray-900/40 dark:border-gray-700 dark:text-white bg-white/40 border-neutral-300 text-black border shadow-md transition-colors duration-300`}
    >
      <div className="px-4 md:px-6 lg:px-10 py-4 flex justify-between  items-center">
        {/* Logo - Same on mobile and desktop */}
        <div className="md:text-2xl font-bold flex dark:bg-gray-900/20 bg-white/20  border border-gray-300 dark:border-gray-700  rounded-full p-3 justify-center align-middle items-center">
          <p
            className={`text-white bg-gray-500 rounded-l-3xl px-2 mb-3 text-md rounded-tr-3xl `}
          >
            daily
          </p>
          <p
            className={` text-black bg-gray-300 rounded-r-3xl px-2 mt-3 text-md rounded-bl-3xl`}
          >
            store
          </p>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden xl:flex space-x-6 items-center">
          {nav.map((item, key) => (
            <Link
              key={key}
              href={item.link}
              className={`flex items-center  gap-2 text-sm hover:text-amber-500 font-semibold transition ${
                path === item.link
                  ? "text-amber-500"
                  : "text-black dark:text-white"
              }`}
            >
              <span className="hidden 2xl:flex ">{item.icon}</span>
              <span>{item.nav}</span>
            </Link>
          ))}
        </ul>

        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              className={`p-2 rounded-full dark:bg-gray-700 text-black bg-amber-100 dark:text-amber-600 `}
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
          {!isAuthenticated ? (
            <LoginLink className="bg-neutral-50 dark:bg-gray-700 px-3 text-blue-900 dark:text-blue-50 rounded-xl py-3 font-sm">
              تسجيل الدخول
            </LoginLink>
          ) : (
            <div
              className=" bg-gray-300 dark:bg-gray-900 py-1 px-3 rounded-sm "
            >
              <button
              onClick={handleChangeUserInformation}
              className="flex items-center justify-center gap-2">
                {user?.given_name} {user?.family_name}
                {(user?.picture as string) ? (
                  <Image
                    className="rounded-full"
                    width={30}
                    height={30}
                    src={user?.picture as string}
                    alt="user"
                  />
                ) : (
                  <div>{user?.given_name}</div>
                )}
              </button>
              {showUserInformation && (
                <div
                  onMouseLeave={handleChangeUserInformation}
                  className="flex flex-col mt-3 justify-center align-middle items-center right-10 top-16 z-90 fixed border border-neutral-400 dark:border-neutral-700  bg-white dark:bg-gray-900 text-black px-3 py-2 rounded-md shadow-md"
                >
                  <div className="font-bold uppercase text-xl py-3 dark:text-white  ">
                    {user?.given_name} {user?.family_name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 italic ">
                    {user?.email}
                  </div>
                  <LogoutLink className="bg-red-400 text-white w-full py-1 rounded-md shadow-md border border-red-500 my-3 text-center m-auto ">
                    تسجيل الخروج
                  </LogoutLink>
                </div>
              )}
            </div>
          )}
          {/* Removed invalid use of useKindeAuth */}
          {/* Dark mode toggle + Mobile menu button container */}

          {/* Mobile menu button */}
          <button
            className="xl:hidden flex items-center"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div
          className={`xl:hidden px-4 pb-4 rounded-b-2xl border-t 
               bg-gray-800/90 border-gray-700
               dark:bg-white/60 dark:border-neutral-200
          }`}
        >
          <ul className="flex flex-col space-y-3 pt-2 text-right">
            {nav.map((item, key) => (
              <Link
                key={key}
                href={item.link}
                className={`flex items-center justify-end gap-2 py-2 px-3 rounded-lg ${
                  theme === "dark"
                    ? item.link === path
                      ? "text-amber-500 bg-gray-700/50"
                      : "text-white hover:bg-gray-700/30"
                    : item.nav === "الرئيسية"
                    ? "text-amber-600 bg-amber-50"
                    : "text-black hover:bg-amber-100"
                } transition`}
                onClick={() => setIsOpen(false)}
              >
                <span>{item.nav}</span>
                {item.icon}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar