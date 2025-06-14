"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { HiSearch, HiBell, HiChat } from "react-icons/hi";
import app from './../Shared/firebaseConfig'
import { useRouter } from 'next/navigation';

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const db = getFirestore(app);
  const [query, setQuery] = useState("");

  useEffect(() => {
    saveUserInfo();
  }, [session])

  const saveUserInfo = async () => {
    if (session?.user) {
      await setDoc(doc(db, "user", session.user.email), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image
      });
    }
  }

  const onCreateClick = () => {
    if (session) {
      router.push('/pin-builder')
    }
    else {
      signIn()
    }
  }

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      const data = await res.json();
      console.log("Search results:", data); // Replace this with state management as needed
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  }

  return (
    <div className='flex justify-between 
     gap-3 md:gap-2 items-center p-6 '>
      <Image src='/new-logo.jpeg' alt='logo'
        width={120} height={120} onClick={() => router.push('/')}
        className='hover:bg-text-blue p-3 rounded-full cursor-pointer' />
      <button className='bg-icon-green
 text-text-blue p-3 px-6 rounded-full
 text-[25px]
 hidden md:block' onClick={() => router.push('/')}>Home</button>

      <button className='bg-icon-green
 text-text-blue p-3 px-6 rounded-full
 text-[25px]' onClick={() => onCreateClick()}>Create</button>

      <div className='bg-icon-green p-3 px-6 gap-3 items-center rounded-full w-full hidden md:flex'>
        <HiSearch className='text-[34px] text-text-blue' />
        <input
          type="text"
          placeholder='Search'
          value={query}
          onChange={handleSearch}
          className='bg-transparent outline-none w-full text-[25px] text-text-blue placeholder:text-text-blue'
        />
      </div>

      <HiSearch className='text-[25px] 
        text-text-blue md:hidden'/>
        <button
  className='bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition'
  onClick={() => router.push('/listings')}
>
  Listings
</button>

      {session?.user ?
        <Image src={session.user.image}
          onClick={() => router.push('/' + session.user.email)}
          alt='user-image' width={60} height={60}
          className='hover:bg-text-blue p-2
        rounded-full cursor-pointer'/> :
        

        <button className='font-semibold p-2 px-4 rounded-full'
          onClick={() => signIn()}>Login</button>}
    </div>
  )
}

export default Header
