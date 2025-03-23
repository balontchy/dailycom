import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="w-full min-h-screen h-full flex flex-col justify-between">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout