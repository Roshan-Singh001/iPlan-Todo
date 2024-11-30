import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-cyan-500 p-2'>
      <div className="logo">
        <span className='font-bold text-3xl text-white'>iPlan</span>
      </div>
      <ul className='flex gap-6 text-white text-lg'>
        <a href="#" className='hover:font-bold transition-all'><li>Home</li></a>
        <a href="#" className='hover:font-bold transition-all'><li>About</li></a>
        <a href="#" className='hover:font-bold transition-all'><li>Contact</li></a>
        <a href="#" className='hover:font-bold transition-all'><li>Blog</li></a>
      </ul>
    </nav>
  )
}

export default Navbar
