import React from 'react'
import Link from 'next/link'
import { MdOutlineEmojiFoodBeverage } from 'react-icons/md';
import { IoLogoGithub } from "react-icons/io";
import { useState, useCallback, useEffect } from 'react';
const navbuttons = "font-light hidden md:block subpixel-antialiased transition ease-out hover:shadow delay-100 hover:scale-105 duration-100 transform-gpu px-3 grid place-content-center text-center"
const navicons = "hidden md:block subpixel-antialiased transition ease-out hover:shadow delay-100 hover:scale-105 duration-100 transform-gpu h-10 w-10 shrink-0 grid place-content-center"
const NavBar = () => {
    return (
        <nav className='inset-x-0 top-0 shadow backdrop-blur-sm bg-cyan-300/20 md:fixed'>
            <ul className="flex items-center gap-4 p-2 text-2xl">
            <Link href='/' passHref>
                <div className='flex items-center grid-cols-3 gap-2 fit hover:cursor-pointer'>
                    <MdOutlineEmojiFoodBeverage className='w-10 h-10'/>
                    <a className=''>Code and culinary</a>
                </div>
            </Link>
            <div className='grow shrink'></div>
                <GetNavContent />
            </ul>
        </nav>
    );
};
const icons = [
    {d: "M4 6h16M4 12h16M4 18h16"},
    {d: "M6 18L18 6M6 6l12 12"}
];

const GetNavContent = () => {
    const [title, setTitle] = useState(icons[0].d); 
        return (
            <>
            <li className={navbuttons}>
                    <Link href='/' passHref><a className="">Home</a></Link>
                </li>
                <li className={navbuttons}>
                    <Link href='/about'><a className="">About</a></Link>
                </li>
                <li className={navbuttons}>
                    <Link href='/popper'><a className="">Popper</a></Link>
                </li>
                <li className={navicons + ' rounded-full'}>
                <Link href='https://github.com/Stormle' passHref>
                    <div className='flex align-middle place-content-center hover:cursor-pointer'>
                        <IoLogoGithub className='w-10 h-10 shrink-0'/>
                    </div>
                </Link>
                </li>

            <div className='inset-y-0 right-0 md:hidden'>
                <div className='align-middle w-fit'>
                    <svg className="w-12 h-12 align-middle transition duration-100 ease-out delay-100 hover:scale-105" onClick={() => setTitle(title === icons[1].d ? icons[0].d : icons[1].d)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path className='' strokeLinecap="round" strokeLinejoin="round" d={title} />
                    </svg>
                </div>
            </div>
        </>
        );
}
  
export default NavBar;