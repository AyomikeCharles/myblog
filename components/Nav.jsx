"use client"

import Link from 'next/link'
import { useEffect, useRef } from 'react';
import { AiOutlineTwitter, AiOutlineLinkedin, AiOutlineGithub  } from 'react-icons/ai'
import { Sacramento } from 'next/font/google'


const sacramento = Sacramento({
  subsets:['latin'],
  weight:'400',
  variable:'--font-sacramento'
})
const Nav = () => {

    const navRef = useRef()

    const handleScroll = () => {
        if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
            navRef.current.style.top = "0";
          } else {
            navRef.current.style.top = "-90px";
          }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll); 
        return () => window.removeEventListener("scroll", handleScroll);
      });


  return (
    <>
    <div className='py-5 px-5 md:px-24 dark:bg-slate-950 dark:text-white'>
        <div className='flex justify-center'>
            <div className={`${sacramento.variable} Sacramento text-2xl font-medium basis-3/4`}>
                Charles Ayomike
            </div>
            <div className='basis-1/4 flex space-x-3 '>
                <Link href='/'><AiOutlineGithub size={25}/></Link>
                <Link href='/'><AiOutlineLinkedin size={25}/></Link>
                <Link href='/'><AiOutlineTwitter size={25}/></Link>
            </div>
        </div>
        <ul className='flex justify-center border-t pt-3 font-light space-x-9 mt-3'>
            <li className=''>
               <Link href='/'>Home</Link> 
            </li>

            <li>
               <Link href='/posts'>Post</Link> 
            </li>
         
            <li>
               <Link href='/categories'>Categories</Link> 
            </li>
        </ul>
    </div>

    <div ref={navRef} className='fixed transistion duration-300 w-full z-50 -top-16 left-0 border-b py-5 bg-white'>
        <ul className='flex justify-center font-light space-x-9'>
            <li className=''>
               <Link href='/'>Home</Link> 
            </li>

            <li>
               <Link href='/posts'>Post</Link> 
            </li>
          
            <li>
               <Link href='/categories'>Categories</Link> 
            </li>
        </ul>
    </div>
    </>
  )
}

export default Nav