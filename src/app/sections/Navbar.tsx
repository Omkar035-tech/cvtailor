'use client'

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { assets } from '@/assets/assets';

const Navbar = () => {
    const { user, isSignedIn } = useUser();
    const { setTheme, theme } = useTheme()
    const [isDarkTheme, setIsDarkTheme] = useState(theme == 'light' ? false : true);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme)
    };

    useEffect(() => {
        setTheme(isDarkTheme ? 'dark' : 'light')
    }, [isDarkTheme])
    return (
        <nav className='flex justify-center items-center mb-6'>
            <div className='mx-5 my-3 lg:w-full w-[90%] px-3 py-2 flex justify-between items-center bg-white/25 shadow-lg backdrop-blur-sm border border-white/20 rounded-lg'>
                <div className=' '>
                    <Link href='/' >
                        <Image src={assets.logoimg.src} width={57} height={30} className='w-28' alt='logo' />
                    </Link>
                </div>
                <div className='flex flex-row gap-4'>
                    <div
                        className={`flex w-20 border-2 border-gray-300 bg-gray-100 rounded-full relative cursor-pointer 
            ${isDarkTheme ? 'bg-gray-800' : ''}`}
                        onClick={toggleTheme}
                    >
                        <span className={`absolute h-full w-1/2 bg-orange-500 rounded-full transition-all duration-800 
            ${isDarkTheme ? 'translate-x-full' : ''}`}></span>
                        <span className="w-1/2 text-white text-center py-2 z-10 flex justify-center items-center">
                            <Sun size={20} />
                        </span>
                        <span className="w-1/2 text-center py-2 z-10 flex justify-center items-center">
                            <Moon size={20} />
                        </span>
                    </div>
                    {
                        isSignedIn ? (
                            <>
                                <Link href='/dashboard'>
                                    <Button >
                                        DashBoard
                                    </Button>
                                </Link>
                                <header className='bg-orange-500 text-white flex justify-between border-2 border-orange-500 px-2 py-1 rounded-lg'>
                                    <UserButton showName />
                                </header>
                            </>
                        ) : (
                            <Link href='/sign-in'>
                                <Button >
                                    Get Started
                                </Button>
                            </Link>)
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar
