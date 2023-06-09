"use client";

import Link from 'next/link';
import Image from 'next/image'; // optimized image loading
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession(); // session data from auth

  const [providers, setProviders] = useState(null); // hold auth providers
  const [toggleDropdown, settoggleDropdown] = useState(false) // for mobile nav


  // set Provider (google only for now)
  useEffect(() => { 
    const setUpProviders = async () => { 
      const response = await getProviders();      
      setProviders(response);
      }
    setUpProviders();
    
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      
      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            {/* Create Post Button */}
            <Link href="/create-prompt"
            className="black_btn"
            >
            Create Post
            </Link>
          {/* Sign Out Button */}
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              {/* user image */}
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              /> 
            </Link>

          </div>
        ) : (
            <>
              {/* Desktop full screen */}
               <h1 className="sign_in">Sign In With:</h1>
              {/* will show as list if more than 1 */}
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='black_btn'
                  >
                    {provider.name}
                    
                </button>
              ))}
          </>
          )}

      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              onClick={() => settoggleDropdown((prev) => !prev)}
            />
            {/* toggle nav menu */}
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    settoggleDropdown(false);
                  }}
                  className="mt-5 w-full black_btn"
                >
                Sign Out
                </button>
              </div>
            )}
            </div>
        ) : (
            <>
             {/*  small */}
                            
           {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
              >
                {provider.name}
                
            </button>
          ))}
          </>
        )}
          </div>
        

    </nav>
  )
}

export default Nav