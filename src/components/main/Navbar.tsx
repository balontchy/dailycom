"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useTheme } from "@/components/main/themeProvider";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { nav } from "./link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const path = usePathname();
  const { user, isAuthenticated } = useKindeAuth();
  const [showUserInformation, setShowUserInformation] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure this runs only on the client
  }, []);

  const handleChangeUserInformation = () => {
    setShowUserInformation(!showUserInformation);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  if (!isClient) {
    return null; // Prevent rendering on the server
  }

  return (
    <nav
      className={`fixed rounded-xl  top-3 left-0 right-0 w-[95%] md:w-[99%] lg:w-[84%] m-auto backdrop-blur-lg z-50 dark:bg-neutral-600/40  dark:text-white bg-white/40  text-black  transition-colors duration-300`}
    >
      <div className="px-4 md:px-6 lg:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href={"/"}
          className="font-bold flex justify-center align-middle items-center"
        >
          <p
            className={`text-white bg-black rounded-l-3xl px-2 mb-3 text-sm rounded-tr-3xl`}
          >
            daily
          </p>
          <p
            className={`text-black bg-amber-300 rounded-r-3xl px-2 mt-3 text-sm rounded-bl-3xl`}
          >
            store
          </p>
        </Link>

        <div className="flex items-center gap-3">
          {/* Desktop Navigation */}
          <ul className="hidden xl:flex space-x-6 items-center">
            {nav.map((item, key) => (
              <Link
                key={key}
                href={item.link}
                className={`flex items-center gap-2 text-sm hover:text-amber-500 font-semibold transition ${
                  path === item.link
                    ? "text-amber-500"
                    : "text-black dark:text-white"
                }`}
              >
                {/* <span className="hidden 2xl:flex">{item.icon}</span> */}
                <span>{item.nav}</span>
              </Link>
            ))}
          </ul>

          <div className="flex gap-3 items-center">
            {/* Dark mode toggle */}
            <button
              className={`p-2 rounded-full dark:bg-gray-700 text-black bg-amber-100 dark:text-amber-600`}
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

            {!isAuthenticated ? (
              <LoginLink>
                <Button>تسجيل الدخول</Button>
              </LoginLink>
            ) : (
              <div>
                <button
                  onClick={handleChangeUserInformation}
                  className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-500"
                >
                  {/* {user?.given_name || "Loading..."} {user?.family_name || ""} */}
                  {user?.picture ? (
                    <Image
                      className="rounded-full"
                      width={40}
                      height={40}
                      src={user.picture}
                      alt="user"
                    />
                  ) : (
                    <div>{user?.given_name || "User"}</div>
                  )}
                </button>
                {showUserInformation && (
                  <Card
                    onMouseLeave={handleChangeUserInformation}
                    className="flex flex-col mt-3 justify-center align-middle items-center right-4 top-14 z-90 fixed  px-3 py-2  "
                  >
                    <CardContent className="relative flex flex-col items-center justify-center">
                      <div className="font-bold uppercase text-sm ">
                        {user?.given_name} {user?.family_name}
                      </div>
                      <div className="text-sm italic">{user?.email}</div>
                      <LogoutLink>
                        <Button className="w-full my-2">تسجيل الخروج</Button>
                      </LogoutLink>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>

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
          className={`xl:hidden px-4 pb-4 rounded-b-2xl border-t dark:bg-gray-800/90 border-gray-700 bg-white/60 dark:border-neutral-200`}
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

export default Navbar;