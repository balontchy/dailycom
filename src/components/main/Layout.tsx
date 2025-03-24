"use client"
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from './themeProvider';

function Layout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="w-full min-h-screen h-full flex flex-col justify-between">
      <ThemeProvider>

      <KindeProvider>
        <SpeedInsights />
        <Navbar />
        {children}
        <Footer />
      </KindeProvider>
      </ThemeProvider>
    </div>
  );
}

export default Layout