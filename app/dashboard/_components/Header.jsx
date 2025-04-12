"use client";
import React from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


function Header() {
  const path = usePathname();

  return (
    <div className=" sticky top-0 z-50 w-full bg-black text-white shadow-sm p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image 
            src="/MockVers.png"
            alt="MockVerse Logo"
            width={80}
            height={80}
          />
        </div>

        {/* Navigation Links */}
        <ul className=" flex flex-wrap justify-center gap-6 text-sm sm:text-base">
  <li>
    <Link href="/dashboard">
      <span className={`cursor-pointer transition-all duration-300 hover:text-purple-500 ${path === '/dashboard' ? 'text-purple-500 font-bold' : ''}`}>
        Dashboard
      </span>
    </Link>
  </li>
  
  <li>
    <Link href="/dashboard">
    <span
  title="In dashboard, click 'New Interview' to start the interview"
  className={`cursor-pointer transition-all duration-300 hover:text-purple-500 ${path.startsWith('/dashboard/interview') ? 'text-purple-500 font-bold' : ''}`}
>
  Interview
</span>
    </Link>
  </li>
  <li>
    <Link href="/career-portal">
      <span className={`cursor-pointer transition-all duration-300 hover:text-purple-500 ${path === '/career-portal' ? 'text-purple-500 font-bold' : ''}`}>
        Apply
      </span>
    </Link>
  </li>
  <li>
    <Link href="/prepare-portal">
      <span className={`cursor-pointer transition-all duration-300 hover:text-purple-500 ${path === '/prepare-portal' ? 'text-purple-500 font-bold' : ''}`}>
        Prepare
      </span>
    </Link>
  </li>
  <li>
    <Link href="/code">
      <span className={`cursor-pointer transition-all duration-300 hover:text-purple-500 ${path === '/code' ? 'text-purple-500 font-bold' : ''}`}>
        Code
      </span>
    </Link>
  </li>
</ul>


        {/* User Button */}
        <div>
          <UserButton />
        </div>

      </div>
    </div>
  );
}

export default Header;
